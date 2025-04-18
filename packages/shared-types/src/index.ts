// packages/shared-types/src/index.ts

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
