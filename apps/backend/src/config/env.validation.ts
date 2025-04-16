import { z } from 'zod';

// Schema para validar variáveis de ambiente com @fastify/env
export const zodEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  BACKEND_PORT: z.coerce.number().default(3333), // Coerce para número, default 3333
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export const envSchemaJson = {
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
