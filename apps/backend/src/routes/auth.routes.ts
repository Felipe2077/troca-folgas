// apps/backend/src/routes/auth.routes.ts
import { Role } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { authenticate } from '../hooks/authenticate.hook.js'; // Importa o hook compartilhado
import { comparePassword, hashPassword } from '../lib/hash.js'; // Importa comparePassword
import { prisma } from '../lib/prisma.js'; // Importa prisma
import { loginBodySchema, registerBodySchema } from '../schemas/auth.schema.js'; // <-- NOVO IMPORT

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
    try {
      const body = loginBodySchema.parse(request.body);
      const user = await prisma.user.findUnique({
        where: { loginIdentifier: body.loginIdentifier },
      });

      if (!user) {
        return reply.status(401).send({ message: 'Credenciais inválidas.' });
      }

      const isPasswordCorrect = await comparePassword(
        body.password,
        user.passwordHash
      );

      if (!isPasswordCorrect) {
        return reply.status(401).send({ message: 'Credenciais inválidas.' });
      }

      // Gera o token JWT (usa 'reply.jwtSign' que vem do plugin registrado no app principal)
      const token = await reply.jwtSign(
        { role: user.role },
        { sign: { sub: user.id.toString() } }
      );

      return reply.status(200).send({ token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ message: 'Erro de validação.', issues: error.format() });
      }
      fastify.log.error(error); // Usa o logger da instância do fastify passada para o plugin
      return reply.status(500).send({ message: 'Erro interno do servidor.' });
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
  fastify.post('/register', async (request, reply) => {
    try {
      // 1. Validar o corpo da requisição
      const body = registerBodySchema.parse(request.body);

      // 2. Verificar se já existe usuário com este loginIdentifier
      const existingUser = await prisma.user.findUnique({
        where: { loginIdentifier: body.loginIdentifier },
      });

      if (existingUser) {
        // Retorna erro 409 Conflict se o identificador já estiver em uso
        return reply
          .status(409)
          .send({ message: 'Identificador de login já está em uso.' });
      }

      // 3. Hashear a senha antes de salvar
      const passwordHash = await hashPassword(body.password);

      // 4. Criar o usuário no banco de dados
      const newUser = await prisma.user.create({
        data: {
          name: body.name,
          loginIdentifier: body.loginIdentifier,
          passwordHash: passwordHash, // Salva o HASH, não a senha original!
          role: body.role,
        },
      });

      // 5. Retornar resposta de sucesso (201 Created)
      // NUNCA retorne a hash da senha
      const { passwordHash: _, ...userWithoutPassword } = newUser; // Remove o hash da resposta

      return reply.status(201).send({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ message: 'Erro de validação.', issues: error.format() });
      }
      fastify.log.error(error);
      // Poderia tratar erros específicos do Prisma aqui (ex: falha de conexão)
      return reply
        .status(500)
        .send({ message: 'Erro interno do servidor ao criar usuário.' });
    }
  });

  // Adicione aqui outras rotas relacionadas à autenticação no futuro (ex: /register, /refresh_token)
  fastify.log.info('Auth routes registered'); // Log útil para debug
}
