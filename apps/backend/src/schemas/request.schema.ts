// apps/backend/src/schemas/request.schema.ts
import { z } from 'zod';
// Importa os Enums definidos no schema.prisma
import { EmployeeFunction, ReliefGroup, SwapStatus } from '@prisma/client';

// Schema para validar o corpo da requisição ao criar uma SwapRequest
export const swapRequestCreateBodySchema = z.object({
  employeeIdOut: z
    .string({ required_error: 'ID do Funcionário de Saída é obrigatório.' })
    .trim()
    .min(1, 'ID do Funcionário de Saída não pode ser vazio.')
    .regex(/^[0-9]+$/, 'Crachá de Saída deve conter apenas números.'),

  employeeIdIn: z
    .string({ required_error: 'ID do Funcionário de Entrada é obrigatório.' })
    .trim()
    .min(1, 'ID do Funcionário de Entrada não pode ser vazio.')
    .regex(/^[0-9]+$/, 'Crachá de Entrada deve conter apenas números.'),

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
// Schema para validar o parâmetro ID da URL
export const requestIdParamsSchema = z.object({
  id: z.coerce // Tenta converter string para número
    .number({ invalid_type_error: 'ID da solicitação deve ser um número.' })
    .int({ message: 'ID da solicitação deve ser um inteiro.' })
    .positive({ message: 'ID da solicitação deve ser positivo.' }),
});

// Schema para validar o corpo da requisição de atualização de observação
export const requestUpdateObservationBodySchema = z.object({
  observation: z.string().nullable(),
});

// Schema para validar os query parameters da rota GET /requests
export const requestListQuerySchema = z.object({
  // Status é opcional. Se vier, deve ser um dos valores do Enum SwapStatus.
  status: z.nativeEnum(SwapStatus).optional(),
  // Poderíamos adicionar outros filtros aqui depois (data, func, etc.)
  // funcionarioId: z.coerce.number().int().positive().optional(),
  // startDate: z.coerce.date().optional(),
  // endDate: z.coerce.date().optional(),
});
