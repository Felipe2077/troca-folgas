// apps/backend/src/schemas/settings.schema.ts
import { z } from 'zod';

// Schema para validar os dados ao ATUALIZAR as configurações
export const settingsUpdateSchema = z.object({
  submissionDeadlineDays: z
    .number({
      required_error: 'Dias de antecedência é obrigatório.',
      invalid_type_error: 'Deve ser um número.',
    })
    .int({ message: 'Deve ser um número inteiro.' })
    .min(0, { message: 'Deve ser 0 ou maior.' }), // Não permite negativo
  // Adicione aqui a validação para outros campos de settings no futuro
});

// Tipagem inferida a partir do schema para uso no código
export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;
