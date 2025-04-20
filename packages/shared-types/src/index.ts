// packages/shared-types/src/index.ts - VERSÃO COMPLETA E CORRIGIDA
import { z } from 'zod';

// --- Definições de Tipos/Enums ---
export const Role = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  ENCARREGADO: 'ENCARREGADO',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const EmployeeFunction = {
  MOTORISTA: 'MOTORISTA',
  COBRADOR: 'COBRADOR',
} as const;
export type EmployeeFunction =
  (typeof EmployeeFunction)[keyof typeof EmployeeFunction];

export const ReliefGroup = {
  G1: 'G1',
  G2: 'G2',
  FIXO_DOMINGO: 'FIXO_DOMINGO',
  SAB_DOMINGO: 'SAB_DOMINGO',
  FIXO_SABADO: 'FIXO_SABADO',
} as const;
export type ReliefGroup = (typeof ReliefGroup)[keyof typeof ReliefGroup];

export const SwapEventType = {
  TROCA: 'TROCA',
  SUBSTITUICAO: 'SUBSTITUICAO',
} as const;
export type SwapEventType = (typeof SwapEventType)[keyof typeof SwapEventType];

export const SwapStatus = {
  AGENDADO: 'AGENDADO',
  NAO_REALIZADA: 'NAO_REALIZADA',
} as const;
export type SwapStatus = (typeof SwapStatus)[keyof typeof SwapStatus];

export const DayOfWeek = {
  SUNDAY: 'SUNDAY',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
} as const;
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

// --- Interfaces ---
export interface SwapRequest {
  id: number;
  employeeIdOut: string;
  employeeIdIn: string;
  swapDate: Date | string;
  paybackDate: Date | string;
  employeeFunction: EmployeeFunction;
  groupOut: ReliefGroup;
  groupIn: ReliefGroup;
  eventType: SwapEventType;
  status: SwapStatus;
  observation: string | null;
  submittedById: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export interface Settings {
  id: number;
  submissionStartDay: DayOfWeek;
  submissionEndDay: DayOfWeek;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// --- Schemas Zod ---

// Login
export const loginBodySchema = z.object({
  loginIdentifier: z
    .string({ required_error: 'Identificador é obrigatório.' })
    .min(1, 'Identificador não pode ser vazio.'),
  password: z
    .string({ required_error: 'Senha é obrigatória.' })
    .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
});
export type LoginInput = z.infer<typeof loginBodySchema>;

// Criação de Swap Request (COM Refinamentos)
export const swapRequestCreateBodySchema = z
  .object({
    employeeIdOut: z
      .string({ required_error: 'Crachá de Saída obrigatório.' })
      .trim()
      .min(1, 'Crachá de Saída obrigatório.')
      .regex(/^[0-9]+$/, 'Crachá de Saída deve conter apenas números.'),
    employeeIdIn: z
      .string({ required_error: 'Crachá de Entrada obrigatório.' })
      .trim()
      .min(1, 'Crachá de Entrada obrigatório.')
      .regex(/^[0-9]+$/, 'Crachá de Entrada deve conter apenas números.'),
    swapDate: z.coerce.date({
      required_error: 'Data da Troca é obrigatória.',
      invalid_type_error: 'Data da Troca inválida (deve ser objeto Date).',
    }),
    paybackDate: z.coerce.date({
      required_error: 'Data do Pagamento da Folga é obrigatória.',
      invalid_type_error: 'Data do Pagamento inválida (deve ser objeto Date).',
    }),
    employeeFunction: z.enum(
      Object.keys(EmployeeFunction) as [
        EmployeeFunction,
        ...EmployeeFunction[],
      ],
      {
        required_error: 'Função é obrigatória.',
        invalid_type_error: 'Função inválida.',
      }
    ),
    groupOut: z.enum(
      Object.keys(ReliefGroup) as [ReliefGroup, ...ReliefGroup[]],
      {
        required_error: 'Grupo de Saída é obrigatório.',
        invalid_type_error: 'Grupo de Saída inválido.',
      }
    ),
    groupIn: z.enum(
      Object.keys(ReliefGroup) as [ReliefGroup, ...ReliefGroup[]],
      {
        required_error: 'Grupo de Entrada é obrigatório.',
        invalid_type_error: 'Grupo de Entrada inválido.',
      }
    ),
  })
  .superRefine((data, ctx) => {
    // Regra 1: Crachás diferentes
    if (
      data.employeeIdOut &&
      data.employeeIdIn &&
      data.employeeIdOut === data.employeeIdIn
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Crachá de Entrada deve ser diferente do Crachá de Saída.',
        path: ['employeeIdIn'],
      });
    }
    // Regra 2: Datas futuras
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (data.swapDate && data.swapDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Data da Troca não pode ser no passado.',
        path: ['swapDate'],
      });
    }
    if (data.paybackDate && data.paybackDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Data do Pagamento não pode ser no passado.',
        path: ['paybackDate'],
      });
    }
    // Regra 3: Datas diferentes
    if (
      data.swapDate &&
      data.paybackDate &&
      data.swapDate.toDateString() === data.paybackDate.toDateString()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Data da Troca e Data do Pagamento não podem ser o mesmo dia.',
        path: ['paybackDate'],
      });
    }
  });
export type SwapRequestInput = z.infer<typeof swapRequestCreateBodySchema>;

// Atualização de Settings (AGORA COMPLETO)
export const settingsUpdateSchema = z.object({
  submissionStartDay: z.nativeEnum(DayOfWeek, {
    required_error: 'Dia de início é obrigatório.',
    invalid_type_error: 'Dia de início inválido.',
  }),
  submissionEndDay: z.nativeEnum(DayOfWeek, {
    required_error: 'Dia final é obrigatório.',
    invalid_type_error: 'Dia final inválido.',
  }),
});
export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;

export type PublicUser = {
  id: number;
  name: string;
  loginIdentifier: string;
  role: Role;
  createdAt: Date | string;
  updatedAt: Date | string;
};

// Schema Zod para registro (usado no backend e agora no frontend)
export const registerBodySchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório.' })
    .trim()
    .min(3, 'Nome precisa ter no mínimo 3 caracteres.'),
  loginIdentifier: z
    .string({ required_error: 'Identificador é obrigatório.' })
    .trim()
    .min(1, 'Identificador não pode ser vazio.'), // Pode adicionar .email() ou outra validação aqui se quiser
  password: z
    .string({ required_error: 'Senha é obrigatória.' })
    .min(6, 'Senha precisa ter no mínimo 6 caracteres.'),
  role: z.nativeEnum(Role, {
    required_error: 'Cargo é obrigatório.',
    invalid_type_error: 'Cargo inválido.',
  }),
});
