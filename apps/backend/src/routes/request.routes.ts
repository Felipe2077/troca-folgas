// apps/backend/src/routes/request.routes.ts
import { Prisma } from '../generated/prisma';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  DayOfWeek,
  requestListQuerySchema,
  Role,
  SwapEventType,
  swapRequestUpdateSchema,
  SwapStatus,
} from '@repo/shared-types'; // Importa o novo schema e SwapStatus

import { swapRequestCreateBodySchema /* ... */ } from '@repo/shared-types';
import { getISOWeek } from 'date-fns'; // Helpers de data
import { FastifyInstance } from 'fastify';
import { z, ZodError } from 'zod';
import { authenticate } from '../hooks/authenticate.hook'; // Nosso hook de auth
import { logAudit } from '../lib/audit';
import { prisma } from '../lib/prisma';
import { requestIdParamsSchema } from '../schemas/request.schema'; // Nosso schema Zod

// Helper para verificar se é Sábado ou Domingo
function isWeekend(date: Date): boolean {
  const dayUTC = date.getUTCDay(); // 0 = Domingo, 1 = Seg, ..., 6 = Sábado
  return dayUTC === 0 || dayUTC === 6; // Retorna true se for Domingo (0) ou Sábado (6)
}

// Helper para verificar se duas datas estão na mesma semana ISO (bom para comparar fim de semana)
function areDatesInSameISOWeek(date1: Date, date2: Date): boolean {
  // getISOWeek retorna o número da semana (1-53) no padrão ISO 8601 (semana começa na Segunda)
  // Isso geralmente funciona bem para agrupar Sábado/Domingo da mesma semana.
  return (
    getISOWeek(date1) === getISOWeek(date2) &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export async function requestRoutes(fastify: FastifyInstance) {
  fastify.get('/', { onRequest: [authenticate] }, async (request, reply) => {
    try {
      // 1. Verificar Role e aplicar filtro de usuário se não for Admin
      const whereClause: Prisma.SwapRequestWhereInput = {};
      if (request.user.role !== Role.ADMINISTRADOR) {
        whereClause.submittedById = parseInt(request.user.sub, 10);
      }

      // 2. Validar TODOS os Query Parameters com o schema compartilhado
      const queryParse = requestListQuerySchema.safeParse(request.query);
      console.log('--- Parsed Query Params ---');
      console.dir(queryParse, { depth: null }); // Mostra o resultado completo do parse

      if (!queryParse.success) {
        fastify.log.error({ msg: 'Zod validation error for GET /requests', issues: queryParse.error.format() });
        return reply.status(400).send({
          message: 'Parâmetros de query inválidos.',
          issues: queryParse.error.format(),
        });
      }
      // Extrai todos os possíveis filtros e ordenação validados
      const {
        status,
        sortBy,
        sortOrder,
        swapDateStart,
        swapDateEnd,
        paybackDateStart,
        paybackDateEnd,
        employeeIdOut,
        employeeIdIn,
        employeeFunction,
        groupOut,
        groupIn,
        eventType,
        page = 1,
        limit = 10,
      } = queryParse.data;

      // 3. Construir Cláusula Where Dinamicamente
      if (status && status.length > 0) {
        whereClause.status = { in: status };
      }
      if (employeeIdOut) {
        whereClause.employeeIdOut = employeeIdOut;
      } // Busca exata por crachá
      if (employeeIdIn) {
        whereClause.employeeIdIn = employeeIdIn;
      }
      if (employeeFunction) {
        whereClause.employeeFunction = employeeFunction;
      }
      if (groupOut) {
        whereClause.groupOut = groupOut;
      }
      if (groupIn) {
        whereClause.groupIn = groupIn;
      }
      if (eventType) {
        whereClause.eventType = eventType;
      }

      // Filtro de Data (campo createdAt)
      // Filtro para swapDate
      if (swapDateStart || swapDateEnd) {
        whereClause.swapDate = {};
        if (swapDateStart) {
          const start = new Date(swapDateStart);
          start.setUTCHours(0, 0, 0, 0); // Início do dia em UTC
          whereClause.swapDate.gte = start;
        }
        if (swapDateEnd) {
          const end = new Date(swapDateEnd);
          end.setUTCHours(23, 59, 59, 999); // Fim do dia em UTC
          whereClause.swapDate.lte = end;
        }
      }
      // Filtro para paybackDate
      if (paybackDateStart || paybackDateEnd) {
        whereClause.paybackDate = {};
        if (paybackDateStart) {
          const start = new Date(paybackDateStart);
          start.setUTCHours(0, 0, 0, 0); // Início do dia em UTC
          whereClause.paybackDate.gte = start;
        }
        if (paybackDateEnd) {
          const end = new Date(paybackDateEnd);
          end.setUTCHours(23, 59, 59, 999); // Fim do dia em UTC
          whereClause.paybackDate.lte = end;
        }
      }

      // 4. Construir Cláusula OrderBy (mantida)
      const orderByClause = { [sortBy || 'createdAt']: sortOrder || 'desc' };

      // 5. Buscar Solicitações no Banco com Filtros e Ordenação
      const [requests, totalCount] = await Promise.all([
        prisma.swapRequest.findMany({
          where: whereClause, // <-- Where dinâmico
          orderBy: orderByClause,
          skip: (page - 1) * limit,
          take: limit,
          include: { submittedBy: { select: { name: true, loginIdentifier: true, role: true } } } // Incluir dados do usuário que submeteu
        }),
        prisma.swapRequest.count({ where: whereClause })
      ]);

      // 6. Retornar a lista filtrada e ordenada
      return reply.status(200).send({ 
        requests,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (error) {
      // Tratamento de erro (mantido)
      if (error instanceof ZodError) {
        // Segurança extra para Zod
        return reply
          .status(400)
          .send({ message: 'Erro de validação Zod.', issues: error.format() });
      }
      fastify.log.error({ msg: 'Error fetching requests', error });
      return reply
        .status(500)
        .send({ message: 'Erro interno ao buscar solicitações.' });
    }
  });
  fastify.post(
    '/',
    {
      onRequest: [authenticate], // Continua protegido para Encarregado
    },
    async (request, reply) => {
      try {
        // 1. Verificar Role Encarregado (continua igual)
        if (request.user.role !== Role.ENCARREGADO) {
          return reply.status(403).send({
            message:
              'Acesso negado. Apenas encarregados podem criar solicitações.',
          });
        }

        // 2. Validar Corpo com Schema Compartilhado (safeParse)
        // O schema agora inclui: tipo dos campos, regex/tamanho crachá, datas futuras, datas diferentes, mesmo mês, ids diferentes
        const validationResult = swapRequestCreateBodySchema.safeParse(
          request.body
        );
        if (!validationResult.success) {
          return reply.status(400).send({
            message: 'Erro de validação.',
            issues: validationResult.error.format(),
          });
        }
        // Se passou, temos os dados validados e tipados corretamente
        const body = validationResult.data;

        // 3. Validações de Negócio Adicionais (que NÃO estão no schema Zod)
        // 3.1: Datas devem ser Sábado ou Domingo (mantida)
        if (!isWeekend(body.swapDate) || !isWeekend(body.paybackDate)) {
          return reply.status(400).send({
            message:
              'As datas da troca e do pagamento devem ser Sábados ou Domingos.',
          });
        }
        // 3.2: Grupos de Folga devem ser diferentes (mantida)
        if (body.groupOut === body.groupIn) {
          return reply.status(400).send({
            message:
              'Os grupos de folga dos funcionários devem ser diferentes.',
          });
        }
        // 3.3: Verificar Janela de Submissão (lógica mantida)
        const settings = await prisma.settings.findUniqueOrThrow({
          where: { id: 1 },
        });
        const now = new Date();
        const currentDayOfWeek = now.getDay();
        const dayMap: Record<DayOfWeek, number> = {
          SUNDAY: 0,
          MONDAY: 1,
          TUESDAY: 2,
          WEDNESDAY: 3,
          THURSDAY: 4,
          FRIDAY: 5,
          SATURDAY: 6,
        };
        const startDayNum = dayMap[settings.submissionStartDay];
        const endDayNum = dayMap[settings.submissionEndDay];
        let isWithinWindow = false;
        if (startDayNum <= endDayNum) {
          isWithinWindow =
            currentDayOfWeek >= startDayNum && currentDayOfWeek <= endDayNum;
        } else {
          isWithinWindow =
            currentDayOfWeek >= startDayNum || currentDayOfWeek <= endDayNum;
        }

        if (!isWithinWindow) {
          const daysOfWeekNamesPtBr = [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado',
          ];
          const nextOpeningDayName = daysOfWeekNamesPtBr[startDayNum];
          return reply.status(400).send({
            message: `Fora do período de submissão. A janela abre na próxima ${nextOpeningDayName}.`,
          });
        }
        // Fim das validações de negócio

        // 4. Calcular eventType (mantida)
        const eventType = areDatesInSameISOWeek(body.swapDate, body.paybackDate)
          ? SwapEventType.TROCA
          : SwapEventType.SUBSTITUICAO;

        // 5. Criar Solicitação(ões) no Banco DENTRO DE UMA TRANSAÇÃO
        const createdRequest = await prisma.$transaction(async (tx: any) => {
          // Cria a solicitação ORIGINAL primeiro
          const originalRequest = await tx.swapRequest.create({
            data: {
              ...body, // Dados validados do Zod
              eventType: eventType,
              status: SwapStatus.SOLICITADO,
              submittedById: parseInt(request.user.sub, 10),
              isMirror: false, // Original não é espelho
              relatedRequestId: null, // Ainda não tem espelho ligado
            },
          });

          // Se for uma SUBSTITUICAO, cria o espelho E atualiza a original
          if (originalRequest.eventType === SwapEventType.SUBSTITUICAO) {
            // Cria o registro ESPELHO com dados invertidos
            const mirrorRequest = await tx.swapRequest.create({
              data: {
                // Campos específicos da troca/folga invertidos
                employeeIdOut: originalRequest.employeeIdIn, // Invertido
                employeeIdIn: originalRequest.employeeIdOut, // Invertido
                swapDate: originalRequest.paybackDate, // Invertido
                paybackDate: originalRequest.swapDate, // Invertido
                groupOut: originalRequest.groupIn, // Invertido
                groupIn: originalRequest.groupOut, // Invertido
                // Campos que permanecem iguais
                employeeFunction: originalRequest.employeeFunction,
                eventType: originalRequest.eventType, // Mantém o tipo original
                status: originalRequest.status, // Começa com o mesmo status
                submittedById: originalRequest.submittedById, // Mesmo usuário submeteu
                // Campos de controle do espelho
                isMirror: true, // MARCA como espelho
                relatedRequestId: originalRequest.id, // Aponta para a original
                observation: `Registro espelho automático da solicitação ${originalRequest.id}`, // Obs. Padrão
              },
            });

            // Atualiza a solicitação ORIGINAL para apontar para o espelho
            await tx.swapRequest.update({
              where: { id: originalRequest.id },
              data: { relatedRequestId: mirrorRequest.id },
            });
          }

          // A transação retorna a solicitação original criada
          return originalRequest;
        }); // Fim da transação

        const actingAdminObs = await prisma.user.findUnique({
          where: { id: parseInt(request.user.sub, 10) },
          select: { loginIdentifier: true },
        });
        // 6. Log de Auditoria (APÓS a transação ter sucesso)
        await logAudit({
          prisma,
          userId: parseInt(request.user.sub, 10),
          userLoginIdentifier:
            actingAdminObs?.loginIdentifier ?? `AdminID:${request.user.sub}`,
          action: 'CREATE_SWAP_REQUEST',
          details: `User created swap request ${createdRequest.id} (${createdRequest.eventType}) from ${createdRequest.employeeIdOut} to ${createdRequest.employeeIdIn}.`,
          targetResourceId: createdRequest.id,
          targetResourceType: 'SwapRequest',
        });
        // Se for substituição, talvez logar a criação do espelho também? Opcional.

        // 7. Retornar Sucesso (201 Created) com a solicitação ORIGINAL
        return reply.status(201).send({ request: createdRequest });
      } catch (error) {
        // Catch do ZodError já foi tratado pelo safeParse
        // Catch para erros do Prisma ou outros
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          fastify.log.error({ msg: 'Prisma error on create request', error });
          // Poderia tratar códigos específicos como P2002 (unique constraint) se houver
          return reply
            .status(409)
            .send({ message: `Erro no banco de dados: ${error.code}` }); // 409 Conflict
        }
        if (
          error instanceof Prisma.PrismaClientUnknownRequestError ||
          error instanceof Prisma.PrismaClientValidationError
        ) {
          fastify.log.error({
            msg: 'Prisma other error on create request',
            error,
          });
          return reply
            .status(500)
            .send({ message: 'Erro inesperado no banco de dados.' });
        }
        // Erro genérico
        fastify.log.error({ msg: 'Internal error on create request', error });
        // Verifica se é um erro já com mensagem (lançado por nós)
        if (error instanceof Error) {
          return reply.status(500).send({
            message:
              error.message || 'Erro interno do servidor ao criar solicitação.',
          });
        }
        return reply
          .status(500)
          .send({ message: 'Erro interno do servidor ao criar solicitação.' });
      }
    }
  );
  // --- NOVA Rota GET /summary (ADMIN ONLY) ---
  fastify.get(
    '/summary',
    {
      onRequest: [authenticate], // Exige autenticação
    },
    async (request, reply) => {
      try {
        // 1. Verificar se é Administrador
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({ message: 'Acesso negado.' });
        }

        // 2. Calcular as contagens usando Prisma (em paralelo)
        const now = new Date(); // Pega a data/hora atual para comparar

        const [
          countAgendado,
          countRealizado,
          countNaoRealizada,
          countTroca,
          countSubstituicao,
          countAgendadoAtrasado,
        ] = await Promise.all([
          // Contagem por Status
          prisma.swapRequest.count({ where: { status: SwapStatus.AGENDADO } }),
          prisma.swapRequest.count({ where: { status: SwapStatus.REALIZADO } }),
          prisma.swapRequest.count({
            where: { status: SwapStatus.NAO_REALIZADA },
          }),
          // Contagem por Tipo
          prisma.swapRequest.count({
            where: { eventType: SwapEventType.TROCA },
          }),
          prisma.swapRequest.count({
            where: { eventType: SwapEventType.SUBSTITUICAO },
          }),
          // Contagem Agendadas Atrasadas (status AGENDADO E (swapDate < agora OU paybackDate < agora))
          prisma.swapRequest.count({
            where: {
              status: SwapStatus.AGENDADO,
              OR: [
                { swapDate: { lt: now } }, // 'lt' = less than
                { paybackDate: { lt: now } },
              ],
            },
          }),
        ]);

        // 3. Montar e retornar o objeto de resumo
        const summary = {
          byStatus: {
            [SwapStatus.AGENDADO]: countAgendado,
            [SwapStatus.REALIZADO]: countRealizado,
            [SwapStatus.NAO_REALIZADA]: countNaoRealizada,
          },
          byType: {
            [SwapEventType.TROCA]: countTroca,
            [SwapEventType.SUBSTITUICAO]: countSubstituicao,
          },
          attention: {
            scheduledPastDue: countAgendadoAtrasado,
          },
          // Pode adicionar mais contagens aqui se necessário
        };

        return reply.status(200).send(summary);
      } catch (error) {
        fastify.log.error({ msg: 'Error fetching request summary', error });
        return reply
          .status(500)
          .send({ message: 'Erro interno ao buscar resumo das solicitações.' });
      }
    }
  );
  // --- FIM da Rota GET /summary ---

  // --- NOVA Rota GET /summary/user (ENCARREGADO/ADMIN ONLY) ---
  fastify.get(
    '/summary/user',
    {
      onRequest: [authenticate], // Exige autenticação
    },
    async (request, reply) => {
      try {
        fastify.log.info('[summary/user] Received request');
        // Apenas ENCARREGADO ou ADMINISTRADOR podem acessar este resumo
        if (request.user.role !== Role.ENCARREGADO && request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({ message: 'Acesso negado.' });
        }

        const userId = parseInt(request.user.sub, 10);
        fastify.log.info(`[summary/user] Parsed userId: ${userId}`);

        // Validação
        const summaryDateQuerySchema = z.object({
          swapDateStart: z.string().optional(),
          swapDateEnd: z.string().optional(),
        });
        const queryParse = summaryDateQuerySchema.safeParse(request.query);

        if (!queryParse.success) {
          fastify.log.error({ msg: '[summary/user] Validation failed', issues: queryParse.error.format() });
          return reply.status(400).send({
            message: 'Parâmetros de data inválidos.',
            issues: queryParse.error.format(),
          });
        }
        const { swapDateStart, swapDateEnd } = queryParse.data;
        fastify.log.info(`[summary/user] Dates after validation: start=${swapDateStart}, end=${swapDateEnd}`);

        // Construir a cláusula base
        const whereClause: Prisma.SwapRequestWhereInput = {
          submittedById: userId,
        };

        // Adicionar filtro de data
        if (swapDateStart && swapDateEnd) {
          whereClause.swapDate = {
            gte: new Date(swapDateStart),
            lte: new Date(swapDateEnd),
          };
        }
        fastify.log.info({ msg: '[summary/user] Constructed whereClause', where: whereClause });

        // Contagens sequenciais para debug
        const countSolicitado = await prisma.swapRequest.count({ where: { ...whereClause, status: SwapStatus.SOLICITADO } });
        fastify.log.info(`[summary/user] countSolicitado: ${countSolicitado}`);
        
        const countAgendado = await prisma.swapRequest.count({ where: { ...whereClause, status: SwapStatus.AGENDADO } });
        fastify.log.info(`[summary/user] countAgendado: ${countAgendado}`);

        const countRealizado = await prisma.swapRequest.count({ where: { ...whereClause, status: SwapStatus.REALIZADO } });
        fastify.log.info(`[summary/user] countRealizado: ${countRealizado}`);

        const countNaoRealizada = await prisma.swapRequest.count({ where: { ...whereClause, status: SwapStatus.NAO_REALIZADA } });
        fastify.log.info(`[summary/user] countNaoRealizada: ${countNaoRealizada}`);

        const countTroca = await prisma.swapRequest.count({ where: { ...whereClause, eventType: SwapEventType.TROCA } });
        fastify.log.info(`[summary/user] countTroca: ${countTroca}`);

        const countSubstituicao = await prisma.swapRequest.count({ where: { ...whereClause, eventType: SwapEventType.SUBSTITUICAO } });
        fastify.log.info(`[summary/user] countSubstituicao: ${countSubstituicao}`);

        // A contagem de "agendado atrasado" só faz sentido sem filtro de data
        let countAgendadoAtrasado = 0;
        if (!swapDateStart && !swapDateEnd) {
            countAgendadoAtrasado = await prisma.swapRequest.count({
                where: {
                    submittedById: userId,
                    status: SwapStatus.AGENDADO,
                    OR: [ { swapDate: { lt: new Date() } }, { paybackDate: { lt: new Date() } } ],
                }
            });
        }
        fastify.log.info(`[summary/user] countAgendadoAtrasado: ${countAgendadoAtrasado}`);

        // Montar e retornar o objeto de resumo
        const summary = {
          byStatus: {
            [SwapStatus.SOLICITADO]: countSolicitado,
            [SwapStatus.AGENDADO]: countAgendado,
            [SwapStatus.REALIZADO]: countRealizado,
            [SwapStatus.NAO_REALIZADA]: countNaoRealizada,
          },
          byType: {
            [SwapEventType.TROCA]: countTroca,
            [SwapEventType.SUBSTITUICAO]: countSubstituicao,
          },
          attention: {
            scheduledPastDue: countAgendadoAtrasado,
          },
        };

        fastify.log.info('[summary/user] Sending success response');
        return reply.status(200).send(summary);

      } catch (error: any) {
        fastify.log.error({ msg: 'Error fetching user request summary', error: error, stack: error?.stack });
        return reply
          .status(500)
          .send({ message: 'Erro interno ao buscar resumo das solicitações do usuário.' });
      }
    }
  );
  // --- FIM da Rota GET /summary/user ---

  // --- Rota PATCH para atualizar a observação (ADMIN) ---
  fastify.patch(
    '/:id', // Rota unificada para atualizar status e/ou observação
    {
      onRequest: [authenticate], // Admin Only
    },
    async (request, reply) => {
      try {
        // 1. Verificar Role Admin
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({ message: 'Acesso negado.' });
        }

        // 2. Validar Parâmetro ID da URL
        const paramsParse = requestIdParamsSchema.safeParse(request.params);
        if (!paramsParse.success) {
          return reply.status(400).send({
            message: 'ID inválido.',
            issues: paramsParse.error.format(),
          });
        }
        const { id } = paramsParse.data;

        // 3. Validar Corpo da Requisição (com schema flexível)
        const bodyParse = swapRequestUpdateSchema.safeParse(request.body);
        if (!bodyParse.success) {
          return reply.status(400).send({
            message: 'Dados inválidos.',
            issues: bodyParse.error.format(),
          });
        }
        // bodyParse.data contém { status?: ..., observation?: ... }
        const validatedData = bodyParse.data;

        // 4. Construir objeto de dados para o Prisma APENAS com os campos fornecidos
        const dataToUpdate: Prisma.SwapRequestUpdateInput = {};
        let actionDetail = ''; // Para log de auditoria

        if (validatedData.status !== undefined) {
          dataToUpdate.status = validatedData.status;
          actionDetail += `Status set to ${validatedData.status}. `;
        }
        if (validatedData.observation !== undefined) {
          dataToUpdate.observation = validatedData.observation; // Permite null
          actionDetail += `Observation set to: ${validatedData.observation ? `"${validatedData.observation}"` : 'null'}.`;
        }

        // 5. Atualizar no Banco
        // Usamos findUnique primeiro para garantir que existe antes de logar/atualizar
        const existingRequest = await prisma.swapRequest.findUnique({
          where: { id },
        });
        if (!existingRequest) {
          return reply
            .status(404)
            .send({ message: 'Solicitação não encontrada.' });
        }

        const updatedRequest = await prisma.swapRequest.update({
          where: { id: id },
          data: dataToUpdate,
        });

        // 6. Log de Auditoria Dinâmico
        let auditAction = 'UPDATE_REQUEST_DATA'; // Ação genérica se ambos mudarem
        if (
          validatedData.status !== undefined &&
          validatedData.observation === undefined
        ) {
          auditAction = 'UPDATE_REQUEST_STATUS';
        } else if (
          validatedData.status === undefined &&
          validatedData.observation !== undefined
        ) {
          auditAction = 'UPDATE_REQUEST_OBSERVATION';
        }

        try {
          // Busca dados do admin para o log
          const actingAdmin = await prisma.user.findUnique({
            where: { id: parseInt(request.user.sub, 10) },
            select: { loginIdentifier: true },
          });
          await logAudit({
            prisma,
            userId: parseInt(request.user.sub, 10),
            userLoginIdentifier:
              actingAdmin?.loginIdentifier ?? `AdminID:${request.user.sub}`,
            action: auditAction,
            details: actionDetail.trim(),
            targetResourceId: updatedRequest.id,
            targetResourceType: 'SwapRequest',
          });
        } catch (logError) {
          fastify.log.error({
            msg: 'Failed to fetch admin details for audit log on PATCH /:id',
            error: logError,
          });
        }

        // 7. Retornar sucesso
        return reply.status(200).send({ request: updatedRequest });
      } catch (error) {
        // Tratamento de erro (similar ao anterior, mas P2025 foi tratado acima)
        if (error instanceof ZodError) {
          // Segurança extra
          return reply.status(400).send({
            message: 'Erro de validação Zod.',
            issues: error.format(),
          });
        }
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2025'
        ) {
          // Não deve mais acontecer por causa do findUnique antes, mas por segurança
          return reply.status(404).send({
            message: 'Solicitação não encontrada (erro P2025 inesperado).',
          });
        }
        fastify.log.error({
          msg: 'Internal error on PATCH /requests/:id',
          error,
        });
        return reply
          .status(500)
          .send({ message: 'Erro interno ao atualizar solicitação.' });
      }
    }
  );

  // Adicione aqui outras rotas relacionadas a requests no futuro (GET /requests, etc.)
  // --- Rota DELETE para deletar uma solicitação ---
  fastify.delete(
    '/:id',
    {
      onRequest: [authenticate], // Protegido por autenticação
    },
    async (request, reply) => {
      try {
        // 1. Validar Parâmetro ID da URL
        const paramsParse = requestIdParamsSchema.safeParse(request.params);
        if (!paramsParse.success) {
          return reply.status(400).send({
            message: 'ID inválido.',
            issues: paramsParse.error.format(),
          });
        }
        const { id } = paramsParse.data;

        // 2. Buscar a solicitação existente
        const existingRequest = await prisma.swapRequest.findUnique({
          where: { id },
        });

        if (!existingRequest) {
          return reply
            .status(404)
            .send({ message: 'Solicitação não encontrada.' });
        }

        // 3. Verificar permissões e propriedade
        const userId = parseInt(request.user.sub, 10);
        const userRole = request.user.role;

        // Apenas ADMIN ou o próprio ENCARREGADO que submeteu pode deletar
        if (
          userRole !== Role.ADMINISTRADOR &&
          (userRole !== Role.ENCARREGADO ||
            existingRequest.submittedById !== userId)
        ) {
          return reply.status(403).send({
            message: 'Acesso negado. Você não tem permissão para deletar esta solicitação.',
          });
        }

        // 4. Verificar status da solicitação para deleção
        // Só pode deletar se o status for AGENDADO ou NAO_REALIZADA
        if (
          existingRequest.status !== SwapStatus.SOLICITADO &&
          existingRequest.status !== SwapStatus.NAO_REALIZADA
        ) {
          return reply.status(400).send({
            message:
              'Não é possível deletar solicitações com status diferente de SOLICITADO ou NÃO REALIZADA.',
          });
        }

        // 5. Deletar a solicitação
        await prisma.swapRequest.delete({
          where: { id },
        });

        // 6. Log de Auditoria
        try {
          const actingUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { loginIdentifier: true },
          });
          await logAudit({
            prisma,
            userId: userId,
            userLoginIdentifier:
              actingUser?.loginIdentifier ?? `UserID:${userId}`,
            action: 'DELETE_SWAP_REQUEST',
            details: `User ${actingUser?.loginIdentifier} deleted swap request ${id} (Status: ${existingRequest.status}).`,
            targetResourceId: id,
            targetResourceType: 'SwapRequest',
          });
        } catch (logError) {
          fastify.log.error({
            msg: 'Failed to create audit log for DELETE /requests/:id',
            error: logError,
          });
        }

        // 7. Retornar sucesso (204 No Content)
        return reply.status(204).send();
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação Zod.',
            issues: error.format(),
          });
        }
        fastify.log.error({
          msg: 'Internal error on DELETE /requests/:id',
          error,
        });
        return reply
          .status(500)
          .send({ message: 'Erro interno ao deletar solicitação.' });
      }
    }
  );

  fastify.log.info('Request routes registered');

  // --- Rota GET /vigencias (para saber os meses com solicitações)
  fastify.get(
    '/vigencias',
    {
      onRequest: [authenticate], // Exige autenticação
    },
    async (request, reply) => {
      try {
        const userId = parseInt(request.user.sub, 10);

        // A query raw é a forma mais eficiente de obter meses distintos
        // A sintaxe pode variar um pouco entre bancos (SQLite vs PostgreSQL)
        // Esta sintaxe com STRFTIME é comum para SQLite.
        const results: Array<{ month: string }> = await prisma.$queryRaw`
          SELECT DISTINCT TO_CHAR("swapDate", 'YYYY-MM') as month
          FROM "swap_requests"
          WHERE "submittedById" = ${userId}
          ORDER BY month DESC
        `;

        // Extrai apenas a string do mês do resultado
        const activeMonths = results.map(item => item.month);

        return reply.status(200).send(activeMonths);

      } catch (error: any) {
        fastify.log.error({ msg: 'Error fetching request vigencias', error: error, stack: error?.stack });
        return reply
          .status(500)
          .send({ message: 'Erro interno ao buscar vigências.' });
      }
    }
  );

  // --- Rota GET /vigencias/all (ADMIN ONLY) ---
  fastify.get(
    '/vigencias/all',
    {
      onRequest: [authenticate], // Exige autenticação de Admin
    },
    async (request, reply) => {
      try {
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({ message: 'Acesso negado.' });
        }

        const results: Array<{ month: string }> = await prisma.$queryRaw`
          SELECT DISTINCT TO_CHAR("swapDate", 'YYYY-MM') as month
          FROM "swap_requests"
          ORDER BY month DESC
        `;

        const activeMonths = results.map(item => item.month);

        return reply.status(200).send(activeMonths);

      } catch (error: any) {
        fastify.log.error({ msg: 'Error fetching all vigencias', error: error, stack: error?.stack });
        return reply
          .status(500)
          .send({ message: 'Erro interno ao buscar todas as vigências.' });
      }
    }
  );
}
