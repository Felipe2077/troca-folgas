// apps/backend/src/schemas/settings.schema.ts
import { DayOfWeek } from '@repo/shared-types'; // Importa do shared-types
import { z } from 'zod';

export const settingsUpdateSchema = z.object({
  // Remove submissionDeadlineDays
  submissionStartDay: z.nativeEnum(DayOfWeek, {
    // Valida contra as strings do Enum compartilhado
    required_error: 'Dia de início é obrigatório.',
    invalid_type_error: 'Dia de início inválido.',
  }),
  submissionEndDay: z.nativeEnum(DayOfWeek, {
    // Valida contra as strings do Enum compartilhado
    required_error: 'Dia final é obrigatório.',
    invalid_type_error: 'Dia final inválido.',
  }),
});

export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;
