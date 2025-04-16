// apps/backend/src/schemas/auth.schema.ts
import { Role } from '@prisma/client'; // Importa o Enum Role
import { z } from 'zod';

// Exporta o schema Zod para validar o corpo da requisição de login
export const loginBodySchema = z.object({
  loginIdentifier: z.string(),
  password: z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
});

// Exporta o schema Zod para validar o corpo da requisição de registro
export const registerBodySchema = z.object({
  name: z.string().min(3, 'Nome precisa ter no mínimo 3 caracteres'),
  loginIdentifier: z.string(),
  password: z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
  role: z.nativeEnum(Role),
});
