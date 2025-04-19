// apps/backend/src/routes/request.routes.ts
import { DayOfWeek, Role, SwapEventType, SwapStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { swapRequestCreateBodySchema /* ... */ } from '@repo/shared-types';
import { getISOWeek } from 'date-fns'; // Helpers de data
import { FastifyInstance } from 'fastify';
import { z, ZodError } from 'zod';
import { authenticate } from '../hooks/authenticate.hook.js'; // Nosso hook de auth
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
    '/', // Rota POST na raiz do prefixo que definiremos em server.ts (ex: /api/requests)
    {
      onRequest: [authenticate], // Aplica o hook de autenticação JWT primeiro
    },
    async (request, reply) => {
      try {
        // 1. Verificar Role do Usuário (vem do Token JWT via hook authenticate)
        // Assegura que request.user existe por causa do hook authenticate que já rodou
        if (request.user.role !== Role.ENCARREGADO) {
          return reply.status(403).send({
            message:
              'Acesso negado. Apenas encarregados podem criar solicitações.',
          });
        }

        // 2. Validar Corpo da Requisição com Schema Zod
        const body = swapRequestCreateBodySchema.parse(request.body);

        // 3. Aplicar Regras de Negócio Adicionais
        // 3.1: Datas devem ser Sábado ou Domingo
        if (!isWeekend(body.swapDate) || !isWeekend(body.paybackDate)) {
          return reply.status(400).send({
            message:
              'As datas da troca e do pagamento devem ser Sábados ou Domingos.',
          });
        }

        // 3.2: Grupos de Folga devem ser diferentes
        if (body.groupOut === body.groupIn) {
          return reply.status(400).send({
            message:
              'Os grupos de folga dos funcionários devem ser diferentes.',
          });
        }

        // 3.3: Verificar Janela de Submissão
        try {
          // Busca a configuração atual do banco CADA VEZ que uma request é feita
          // Poderia otimizar com cache depois, se necessário
          const settings = await prisma.settings.findUniqueOrThrow({
            where: { id: 1 }, // Busca a configuração única pelo ID fixo
          });
          const now = new Date();
          const currentDayOfWeek = now.getDay(); // 0=Domingo, 1=Seg, ..., 6=Sábado (JS Date standard)

          // Mapeia os Enums de Dia de Semana do Prisma/SharedTypes para números 0-6
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
          // Verifica se o dia atual está dentro do intervalo [startDayNum, endDayNum]
          // Trata o caso em que a janela "vira" a semana (ex: Sexta a Segunda)
          if (startDayNum <= endDayNum) {
            // Janela normal (ex: Segunda a Quarta)
            isWithinWindow =
              currentDayOfWeek >= startDayNum && currentDayOfWeek <= endDayNum;
          } else {
            // Janela que vira a semana (ex: Sexta a Segunda)
            // Permitido se for >= Dia de Início OU <= Dia Final
            isWithinWindow =
              currentDayOfWeek >= startDayNum || currentDayOfWeek <= endDayNum;
          }

          // Se NÃO estiver dentro da janela permitida...
          if (!isWithinWindow) {
            // Calcula o nome do próximo dia de início permitido para a mensagem de erro
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

            // Retorna erro 400 Bad Request com mensagem informativa
            return reply.status(400).send({
              message: `Submissões fora do período permitido. A janela abre na próxima ${nextOpeningDayName}.`,
            });
          }
          // Se chegou aqui, está dentro da janela, continua o fluxo...
        } catch (settingsError) {
          fastify.log.error(
            'Erro crítico ao buscar configurações para validar janela de submissão:',
            settingsError
          );
          // Se não conseguir ler as settings, é mais seguro bloquear a submissão
          return reply.status(500).send({
            message:
              'Erro interno ao verificar período de submissão. Tente novamente mais tarde.',
          });
        }

        // 4. Calcular eventType (Troca ou Substituição)
        const eventType = areDatesInSameISOWeek(body.swapDate, body.paybackDate)
          ? SwapEventType.TROCA
          : SwapEventType.SUBSTITUICAO;

        // 5. Preparar dados para salvar no banco
        const createData = {
          ...body, // Inclui todos os campos validados do Zod
          eventType: eventType,
          status: SwapStatus.AGENDADO, // Status inicial padrão
          submittedById: parseInt(request.user.sub, 10), // ID do Encarregado logado (do token JWT)
          // observation: null, // Opcional, não vem do encarregado
        };

        // 6. Salvar no Banco de Dados
        const newSwapRequest = await prisma.swapRequest.create({
          data: createData,
        });

        // 7. Retornar Sucesso (201 Created)
        return reply.status(201).send({ request: newSwapRequest });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply
            .status(400)
            .send({ message: 'Erro de validação.', issues: error.format() });
        }
        fastify.log.error(error);
        // Tratar erros específicos do Prisma (ex: falha de conexão, constraint violation)
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

        // 5. Retornar sucesso com a solicitação atualizada
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
