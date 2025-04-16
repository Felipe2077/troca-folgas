// apps/backend/src/schemas/request.schema.ts
import { z } from 'zod';
// Importa os Enums definidos no schema.prisma
import { EmployeeFunction, ReliefGroup } from '@prisma/client';

// Schema para validar o corpo da requisição ao criar uma SwapRequest
export const swapRequestCreateBodySchema = z.object({
  employeeIdOut: z
    .string({ required_error: 'ID do Funcionário de Saída é obrigatório.' })
    .trim()
    .min(1, 'ID do Funcionário de Saída não pode ser vazio.'),
  employeeIdIn: z
    .string({ required_error: 'ID do Funcionário de Entrada é obrigatório.' })
    .trim()
    .min(1, 'ID do Funcionário de Entrada não pode ser vazio.'),

  // Usamos coerce.date para tentar converter string (do JSON) para Date
  swapDate: z.coerce.date({
    required_error: 'Data da Troca é obrigatória.',
    invalid_type_error: 'Data da Troca inválida.',
  }),
  paybackDate: z.coerce.date({
    required_error: 'Data do Pagamento da Folga é obrigatória.',
    invalid_type_error: 'Data do Pagamento da Folga inválida.',
  }),

  employeeFunction: z.nativeEnum(EmployeeFunction, {
    required_error: 'Função é obrigatória.',
    invalid_type_error: 'Função inválida.',
  }),
  groupOut: z.nativeEnum(ReliefGroup, {
    required_error: 'Grupo de Saída é obrigatório.',
    invalid_type_error: 'Grupo de Saída inválido.',
  }),
  groupIn: z.nativeEnum(ReliefGroup, {
    required_error: 'Grupo de Entrada é obrigatório.',
    invalid_type_error: 'Grupo de Entrada inválido.',
  }),
});

// Poderíamos exportar o tipo inferido também, se útil
// export type SwapRequestCreateBody = z.infer<typeof swapRequestCreateBodySchema>;
