// apps/backend/src/routes/auth.routes.ts
import { Prisma } from '@prisma/client';
import { loginBodySchema, registerBodySchema, Role } from '@repo/shared-types';

import { FastifyInstance } from 'fastify';
import { authenticate } from '../hooks/authenticate.hook.js'; // Importa o hook compartilhado
import { logAudit } from '../lib/audit.js'; // <-- Caminho relativo e extensão .js
import { comparePassword, hashPassword } from '../lib/hash.js'; // Importa comparePassword
import { prisma } from '../lib/prisma.js'; // Importa prisma

declare module '@fastify/jwt' {
  // Interface para estender/definir tipos dentro do @fastify/jwt
  interface FastifyJWT {
    // Define a estrutura do objeto 'user' que é adicionado ao 'request'
    // pelo hook após jwtVerify() ser bem-sucedido
    user: {
      sub: string; // O ID do usuário (vem do jwtSign({ sign: { sub: ... } }))
      role: Role; // A Role do usuário (vem do payload do jwtSign)
      // O @fastify/jwt também adiciona iat (issued at) e exp (expiration time)
      iat: number;
      exp: number;
    };
  }
}

// Define o plugin de rotas
export async function authRoutes(fastify: FastifyInstance) {
  // Rota de Login (agora usa 'fastify' em vez de 'app')
  fastify.post('/login', async (request, reply) => {
    // 1. Validar Corpo com safeParse
    const validationResult = loginBodySchema.safeParse(request.body);

    // 2. Se validação falhar, retorna 400
    if (!validationResult.success) {
      return reply.status(400).send({
        message: 'Erro de validação.',
        issues: validationResult.error.format(),
      });
    }

    // 3. Se passou, pega os dados validados
    const body = validationResult.data;

    // Lógica de negócio (dentro de try/catch para erros Prisma/outros)
    try {
      // 4. Busca usuário
      const user = await prisma.user.findUnique({
        where: { loginIdentifier: body.loginIdentifier },
      });

      // 5. Verifica se usuário existe
      if (!user) {
        return reply.status(401).send({ message: 'Credenciais inválidas.' });
      }

      // 6. Verifica se usuário está ativo (importante!)
      if (!user.isActive) {
        fastify.log.warn(
          `Login attempt for deactivated user: ${user.loginIdentifier}`
        );
        return reply
          .status(403)
          .send({ message: 'Conta de usuário desativada.' });
      }

      // 7. Verifica senha
      const isPasswordCorrect = await comparePassword(
        body.password,
        user.passwordHash
      );
      if (!isPasswordCorrect) {
        return reply.status(401).send({ message: 'Credenciais inválidas.' });
      }

      // 8. Gera token
      const token = await reply.jwtSign(
        { role: user.role }, // Payload
        { sign: { sub: String(user.id) } } // Subject (ID do usuário) como string
      );

      // Log de Auditoria (como antes)
      await logAudit({
        prisma,
        userId: user.id,
        userLoginIdentifier: user.loginIdentifier,
        action: 'USER_LOGIN',
        details: `User logged in successfully.`,
      });

      // 9. Retorna token
      return reply.status(200).send({ token });
    } catch (error) {
      // O catch agora só trata erros inesperados (ex: DB offline)
      fastify.log.error({ msg: 'Internal error on login', error });
      return reply
        .status(500)
        .send({ message: 'Erro interno do servidor durante o login.' });
    }
  });

  // Rota Protegida /me (agora usa 'fastify' e o hook 'authenticate' definido aqui)
  fastify.get('/me', { onRequest: [authenticate] }, async (request, reply) => {
    // request.user está disponível aqui por causa do hook authenticate e jwtVerify
    const userId = parseInt(request.user.sub, 10);

    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        loginIdentifier: true,
        role: true,
        createdAt: true,
      },
    });

    if (!userProfile) {
      // Embora improvável se o token for válido, é bom verificar
      return reply.status(404).send({ message: 'Usuário não encontrado.' });
    }

    return reply.status(200).send({ user: userProfile });
  });

  // Rota para registrar um novo usuário
  fastify.post(
    '/register',
    {
      onRequest: [authenticate], // Mantém proteção Admin Only
    },
    async (request, reply) => {
      // 1. Validar Corpo com safeParse
      const validationResult = registerBodySchema.safeParse(request.body);

      // 2. Se validação falhar, retorna 400 imediatamente
      if (!validationResult.success) {
        return reply.status(400).send({
          message: 'Erro de validação.',
          issues: validationResult.error.format(), // Usa o erro formatado
        });
      }

      // 3. Se passou, pega os dados validados de result.data
      const body = validationResult.data;

      // Lógica de negócio (continua dentro de um try/catch para erros Prisma/outros)
      try {
        // 4. Verificar Role do Admin (continua igual)
        if (request.user.role !== Role.ADMINISTRADOR) {
          return reply.status(403).send({
            message:
              'Acesso negado. Apenas administradores podem registrar novos usuários.',
          });
        }

        // 5. Verifica se loginIdentifier já existe
        const existingUser = await prisma.user.findUnique({
          where: { loginIdentifier: body.loginIdentifier },
        });
        if (existingUser) {
          return reply.status(409).send({ message: 'Crachá já está em uso.' }); // 409 Conflict
        }

        // 6. Hashear senha
        const passwordHash = await hashPassword(body.password);

        // 7. Cria usuário
        const newUser = await prisma.user.create({
          data: {
            name: body.name,
            loginIdentifier: body.loginIdentifier,
            passwordHash: passwordHash,
            role: body.role,
            isActive: true, // Usuário começa ativo
          },
        });

        const actingAdmin = await prisma.user.findUnique({
          // Busca dados do Admin que está agindo
          where: { id: parseInt(request.user.sub, 10) },
          select: { loginIdentifier: true }, // Pega só o crachá
        });

        // Log de Auditoria (como antes)
        await logAudit({
          prisma,
          userId: parseInt(request.user.sub, 10),
          userLoginIdentifier:
            actingAdmin?.loginIdentifier ?? `AdminID:${request.user.sub}`, // Usa o crachá ou fallback
          action: 'ADMIN_CREATE_USER',
          details: `Admin created user '${newUser.name}' (ID: ${newUser.id}) with role ${newUser.role}.`,
          targetResourceId: newUser.id,
          targetResourceType: 'User',
        });

        // 8. Retorna resposta (sem a senha)
        const { passwordHash: _, ...userWithoutPassword } = newUser;
        return reply.status(201).send({ user: userWithoutPassword });
      } catch (error) {
        // O catch agora só precisa tratar erros do Prisma ou outros erros inesperados
        // Não precisamos mais do 'if (error instanceof z.ZodError)' aqui
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Tratar erros específicos do Prisma se necessário (ex: unique constraint já pego acima)
          fastify.log.error({ msg: 'Prisma error on register', error });
          return reply
            .status(409)
            .send({ message: 'Erro ao criar usuário no banco.' });
        }
        fastify.log.error({ msg: 'Internal error on register', error });
        return reply
          .status(500)
          .send({ message: 'Erro interno do servidor ao criar usuário.' });
      }
    }
  );

  // Adicione aqui outras rotas relacionadas à autenticação no futuro (ex: /register, /refresh_token)
  fastify.log.info('Auth routes registered'); // Log útil para debug
}
