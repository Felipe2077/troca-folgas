// apps/backend/src/routes/settings.routes.ts
import { Role } from '@repo/shared-types';
import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { authenticate } from '../hooks/authenticate.hook.js';
import { prisma } from '../lib/prisma.js';
import { settingsUpdateSchema } from '../schemas/settings.schema.js'; // Importa schema

export async function settingsRoutes(fastify: FastifyInstance) {
  // --- Rota GET /api/settings (ADMIN) ---
  fastify.get(
    '/',
    {
      onRequest: [authenticate], // Precisa estar autenticado
    },
    async (request, reply) => {
      try {
        // Verificar Role (Admin pode ver, talvez Encarregado também precise?)
        // Por enquanto, vamos restringir a Admin para consistência.
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({ message: 'Acesso negado.' });
        }

        // Busca a única linha de settings (ID=1)
        // Usamos findUnique para buscar pela chave primária (id)
        const settings = await prisma.settings.findUnique({
          where: { id: 1 },
        });

        // Se por algum motivo MUITO estranho a linha não existir (seed falhou?)
        if (!settings) {
          fastify.log.error('Settings row with ID 1 not found in database!');
          return reply
            .status(404)
            .send({ message: 'Configurações não encontradas.' });
        }

        return reply.status(200).send({ settings });
      } catch (error) {
        fastify.log.error(error);
        return reply
          .status(500)
          .send({ message: 'Erro interno ao buscar configurações.' });
      }
    }
  );

  // --- Rota PUT /api/settings (ADMIN) ---
  fastify.put(
    '/',
    {
      onRequest: [authenticate], // Precisa estar autenticado
    },
    async (request, reply) => {
      try {
        // Verificar Role (Só Admin pode atualizar)
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({
            message:
              'Acesso negado. Apenas administradores podem atualizar configurações.',
          });
        }

        // Validar Corpo da Requisição
        const parseResult = settingsUpdateSchema.safeParse(request.body);
        if (!parseResult.success) {
          /* ... retorna erro 400 ... */
        }
        const validatedData = parseResult.data;

        // Atualizar (ou criar) a linha de settings ID=1
        const updatedSettings = await prisma.settings.upsert({
          where: { id: 1 },
          update: {
            // Usa os dados validados (que já são do tipo Enum do shared-types)
            // Prisma aceita a string do Enum diretamente aqui se os nomes baterem
            submissionStartDay: validatedData!.submissionStartDay,
            submissionEndDay: validatedData!.submissionEndDay,
          },
          create: {
            id: 1,
            submissionStartDay: validatedData!.submissionStartDay,
            submissionEndDay: validatedData!.submissionEndDay,
          },
        });

        return reply.status(200).send({ settings: updatedSettings });
      } catch (error) {
        if (error instanceof ZodError) {
          // Segurança extra
          return reply
            .status(400)
            .send({ message: 'Erro de validação.', issues: error.format() });
        }
        fastify.log.error(error);
        return reply
          .status(500)
          .send({ message: 'Erro interno ao atualizar configurações.' });
      }
    }
  );

  fastify.log.info('Settings routes registered');
}
