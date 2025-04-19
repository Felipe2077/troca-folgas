// packages/shared-types/src/index.ts
import { z } from 'zod'; // Adicione import do Zod aqui se não tiver

// Definindo Enums ou Tipos Literais (melhor que Enums TS para compartilhamento)
export const Role = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  ENCARREGADO: 'ENCARREGADO',
} as const;
export type Role = (typeof Role)[keyof typeof Role]; // Cria o tipo 'ADMINISTRADOR' | 'ENCARREGADO'

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

// --- Interface/Tipo para SwapRequest ---
// Baseado no modelo Prisma e no que precisamos no frontend/API
export interface SwapRequest {
  id: number;
  employeeIdOut: string;
  employeeIdIn: string;
  swapDate: Date; // Ou string se preferir trafegar como ISO string
  paybackDate: Date; // Ou string
  employeeFunction: EmployeeFunction; // Usa o tipo definido acima
  groupOut: ReliefGroup; // Usa o tipo definido acima
  groupIn: ReliefGroup; // Usa o tipo definido acima
  eventType: SwapEventType; // Usa o tipo definido acima
  status: SwapStatus; // Usa o tipo definido acima
  observation: string | null; // Mantém como string opcional ou nula
  submittedById: number;
  createdAt: Date; // Ou string
  updatedAt: Date; // Ou string

  // Opcional: Adicionar dados do usuário que submeteu, se necessário na listagem
  // submittedBy?: {
  //   id: number;
  //   name: string;
  // };
}

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

// Interface/Tipo para Settings (ATUALIZADO)
export interface Settings {
  id: number; // Geralmente 1
  submissionStartDay: DayOfWeek;
  submissionEndDay: DayOfWeek;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Exporta o schema Zod para validar o corpo da requisição de login
export const loginBodySchema = z.object({
  loginIdentifier: z
    .string({ required_error: 'Identificador é obrigatório.' })
    .min(1, 'Identificador não pode ser vazio.'), // Pelo menos 1 caractere
  password: z
    .string({ required_error: 'Senha é obrigatória.' })
    .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
});

// Exporta o tipo inferido se quiser usar no frontend
export type LoginInput = z.infer<typeof loginBodySchema>;

export const swapRequestCreateBodySchema = z.object({
  employeeIdOut: z
    .string({ required_error: 'Crachá de Saída obrigatório.' })
    .trim()
    .min(1, 'Crachá de Saída obrigatório.')
    .regex(/^[0-9]+$/, 'Crachá de Saída deve conter apenas números.'), // Mantém validação numérica

  employeeIdIn: z
    .string({ required_error: 'Crachá de Entrada obrigatório.' })
    .trim()
    .min(1, 'Crachá de Entrada obrigatório.')
    .regex(/^[0-9]+$/, 'Crachá de Entrada deve conter apenas números.'), // Mantém validação numérica

  swapDate: z.date({
    // Espera um objeto Date
    required_error: 'Data da Troca é obrigatória.',
    invalid_type_error: 'Data da Troca inválida.',
  }),
  paybackDate: z.date({
    // Espera um objeto Date
    required_error: 'Data do Pagamento da Folga é obrigatória.',
    invalid_type_error: 'Data do Pagamento da Folga inválida.',
  }),

  // Usamos z.enum baseado nas CHAVES do objeto que exportamos
  employeeFunction: z.enum(
    Object.keys(EmployeeFunction) as [EmployeeFunction, ...EmployeeFunction[]],
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
  groupIn: z.enum(Object.keys(ReliefGroup) as [ReliefGroup, ...ReliefGroup[]], {
    required_error: 'Grupo de Entrada é obrigatório.',
    invalid_type_error: 'Grupo de Entrada inválido.',
  }),
});

// Exporta o tipo inferido também
export type SwapRequestInput = z.infer<typeof swapRequestCreateBodySchema>;
