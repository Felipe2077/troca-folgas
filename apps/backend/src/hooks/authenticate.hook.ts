import { FastifyReply, FastifyRequest } from 'fastify';
// Hook de autenticação
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (_err) {
    reply.status(401).send({
      message: 'Autenticação necessária. Token inválido ou expirado.',
    });
  }
}
