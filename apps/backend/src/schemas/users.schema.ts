// apps/backend/src/schemas/users.schema.ts
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
