// apps/backend/src/server.ts
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env'; // Import @fastify/env
import jwt from '@fastify/jwt'; // Import @fastify/jwt
import fastify from 'fastify';
import { z } from 'zod';
import { envSchemaJson, zodEnvSchema } from './config/env.validation.js';
import { authRoutes } from './routes/auth.routes.js';
import { requestRoutes } from './routes/request.routes.js';
import { settingsRoutes } from './routes/settings.routes.js';
import { usersRoutes } from './routes/users.routes.js';

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

// Registrar @fastify/cors
await app.register(cors, {
  origin: (origin, cb) => {
    console.log(`[CORS] Received Origin: ${origin}`);
    // Permite localhost:3000, o IP específico da sua rede local na porta 3000, ou nenhuma origem (requests do mesmo servidor, curl, etc)
    const allowedOrigins = [
      'http://escala.vpioneira.com.br:3000',
      'http://localhost:3000',
      'http://0.0.0.0:3000',
      'http://127.0.0.1:3000',
      'http://10.10.112.205:3000', // pioneira,
      'http://10.10.100.79:3000', // pioneira,
      'http://192.168.2.115:3000', // casa,
      'http://192.168.2.108:3000', //casawifi
    ];

    // Verifica se a origem recebida está na lista ou se não há origem
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('[CORS] Origin Allowed: true');
      cb(null, true); // Permite
      return;
    }

    console.log('[CORS] Origin Allowed: false');
    cb(new Error('Not allowed by CORS'), false); // Nega
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// --------------- ROTAS ---------
await app.register(authRoutes, { prefix: '/api/auth' });
await app.register(requestRoutes, { prefix: '/api/requests' });
await app.register(settingsRoutes, { prefix: '/api/settings' });
await app.register(usersRoutes, { prefix: '/api/users' });

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
