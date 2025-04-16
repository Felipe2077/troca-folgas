// apps/backend/src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Cria uma instância única do PrismaClient
export const prisma = new PrismaClient({
  // Habilita log de queries no terminal durante desenvolvimento
  log: ['query', 'info', 'warn', 'error'],
});
