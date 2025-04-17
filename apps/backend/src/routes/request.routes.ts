// apps/backend/src/routes/request.routes.ts
import { Role, SwapEventType, SwapStatus } from '@prisma/client';
import { getISOWeek } from 'date-fns'; // Helpers de data
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { authenticate } from '../hooks/authenticate.hook.js'; // Nosso hook de auth
import { prisma } from '../lib/prisma.js';
import { swapRequestCreateBodySchema } from '../schemas/request.schema.js'; // Nosso schema Zod

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

        // 3.3: TODO - Verificar Janela de Submissão
        // Comparar data atual com a data limite configurável pelo ADM
        // (Implementaremos quando tivermos a configuração do ADM)
        const isSubmissionWindowOk = true; // Placeholder
        if (!isSubmissionWindowOk) {
          // return reply.status(400).send({ message: 'Fora da janela de submissão.' });
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

  // Adicione aqui outras rotas relacionadas a requests no futuro (GET /requests, etc.)
  fastify.log.info('Request routes registered');
}
