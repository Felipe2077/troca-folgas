// apps/backend/src/test-prisma-import.ts
import { PrismaClient } from '@prisma/client/index'; // Usa o import específico

console.log('--- Teste de Import Prisma ---');
try {
  console.log('PrismaClient importado com sucesso:', typeof PrismaClient);
  const prisma = new PrismaClient();
  console.log('PrismaClient instanciado com sucesso.');
  // Não vamos conectar ao DB aqui, só testar a instanciação
  // await prisma.$connect();
  // console.log('Conectado (teste)');
  // await prisma.$disconnect();
  // console.log('Desconectado (teste)');
  console.log('Teste CONCLUÍDO com sucesso!');
  process.exit(0); // Sai com sucesso
} catch (err) {
  console.error('!!! ERRO no Teste de Import/Instanciação:', err);
  process.exit(1); // Sai com erro
}
