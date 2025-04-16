// apps/backend/src/server.ts
import fastifyEnv from '@fastify/env'; // Import @fastify/env
import jwt from '@fastify/jwt'; // Import @fastify/jwt
import fastify from 'fastify';
import { z } from 'zod';
import { authRoutes } from './routes/auth.routes.js';

// Schema para validar variáveis de ambiente com @fastify/env
const zodEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  BACKEND_PORT: z.coerce.number().default(3333), // Coerce para número, default 3333
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

const envSchemaJson = {
  type: 'object',
  required: ['DATABASE_URL', 'JWT_SECRET'], // <-- Define quais variáveis são obrigatórias
  properties: {
    DATABASE_URL: { type: 'string' },
    JWT_SECRET: { type: 'string' }, // tipo string
    BACKEND_PORT: { type: 'number', default: 3333 }, // tipo número, valor padrão
    NODE_ENV: {
      type: 'string',
      enum: ['development', 'production', 'test'], // valores permitidos
      default: 'development', // valor padrão
    },
  },
};

// Declare tipos para as variáveis de ambiente validadas
declare module 'fastify' {
  interface FastifyInstance {
    env: z.infer<typeof zodEnvSchema>;
  }
}

const app = fastify({ logger: true });

// Registrar @fastify/env PRIMEIRO para carregar e validar .env
await app.register(fastifyEnv, {
  confKey: 'env', // Disponibiliza as variáveis em app.env
  schema: envSchemaJson,
  dotenv: true, // Carrega do arquivo .env na raiz automaticamente
});

// Registrar @fastify/jwt DEPOIS de carregar env
await app.register(jwt, {
  secret: app.env.JWT_SECRET, // Usa o segredo carregado do .env
  sign: {
    expiresIn: '7d', // Define expiração do token (ex: 7 dias)
  },
});

// --------------- ROTAS ---------
await app.register(authRoutes, { prefix: '/api/auth' }); // Exemplo de prefixo

// Rota de exemplo simples (pode manter ou remover)
app.get('/', async (_request, _reply) => {
  return { hello: 'world from Fastify!' };
});

// ----- INICIALIZAÇÃO DO SERVIDOR -----
const start = async () => {
  try {
    await app.listen({ port: app.env.BACKEND_PORT, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
