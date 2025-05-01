// apps/backend/src/lib/audit.ts - VERSÃO CORRETA FINAL (DE NOVO!)
import { PrismaClient } from '@prisma/client';

interface LogAuditParams {
  prisma: PrismaClient;
  userId: number; // ID numérico do usuário
  userLoginIdentifier: string; // Identificador string (Crachá)
  action: string;
  details?: string;
  targetResourceId?: number;
  targetResourceType?: string;
}

export async function logAudit({
  prisma,
  userId,
  userLoginIdentifier,
  action,
  details,
  targetResourceId,
  targetResourceType,
}: LogAuditParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        // Conecta a relação 'performedBy' usando o userId
        performedBy: {
          connect: {
            id: userId, // Passa o ID numérico aqui
          },
        },
        // Define os outros campos escalares normalmente
        userLoginIdentifier: userLoginIdentifier, // Passa o Crachá aqui
        action: action,
        details: details,
        targetResourceId: targetResourceId,
        targetResourceType: targetResourceType,
      },
    });
  } catch (error) {
    console.error(
      `!!! Failed to create audit log for action [${action}] by user ${userId}:`,
      error
    );
  }
}
