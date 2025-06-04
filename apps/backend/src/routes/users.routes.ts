// apps/backend/src/routes/users.routes.ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Role, userUpdateSchema } from '@repo/shared-types';

import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod'; // Import ZodError
import { authenticate } from '../hooks/authenticate.hook'; // Hook de autenticação
import { logAudit } from '../lib/audit'; // Log
import { prisma } from '../lib/prisma';
import { userIdParamsSchema } from '../schemas/users.schema';

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
            isActive: true,
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
    '/:id',
    {
      onRequest: [authenticate], // Exige autenticação
    },
    async (request, reply) => {
      try {
        // 1. Verificar se é Administrador
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({ message: 'Acesso negado.' });
        }

        // 2. Validar ID da URL
        const paramsParse = userIdParamsSchema.safeParse(request.params);
        if (!paramsParse.success) {
          return reply.status(400).send({
            message: 'ID de usuário inválido.',
            issues: paramsParse.error.format(),
          });
        }
        const { id: userIdToModify } = paramsParse.data;

        // 3. Validar Corpo da Requisição (name?, role?)
        const bodyParse = userUpdateSchema.safeParse(request.body);
        if (!bodyParse.success) {
          return reply.status(400).send({
            message: 'Dados inválidos.',
            issues: bodyParse.error.format(),
          });
        }
        const validatedData = bodyParse.data; // Contém name e/ou role validados

        // 4. Regra de Negócio: Admin não pode mudar a PRÓPRIA role
        const loggedInAdminId = parseInt(request.user.sub, 10);
        if (
          loggedInAdminId === userIdToModify &&
          validatedData.role !== undefined &&
          validatedData.role !== request.user.role
        ) {
          return reply.status(403).send({
            message: 'Administradores não podem alterar a própria role.',
          });
        }
        // Nota: Permitimos Admin alterar o PRÓPRIO nome.

        // 5. Atualizar Usuário no Banco
        const updatedUser = await prisma.user.update({
          where: { id: userIdToModify },
          data: {
            // Passa os dados validados (Prisma ignora chaves com valor undefined)
            name: validatedData.name,
            role: validatedData.role,
            // isActive não é modificado aqui, usamos a outra rota
          },
          select: {
            // Seleciona campos para retornar (sem hash)
            id: true,
            name: true,
            loginIdentifier: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        // 6. Log de Auditoria
        try {
          const actingAdmin = await prisma.user.findUnique({
            where: { id: loggedInAdminId },
            select: { loginIdentifier: true },
          });
          await logAudit({
            prisma,
            userId: loggedInAdminId,
            userLoginIdentifier:
              actingAdmin?.loginIdentifier ?? `AdminID:${loggedInAdminId}`,
            action: 'ADMIN_UPDATE_USER',
            details: `Admin updated user ${updatedUser.name} (ID: ${updatedUser.id}). Changes: ${JSON.stringify(validatedData)}`,
            targetResourceId: updatedUser.id,
            targetResourceType: 'User',
          });
        } catch (logError) {
          /* ... log error ... */
        }

        // 7. Retornar sucesso
        return reply.status(200).send({ user: updatedUser });
      } catch (error) {
        // Tratar erros Prisma (ex: usuário não encontrado P2025)
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2025'
        ) {
          return reply.status(404).send({ message: 'Usuário não encontrado.' });
        }
        // Outros erros
        if (error instanceof ZodError) {
          return reply
            .status(400)
            .send({ message: 'Erro Zod.', issues: error.format() });
        }
        fastify.log.error({ msg: 'Error updating user', error });
        return reply
          .status(500)
          .send({ message: 'Erro interno ao atualizar usuário.' });
      }
    }
  ); // Fim do PATCH /:id
  // Adicionaremos rotas POST (criar), PUT/PATCH (editar/desativar?), DELETE aqui depois...

  fastify.log.info('User routes registered');
}
