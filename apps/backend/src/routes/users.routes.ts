// apps/backend/src/routes/users.routes.ts
import { Role } from '@repo/shared-types'; // Enum/Tipo Role compartilhado
import { FastifyInstance } from 'fastify';
import { authenticate } from '../hooks/authenticate.hook.js'; // Hook de autenticação
import { prisma } from '../lib/prisma.js';

export async function usersRoutes(fastify: FastifyInstance) {
  // --- Rota GET /api/users (ADMIN ONLY) ---
  fastify.get(
    '/',
    {
      onRequest: [authenticate], // Exige autenticação
    },
    async (request, reply) => {
      try {
        // 1. Verificar se é Administrador
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply
            .status(403)
            .send({
              message:
                'Acesso negado. Apenas administradores podem listar usuários.',
            });
        }

        // 2. Buscar usuários no banco, selecionando APENAS os campos seguros
        const users = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            loginIdentifier: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            // NUNCA inclua passwordHash aqui!
          },
          orderBy: {
            name: 'asc', // Ordena por nome A-Z
          },
        });

        // 3. Retornar a lista
        return reply.status(200).send({ users });
      } catch (error) {
        fastify.log.error(error);
        return reply
          .status(500)
          .send({ message: 'Erro interno ao listar usuários.' });
      }
    }
  );

  // Adicionaremos rotas POST (criar), PUT/PATCH (editar/desativar?), DELETE aqui depois...

  fastify.log.info('User routes registered');
}
