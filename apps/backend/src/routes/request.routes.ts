// apps/backend/src/routes/request.routes.ts
import {
  DayOfWeek,
  Prisma,
  Role,
  SwapEventType,
  SwapStatus,
} from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { swapRequestCreateBodySchema /* ... */ } from '@repo/shared-types';
import { getISOWeek } from 'date-fns'; // Helpers de data
import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { authenticate } from '../hooks/authenticate.hook.js'; // Nosso hook de auth
import { logAudit } from '../lib/audit.js';
import { prisma } from '../lib/prisma.js';
import {
  requestIdParamsSchema,
  requestListQuerySchema,
  requestUpdateObservationBodySchema,
} from '../schemas/request.schema.js'; // Nosso schema Zod

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
  fastify.get(
    '/', // Usará o prefixo '/api/requests' definido em server.ts
    { onRequest: [authenticate] },
    async (request, reply) => {
      try {
        // 1. Verificar Role (continua igual)
        if (request.user.role !== Role.ADMINISTRADOR) {
          /* ... */
        }

        // 2. Validar Query Parameters (agora inclui sortBy/sortOrder)
        const queryParse = requestListQuerySchema.safeParse(request.query);
        if (!queryParse.success) {
          return reply.status(400).send({
            /* ... */
          });
        }
        // Pega os valores validados (com defaults se não passados)
        const { status: statusFilter, sortBy, sortOrder } = queryParse.data;

        // 3. Construir Cláusula Where (continua igual)
        const whereClause: { status?: SwapStatus } = {};
        if (statusFilter) {
          whereClause.status = statusFilter;
        }

        // 4. Construir Cláusula OrderBy (NOVO)
        // Cria o objeto orderBy dinamicamente: { [nomeDaColuna]: 'asc' | 'desc' }
        const orderByClause = {
          [sortBy || 'createdAt']: sortOrder || 'desc', // Usa defaults se não vier na query
        };

        // 5. Buscar Solicitações no Banco (MODIFICADO para incluir orderBy)
        const requests = await prisma.swapRequest.findMany({
          where: whereClause,
          orderBy: orderByClause, // <--- USA A CLÁUSULA ORDER BY
          // include: { ... }
        });

        // 6. Retornar a lista (filtrada e ordenada)
        return reply.status(200).send({ requests });
      } catch (error) {
        // Tratamento de erro continua igual
        fastify.log.error(error);
        return reply.status(500).send({
          message: 'Erro interno do servidor ao buscar solicitações.',
        });
      }
    }
  );
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
        const createdRequest = await prisma.$transaction(async (tx) => {
          // Cria a solicitação ORIGINAL primeiro
          const originalRequest = await tx.swapRequest.create({
            data: {
              ...body, // Dados validados do Zod
              eventType: eventType,
              status: SwapStatus.AGENDADO,
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
  // --- Rota PATCH para atualizar a observação (ADMIN) ---
  fastify.patch(
    '/:id', // Captura o ID da URL
    {
      onRequest: [authenticate], // Precisa estar autenticado
    },
    async (request, reply) => {
      try {
        // 1. Verificar Role (Só Admin pode atualizar)
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({
            message:
              'Acesso negado. Apenas administradores podem atualizar solicitações.',
          });
        }

        // 2. Validar Parâmetro da Rota (ID)
        const paramsParse = requestIdParamsSchema.safeParse(request.params);
        if (!paramsParse.success) {
          return reply.status(400).send({
            message: 'ID inválido na URL.',
            issues: paramsParse.error.format(),
          });
        }
        const { id } = paramsParse.data;

        // 3. Validar Corpo da Requisição (Observação)
        const bodyParse = requestUpdateObservationBodySchema.safeParse(
          request.body
        );
        if (!bodyParse.success) {
          return reply.status(400).send({
            message: 'Dados inválidos no corpo da requisição.',
            issues: bodyParse.error.format(),
          });
        }
        const { observation } = bodyParse.data;

        // 4. Atualizar no Banco de Dados
        const updatedRequest = await prisma.swapRequest.update({
          where: { id: id },
          data: {
            observation: observation, // Atualiza APENAS a observação
            // updatedAt será atualizado automaticamente pelo Prisma
          },
        });
        // 5. Log de Auditoria
        try {
          // Opcional: try/catch para busca do admin
          const actingAdminObs = await prisma.user.findUnique({
            where: { id: parseInt(request.user.sub, 10) },
            select: { loginIdentifier: true },
          });
          await logAudit({
            prisma,
            userId: parseInt(request.user.sub, 10),
            userLoginIdentifier:
              actingAdminObs?.loginIdentifier ?? `AdminID:${request.user.sub}`,
            action: 'UPDATE_REQUEST_OBSERVATION',
            details: `Observation for request ${updatedRequest.id} set to: ${updatedRequest.observation ? `"${updatedRequest.observation}"` : 'null'}`,
            targetResourceId: updatedRequest.id,
            targetResourceType: 'SwapRequest',
          });
        } catch (logError) {
          fastify.log.error({
            msg: 'Failed to fetch admin details for audit log on PATCH /:id',
            error: logError,
          });
        }

        // 6. Retornar sucesso com a solicitação atualizada
        return reply.status(200).send({ request: updatedRequest });
      } catch (error) {
        // Tratamento de Erro Específico do Prisma (Ex: ID não encontrado)
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            return reply
              .status(404)
              .send({ message: 'Solicitação não encontrada.' });
          }
        }
        // Tratamento de erro Zod (embora safeParse deva pegar antes)
        if (error instanceof ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação.',
            issues: error.format(),
          });
        }
        // Log e erro genérico para outros problemas
        fastify.log.error(error);
        return reply.status(500).send({
          message: 'Erro interno do servidor ao atualizar observação.',
        });
      }
    }
  );
  // --- Rota PATCH para marcar como NÃO REALIZADA (ADMIN) ---
  fastify.patch(
    '/:id/status', // Rota específica para mudar o status
    {
      onRequest: [authenticate], // Precisa estar autenticado
    },
    async (request, reply) => {
      try {
        // 1. Verificar Role (Só Admin pode fazer isso)
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({
            message:
              'Acesso negado. Apenas administradores podem alterar o status.',
          });
        }

        // 2. Validar Parâmetro da Rota (ID)
        const paramsParse = requestIdParamsSchema.safeParse(request.params);
        if (!paramsParse.success) {
          return reply.status(400).send({
            message: 'ID inválido na URL.',
            issues: paramsParse.error.format(),
          });
        }
        const { id } = paramsParse.data;

        // 3. Atualizar o Status no Banco de Dados
        // Não precisamos de dados do corpo, o status é fixo
        const updatedRequest = await prisma.swapRequest.update({
          where: { id: id },
          data: {
            status: SwapStatus.NAO_REALIZADA, // Define o status diretamente
          },
        });
        //  Log de Auditoria
        try {
          const actingAdminStatus = await prisma.user.findUnique({
            where: { id: parseInt(request.user.sub, 10) },
            select: { loginIdentifier: true },
          });
          await logAudit({
            prisma,
            userId: parseInt(request.user.sub, 10),
            userLoginIdentifier:
              actingAdminStatus?.loginIdentifier ??
              `AdminID:${request.user.sub}`,
            action: 'UPDATE_REQUEST_STATUS',
            details: `Status for request ${updatedRequest.id} set to ${SwapStatus.NAO_REALIZADA}`,
            targetResourceId: updatedRequest.id,
            targetResourceType: 'SwapRequest',
          });
        } catch (logError) {
          fastify.log.error({
            msg: 'Failed to fetch admin details for audit log on PATCH /:id/status',
            error: logError,
          });
        }

        // 4. Retornar sucesso com a solicitação atualizada
        return reply.status(200).send({ request: updatedRequest });
      } catch (error) {
        // Trata erro se a solicitação com o ID não for encontrada
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            console.error(
              `[API PATCH /requests/:id/status] Registro com ID ${(request.params as any)?.id} não encontrado (P2025).`
            );
            return reply
              .status(404)
              .send({ message: 'Solicitação não encontrada.' });
          }
        }
        // Outros erros
        fastify.log.error(error);
        return reply
          .status(500)
          .send({ message: 'Erro interno do servidor ao atualizar status.' });
      }
    }
  );

  // Adicione aqui outras rotas relacionadas a requests no futuro (GET /requests, etc.)
  fastify.log.info('Request routes registered');
}
