// apps/backend/src/lib/audit.ts -
import { PrismaClient } from '@prisma/client';

// Tipagem para os parâmetros da função de log
interface LogAuditParams {
  prisma: PrismaClient; // Instância do Prisma
  userId: number; // ID do usuário que realizou a ação
  userLoginIdentifier: string; // Identificador do usuário
  action: string; // Descrição da ação (ex: LOGIN, CREATE_REQUEST)
  details?: string; // Detalhes adicionais (opcional)
  targetResourceId?: number; // ID do recurso afetado (opcional)
  targetResourceType?: string; // Tipo do recurso afetado (opcional, ex: 'SwapRequest', 'User')
}

/**
 * Cria um registro na tabela de Log de Auditoria.
 * Captura erros silenciosamente para não quebrar a requisição principal.
 */
export async function logAudit({
  // Garanta o 'export' aqui
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
        userId: userId, // <-- Define userId diretamente
        userLoginIdentifier,
        action,
        details,
        targetResourceId,
        targetResourceType,
        // timestamp é gerado automaticamente pelo @default(now())
      },
    });
    // console.log(`Audit log created: User ${userId} performed ${action}`); // Log de sucesso (opcional)
  } catch (error) {
    // Apenas loga o erro no console do servidor, não lança exceção
    console.error(
      `!!! Failed to create audit log for action [${action}] by user ${userId}:`,
      error
    );
  }
}
