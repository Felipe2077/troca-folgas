// apps/backend/src/routes/audit.routes.ts
import { FastifyInstance } from 'fastify';
import { authenticate } from '../hooks/authenticate.hook';
import { prisma } from '../lib/prisma';
import { Role, auditLogListQuerySchema } from '@repo/shared-types'; // Importar o schema do shared-types
import { z } from 'zod'; // Manter z para outros usos, se houver

console.log('auditLogListQuerySchema after import:', auditLogListQuerySchema);

export async function auditRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      onRequest: [authenticate], // Exige autenticação
    },
    async (request, reply) => {
      try {
        // Apenas ADMINISTRADOR pode acessar logs de auditoria
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({ message: 'Acesso negado. Apenas administradores podem visualizar logs de auditoria.' });
        }

        const queryParse = auditLogListQuerySchema.safeParse(request.query);
        fastify.log.info({ msg: '[AuditLogs] Query Params received', query: request.query });

        if (!queryParse.success) {
          fastify.log.error({ msg: '[AuditLogs] Query validation failed', issues: queryParse.error.format() });
          return reply.status(400).send({
            message: 'Parâmetros de query inválidos.',
            issues: queryParse.error.format(),
          });
        }

        const { action, userId, userLoginIdentifier, timestampStart, timestampEnd, targetResourceType, limit, offset, sortBy, sortOrder } = queryParse.data;
        fastify.log.info({ msg: '[AuditLogs] Parsed query data', data: queryParse.data });

        const whereClause: any = {};
        if (action) {
          whereClause.action = action;
        }
        if (userId) {
          whereClause.userId = userId;
        }
        if (userLoginIdentifier) {
          whereClause.performedBy = { loginIdentifier: userLoginIdentifier };
        }
        if (targetResourceType) {
          whereClause.targetResourceType = targetResourceType;
        }

        // Filtro de data para timestamp
        if (timestampStart || timestampEnd) {
          whereClause.timestamp = {};
          if (timestampStart) {
            whereClause.timestamp.gte = new Date(timestampStart);
          }
          if (timestampEnd) {
            whereClause.timestamp.lte = new Date(timestampEnd);
          }
        }
        fastify.log.info({ msg: '[AuditLogs] Constructed whereClause', where: whereClause });

        const orderByClause: any = { [sortBy]: sortOrder };

        const auditLogs = await prisma.auditLog.findMany({
          where: whereClause,
          orderBy: orderByClause,
          take: limit,
          skip: offset,
          include: {
            performedBy: {
              select: {
                name: true,
                loginIdentifier: true,
                role: true,
              },
            },
          },
        });
        fastify.log.info({ msg: '[AuditLogs] Fetched audit logs', count: auditLogs.length });

        const totalCount = await prisma.auditLog.count({ where: whereClause });
        fastify.log.info({ msg: '[AuditLogs] Counted total logs', totalCount: totalCount });

        return reply.status(200).send({ auditLogs, totalCount });
      } catch (error: any) {
        fastify.log.error({ msg: 'Error fetching audit logs', error: error, stack: error?.stack });
        return reply.status(500).send({ message: 'Erro interno ao buscar logs de auditoria.' });
      }
    }
  );
}
