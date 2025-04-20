// apps/backend/prisma/seed.ts - VERSÃO COMPLETA E REVISADA
import { /*...,*/ DayOfWeek, PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Limpa dados existentes
  // Ordem: primeiro SwapRequest, depois Settings, depois User
  await prisma.swapRequest.deleteMany();
  console.log('Deleted existing swap requests.');
  await prisma.settings.deleteMany();
  console.log('Deleted existing settings.');
  await prisma.user.deleteMany();
  console.log('Deleted existing users.');

  // Cria Usuário Administrador Padrão
  try {
    const adminPasswordHash = await hash('senhaforte123', 8);
    const admin = await prisma.user.create({
      data: {
        name: 'Admin Sistema',
        loginIdentifier: 'admin@sistema.com',
        passwordHash: adminPasswordHash,
        role: Role.ADMINISTRADOR,
        isActive: true,
      },
    });
    console.log(
      `Created admin user: ${admin.loginIdentifier} (ID: ${admin.id})`
    );
  } catch (error) {
    console.error('!!! Erro ao criar usuário Admin:', error);
    throw error; // Re-lança para parar o seed se admin falhar
  }

  // Cria Usuário Encarregado Padrão
  let encargado; // Declara fora para ter escopo
  try {
    const encargadoPasswordHash = await hash('password123', 8);
    encargado = await prisma.user.create({
      // Atribui à variável externa
      data: {
        name: 'Felipe Encarregado',
        loginIdentifier: 'encarregado@teste.com',
        passwordHash: encargadoPasswordHash,
        role: Role.ENCARREGADO,
        isActive: true,
      },
    });
    console.log(
      `Created encargado user: ${encargado.loginIdentifier} (ID: ${encargado.id})`
    );
  } catch (error) {
    console.error('!!! Erro ao criar usuário Encarregado:', error); // Log mais específico
    throw error; // Re-lança para parar o seed
  }

  // Cria/Atualiza a linha única de Settings (ID=1)
  try {
    await prisma.settings.upsert({
      where: { id: 1 },
      update: {
        // Garante que valores padrão sejam aplicados se a linha já existir
        submissionStartDay: DayOfWeek.MONDAY,
        submissionEndDay: DayOfWeek.WEDNESDAY,
      },
      create: {
        id: 1,
        submissionStartDay: DayOfWeek.MONDAY, // Usa valor do Enum
        submissionEndDay: DayOfWeek.WEDNESDAY, // Usa valor do Enum
      },
    });
    // Ajuste o console.log se quiser mostrar os dias
    console.log(
      `Default settings created/ensured (ID: 1, StartDay: ${DayOfWeek.MONDAY}, EndDay: ${DayOfWeek.WEDNESDAY}).`
    );
  } catch (error) {
    console.error('!!! Erro ao criar/atualizar Settings:', error);
    throw error;
  }

  // Opcional: Criar algumas SwapRequests de exemplo (ainda comentado)
  // try {
  //   if (encargado) { // Só cria se o encarregado foi criado com sucesso
  //     await prisma.swapRequest.create({
  //       data: {
  //         employeeIdOut: "1111", employeeIdIn: "2222", swapDate: new Date("2025-07-06T00:00:00.000Z"),
  //         paybackDate: new Date("2025-07-13T00:00:00.000Z"),
  //         employeeFunction: EmployeeFunction.MOTORISTA, groupOut: ReliefGroup.G1, groupIn: ReliefGroup.G2,
  //         eventType: SwapEventType.SUBSTITUICAO, status: SwapStatus.AGENDADO, submittedById: encargado.id,
  //       }
  //     });
  //     console.log('Created sample swap request.');
  //   }
  // } catch (error) {
  //    console.error("!!! Erro ao criar SwapRequest de exemplo:", error);
  //    // Não lança erro aqui para o seed poder terminar mesmo se a request falhar
  // }

  console.log('Seeding finished.');
}

main()
  .catch(async (e) => {
    // O catch principal agora pegará erros re-lançados pelos try/catch internos
    console.error('Error during seeding execution:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
