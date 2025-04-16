// apps/backend/src/server.ts
import fastify from 'fastify';

const app = fastify({ logger: true }); // Habilita logs básicos

// Rota de exemplo simples
app.get('/', async (request, reply) => {
  return { hello: 'world from Fastify!' };
});

// Função para iniciar o servidor
const start = async () => {
  try {
    // Lê a porta do .env ou usa 3333 como padrão (backend)
    const port = process.env.BACKEND_PORT
      ? parseInt(process.env.BACKEND_PORT, 10)
      : 3333;
    // Escuta em 0.0.0.0 para ser acessível de fora do container Docker (quando aplicável)
    await app.listen({ port: port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
