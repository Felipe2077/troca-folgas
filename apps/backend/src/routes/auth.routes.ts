// apps/backend/src/routes/auth.routes.ts
import { Role } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { comparePassword } from '../lib/hash.js'; // Importa comparePassword
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

// Schema Zod para validar o corpo da requisição de login (pode ficar aqui ou em um arquivo de schemas)
const loginBodySchema = z.object({
  loginIdentifier: z.string(),
  password: z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
});

// Hook de autenticação (movido para cá)
async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (_err) {
    reply.status(401).send({
      message: 'Autenticação necessária. Token inválido ou expirado.',
    });
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

  // Adicione aqui outras rotas relacionadas à autenticação no futuro (ex: /register, /refresh_token)
  fastify.log.info('Auth routes registered'); // Log útil para debug
}
