// apps/backend/src/routes/users.routes.ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Para P2025
import { Role } from '@repo/shared-types'; // Enum/Tipo Role compartilhado
import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod'; // Import ZodError
import { authenticate } from '../hooks/authenticate.hook.js'; // Hook de autenticação
import { prisma } from '../lib/prisma.js';
import {
  userIdParamsSchema,
  userUpdateStatusBodySchema,
} from '../schemas/users.schema.js';

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
          return reply.status(403).send({
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

  // ---  Rota PATCH /:id/status (ADMIN ONLY) ---
  fastify.patch(
    '/:id/status', // Rota para atualizar o status
    {
      onRequest: [authenticate], // Exige autenticação
    },
    async (request, reply) => {
      try {
        // 1. Verificar se é Administrador
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({
            message:
              'Acesso negado. Apenas administradores podem alterar status de usuários.',
          });
        }

        // 2. Validar Parâmetro da Rota (ID do usuário a ser modificado)
        const paramsParse = userIdParamsSchema.safeParse(request.params);
        if (!paramsParse.success) {
          return reply.status(400).send({
            message: 'ID de usuário inválido na URL.',
            issues: paramsParse.error.format(),
          });
        }
        const { id: userIdToModify } = paramsParse.data;

        // 3. Validar Corpo da Requisição ({ isActive: boolean })
        const bodyParse = userUpdateStatusBodySchema.safeParse(request.body);
        if (!bodyParse.success) {
          return reply.status(400).send({
            message: 'Corpo da requisição inválido.',
            issues: bodyParse.error.format(),
          });
        }
        const { isActive } = bodyParse.data;

        // 4. Verificar se o Admin está tentando desativar a si mesmo
        // request.user.sub contém o ID do usuário logado (vem do JWT)
        if (Number(request.user.sub) === userIdToModify && isActive === false) {
          return reply.status(403).send({
            message: 'Administradores não podem desativar a própria conta.',
          });
        }

        // 5. Atualizar o status do usuário no Banco de Dados
        const updatedUser = await prisma.user.update({
          where: { id: userIdToModify },
          data: {
            isActive: isActive, // Define o novo status
          },
          // Seleciona os campos para retornar (NÃO incluir passwordHash)
          select: {
            id: true,
            name: true,
            loginIdentifier: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        // 6. Retornar sucesso com o usuário atualizado
        return reply.status(200).send({ user: updatedUser });
      } catch (error) {
        // Trata erro se o usuário com o ID não for encontrado
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            console.error(
              `[API PATCH /users/:id/status] Usuário com ID ${(request.params as any)?.id} não encontrado (P2025).`
            );
            return reply
              .status(404)
              .send({ message: 'Usuário não encontrado.' });
          }
        }
        // Tratamento de erro Zod (embora safeParse deva pegar antes)
        if (error instanceof ZodError) {
          return reply
            .status(400)
            .send({ message: 'Erro de validação.', issues: error.format() });
        }
        // Outros erros
        fastify.log.error(error);
        return reply
          .status(500)
          .send({ message: 'Erro interno ao atualizar status do usuário.' });
      }
    }
  ); // Fim do PATCH /:id/status
  // Adicionaremos rotas POST (criar), PUT/PATCH (editar/desativar?), DELETE aqui depois...

  fastify.log.info('User routes registered');
}
