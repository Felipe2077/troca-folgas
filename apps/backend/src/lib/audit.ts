// apps/backend/src/lib/audit.ts
import { PrismaClient } from '../generated/prisma';

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
        performedBy: {
          connect: {
            id: userId,
          },
        },
        userLoginIdentifier: userLoginIdentifier, // Define identificador escalar
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
