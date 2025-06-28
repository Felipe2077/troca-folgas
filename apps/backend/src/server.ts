import cors from '@fastify/cors';
import env from '@fastify/env';
import jwt from '@fastify/jwt';
import Fastify from 'fastify';
import { authRoutes } from './routes/auth.routes';
import { requestRoutes } from './routes/request.routes';
import { settingsRoutes } from './routes/settings.routes';
import { usersRoutes } from './routes/users.routes';
import { auditRoutes } from './routes/audit.routes'; // Importar novas rotas de auditoria

const schema = {
  type: 'object',
  required: ['JWT_SECRET'],
  properties: {
    JWT_SECRET: {
      type: 'string',
    },
    PORT: {
      type: 'string',
      default: '3000',
    },
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
  },
};

const options = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
};

async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV === 'production'
          ? undefined
          : {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            },
    },
  });

  // Register plugins
  await app.register(env, options);
  await app.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  });
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'default-secret-key',
  });

  // Decorate authenticate
  app.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  // Health check
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register routes
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(requestRoutes, { prefix: '/api/requests' });
  await app.register(settingsRoutes, { prefix: '/api/settings' });
  await app.register(usersRoutes, { prefix: '/api/users' });
  await app.register(auditRoutes, { prefix: '/api/audit' }); // Registrar rotas de auditoria

  return app;
}

// Start server
async function start() {
  const app = await buildApp();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const host = '0.0.0.0';

  try {
    await app.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Export for testing
export { buildApp };

// Start if running directly
if (require.main === module) {
  start();
}
