// apps/backend/src/schemas/users.schema.ts
import { Role } from '@repo/shared-types';
import { z } from 'zod';

// Schema para validar o parâmetro ID da URL (similar ao de requests)
export const userIdParamsSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'ID do usuário deve ser um número.' })
    .int({ message: 'ID do usuário deve ser um inteiro.' })
    .positive({ message: 'ID do usuário deve ser positivo.' }),
});

// Schema para validar o corpo da requisição ao atualizar status
export const userUpdateStatusBodySchema = z.object({
  isActive: z.boolean({
    required_error: 'O estado "isActive" é obrigatório.',
    invalid_type_error:
      'O estado "isActive" deve ser um booleano (true ou false).',
  }),
});

// Schema para validar o corpo da requisição ao ATUALIZAR um usuário
export const userUpdateSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Nome precisa ter no mínimo 3 caracteres.')
      .optional(), // Nome é opcional no update
    role: z
      .nativeEnum(Role, {
        invalid_type_error: 'Cargo inválido.',
      })
      .optional(), // Role também é opcional
  })
  // Garante que PELO MENOS UM campo (name ou role) foi enviado para atualização
  .refine((data) => data.name !== undefined || data.role !== undefined, {
    message: "É necessário fornecer 'name' ou 'role' para atualizar.",
  });
