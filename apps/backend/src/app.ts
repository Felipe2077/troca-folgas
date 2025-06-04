import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth.routes';
import { requestRoutes } from './routes/request.routes';
import { settingsRoutes } from './routes/settings.routes';

export const app = Fastify({
  logger: true
});

// Register plugins
app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(jwt, {
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
app.register(authRoutes, { prefix: '/api/auth' });
app.register(requestRoutes, { prefix: '/api/requests' });
app.register(settingsRoutes, { prefix: '/api/settings' });
