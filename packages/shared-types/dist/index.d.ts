import { z } from 'zod';
export declare const Role: {
    readonly ADMINISTRADOR: "ADMINISTRADOR";
    readonly ENCARREGADO: "ENCARREGADO";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const EmployeeFunction: {
    readonly MOTORISTA: "MOTORISTA";
    readonly COBRADOR: "COBRADOR";
};
export type EmployeeFunction = (typeof EmployeeFunction)[keyof typeof EmployeeFunction];
export declare const ReliefGroup: {
    readonly G1: "G1";
    readonly G2: "G2";
    readonly FIXO_DOMINGO: "FIXO_DOMINGO";
    readonly SAB_DOMINGO: "SAB_DOMINGO";
    readonly FIXO_SABADO: "FIXO_SABADO";
};
export type ReliefGroup = (typeof ReliefGroup)[keyof typeof ReliefGroup];
export declare const SwapEventType: {
    readonly TROCA: "TROCA";
    readonly SUBSTITUICAO: "SUBSTITUICAO";
};
export type SwapEventType = (typeof SwapEventType)[keyof typeof SwapEventType];
export declare const SwapStatus: {
    readonly SOLICITADO: "SOLICITADO";
    readonly AGENDADO: "AGENDADO";
    readonly NAO_REALIZADA: "NAO_REALIZADA";
    readonly REALIZADO: "REALIZADO";
};
export type SwapStatus = (typeof SwapStatus)[keyof typeof SwapStatus];
export declare const DayOfWeek: {
    readonly SUNDAY: "SUNDAY";
    readonly MONDAY: "MONDAY";
    readonly TUESDAY: "TUESDAY";
    readonly WEDNESDAY: "WEDNESDAY";
    readonly THURSDAY: "THURSDAY";
    readonly FRIDAY: "FRIDAY";
    readonly SATURDAY: "SATURDAY";
};
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];
export interface SubmittedByUser {
    id: number;
    name: string;
    loginIdentifier: string;
    role: Role;
}
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
    submittedBy?: SubmittedByUser;
    isMirror?: boolean | null;
    relatedRequestId?: number | null;
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
export declare const loginBodySchema: z.ZodObject<{
    loginIdentifier: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    loginIdentifier: string;
    password: string;
}, {
    loginIdentifier: string;
    password: string;
}>;
export type LoginInput = z.infer<typeof loginBodySchema>;
export declare const swapRequestCreateBodySchema: z.ZodEffects<z.ZodObject<{
    employeeIdOut: z.ZodString;
    employeeIdIn: z.ZodString;
    swapDate: z.ZodDate;
    paybackDate: z.ZodDate;
    employeeFunction: z.ZodEnum<[EmployeeFunction, ...EmployeeFunction[]]>;
    groupOut: z.ZodEnum<[ReliefGroup, ...ReliefGroup[]]>;
    groupIn: z.ZodEnum<[ReliefGroup, ...ReliefGroup[]]>;
}, "strip", z.ZodTypeAny, {
    employeeIdOut: string;
    employeeIdIn: string;
    swapDate: Date;
    paybackDate: Date;
    employeeFunction: EmployeeFunction;
    groupOut: ReliefGroup;
    groupIn: ReliefGroup;
}, {
    employeeIdOut: string;
    employeeIdIn: string;
    swapDate: Date;
    paybackDate: Date;
    employeeFunction: EmployeeFunction;
    groupOut: ReliefGroup;
    groupIn: ReliefGroup;
}>, {
    employeeIdOut: string;
    employeeIdIn: string;
    swapDate: Date;
    paybackDate: Date;
    employeeFunction: EmployeeFunction;
    groupOut: ReliefGroup;
    groupIn: ReliefGroup;
}, {
    employeeIdOut: string;
    employeeIdIn: string;
    swapDate: Date;
    paybackDate: Date;
    employeeFunction: EmployeeFunction;
    groupOut: ReliefGroup;
    groupIn: ReliefGroup;
}>;
export type SwapRequestInput = z.infer<typeof swapRequestCreateBodySchema>;
export declare const settingsUpdateSchema: z.ZodObject<{
    submissionStartDay: z.ZodNativeEnum<{
        readonly SUNDAY: "SUNDAY";
        readonly MONDAY: "MONDAY";
        readonly TUESDAY: "TUESDAY";
        readonly WEDNESDAY: "WEDNESDAY";
        readonly THURSDAY: "THURSDAY";
        readonly FRIDAY: "FRIDAY";
        readonly SATURDAY: "SATURDAY";
    }>;
    submissionEndDay: z.ZodNativeEnum<{
        readonly SUNDAY: "SUNDAY";
        readonly MONDAY: "MONDAY";
        readonly TUESDAY: "TUESDAY";
        readonly WEDNESDAY: "WEDNESDAY";
        readonly THURSDAY: "THURSDAY";
        readonly FRIDAY: "FRIDAY";
        readonly SATURDAY: "SATURDAY";
    }>;
}, "strip", z.ZodTypeAny, {
    submissionStartDay: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
    submissionEndDay: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
}, {
    submissionStartDay: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
    submissionEndDay: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
}>;
export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;
export type PublicUser = {
    id: number;
    name: string;
    loginIdentifier: string;
    role: Role;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
};
export declare const registerBodySchema: z.ZodObject<{
    name: z.ZodString;
    loginIdentifier: z.ZodString;
    password: z.ZodString;
    role: z.ZodNativeEnum<{
        readonly ADMINISTRADOR: "ADMINISTRADOR";
        readonly ENCARREGADO: "ENCARREGADO";
    }>;
}, "strip", z.ZodTypeAny, {
    loginIdentifier: string;
    password: string;
    name: string;
    role: "ADMINISTRADOR" | "ENCARREGADO";
}, {
    loginIdentifier: string;
    password: string;
    name: string;
    role: "ADMINISTRADOR" | "ENCARREGADO";
}>;
export type RegisterInput = z.infer<typeof registerBodySchema>;
export declare const swapRequestUpdateSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodNativeEnum<{
        readonly SOLICITADO: "SOLICITADO";
        readonly AGENDADO: "AGENDADO";
        readonly NAO_REALIZADA: "NAO_REALIZADA";
        readonly REALIZADO: "REALIZADO";
    }>>;
    observation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status?: "SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO" | undefined;
    observation?: string | null | undefined;
}, {
    status?: "SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO" | undefined;
    observation?: string | null | undefined;
}>, {
    status?: "SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO" | undefined;
    observation?: string | null | undefined;
}, {
    status?: "SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO" | undefined;
    observation?: string | null | undefined;
}>;
export type SwapRequestUpdateInput = z.infer<typeof swapRequestUpdateSchema>;
export declare const requestListQuerySchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodNativeEnum<{
        readonly SOLICITADO: "SOLICITADO";
        readonly AGENDADO: "AGENDADO";
        readonly NAO_REALIZADA: "NAO_REALIZADA";
        readonly REALIZADO: "REALIZADO";
    }>, "many">, ("SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO")[], unknown>>;
    employeeIdOut: z.ZodOptional<z.ZodString>;
    employeeIdIn: z.ZodOptional<z.ZodString>;
    employeeFunction: z.ZodOptional<z.ZodNativeEnum<{
        readonly MOTORISTA: "MOTORISTA";
        readonly COBRADOR: "COBRADOR";
    }>>;
    groupOut: z.ZodOptional<z.ZodNativeEnum<{
        readonly G1: "G1";
        readonly G2: "G2";
        readonly FIXO_DOMINGO: "FIXO_DOMINGO";
        readonly SAB_DOMINGO: "SAB_DOMINGO";
        readonly FIXO_SABADO: "FIXO_SABADO";
    }>>;
    groupIn: z.ZodOptional<z.ZodNativeEnum<{
        readonly G1: "G1";
        readonly G2: "G2";
        readonly FIXO_DOMINGO: "FIXO_DOMINGO";
        readonly SAB_DOMINGO: "SAB_DOMINGO";
        readonly FIXO_SABADO: "FIXO_SABADO";
    }>>;
    eventType: z.ZodOptional<z.ZodNativeEnum<{
        readonly TROCA: "TROCA";
        readonly SUBSTITUICAO: "SUBSTITUICAO";
    }>>;
    swapDateStart: z.ZodOptional<z.ZodString>;
    swapDateEnd: z.ZodOptional<z.ZodString>;
    paybackDateStart: z.ZodOptional<z.ZodString>;
    paybackDateEnd: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodDefault<z.ZodEnum<["createdAt", "swapDate", "paybackDate", "id", "employeeIdOut", "employeeIdIn", "employeeFunction", "groupOut", "groupIn", "eventType", "status", "updatedAt", "isMirror", "relatedRequestId"]>>>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodEnum<["asc", "desc"]>>>;
}, "strip", z.ZodTypeAny, {
    status?: ("SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO")[] | undefined;
    employeeIdOut?: string | undefined;
    employeeIdIn?: string | undefined;
    employeeFunction?: "MOTORISTA" | "COBRADOR" | undefined;
    groupOut?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    groupIn?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    eventType?: "TROCA" | "SUBSTITUICAO" | undefined;
    swapDateStart?: string | undefined;
    swapDateEnd?: string | undefined;
    paybackDateStart?: string | undefined;
    paybackDateEnd?: string | undefined;
    sortBy?: "status" | "employeeIdOut" | "employeeIdIn" | "swapDate" | "paybackDate" | "employeeFunction" | "groupOut" | "groupIn" | "createdAt" | "id" | "eventType" | "updatedAt" | "isMirror" | "relatedRequestId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}, {
    status?: unknown;
    employeeIdOut?: string | undefined;
    employeeIdIn?: string | undefined;
    employeeFunction?: "MOTORISTA" | "COBRADOR" | undefined;
    groupOut?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    groupIn?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    eventType?: "TROCA" | "SUBSTITUICAO" | undefined;
    swapDateStart?: string | undefined;
    swapDateEnd?: string | undefined;
    paybackDateStart?: string | undefined;
    paybackDateEnd?: string | undefined;
    sortBy?: "status" | "employeeIdOut" | "employeeIdIn" | "swapDate" | "paybackDate" | "employeeFunction" | "groupOut" | "groupIn" | "createdAt" | "id" | "eventType" | "updatedAt" | "isMirror" | "relatedRequestId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>, {
    status?: ("SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO")[] | undefined;
    employeeIdOut?: string | undefined;
    employeeIdIn?: string | undefined;
    employeeFunction?: "MOTORISTA" | "COBRADOR" | undefined;
    groupOut?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    groupIn?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    eventType?: "TROCA" | "SUBSTITUICAO" | undefined;
    swapDateStart?: string | undefined;
    swapDateEnd?: string | undefined;
    paybackDateStart?: string | undefined;
    paybackDateEnd?: string | undefined;
    sortBy?: "status" | "employeeIdOut" | "employeeIdIn" | "swapDate" | "paybackDate" | "employeeFunction" | "groupOut" | "groupIn" | "createdAt" | "id" | "eventType" | "updatedAt" | "isMirror" | "relatedRequestId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}, {
    status?: unknown;
    employeeIdOut?: string | undefined;
    employeeIdIn?: string | undefined;
    employeeFunction?: "MOTORISTA" | "COBRADOR" | undefined;
    groupOut?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    groupIn?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    eventType?: "TROCA" | "SUBSTITUICAO" | undefined;
    swapDateStart?: string | undefined;
    swapDateEnd?: string | undefined;
    paybackDateStart?: string | undefined;
    paybackDateEnd?: string | undefined;
    sortBy?: "status" | "employeeIdOut" | "employeeIdIn" | "swapDate" | "paybackDate" | "employeeFunction" | "groupOut" | "groupIn" | "createdAt" | "id" | "eventType" | "updatedAt" | "isMirror" | "relatedRequestId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>, {
    status?: ("SOLICITADO" | "AGENDADO" | "NAO_REALIZADA" | "REALIZADO")[] | undefined;
    employeeIdOut?: string | undefined;
    employeeIdIn?: string | undefined;
    employeeFunction?: "MOTORISTA" | "COBRADOR" | undefined;
    groupOut?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    groupIn?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    eventType?: "TROCA" | "SUBSTITUICAO" | undefined;
    swapDateStart?: string | undefined;
    swapDateEnd?: string | undefined;
    paybackDateStart?: string | undefined;
    paybackDateEnd?: string | undefined;
    sortBy?: "status" | "employeeIdOut" | "employeeIdIn" | "swapDate" | "paybackDate" | "employeeFunction" | "groupOut" | "groupIn" | "createdAt" | "id" | "eventType" | "updatedAt" | "isMirror" | "relatedRequestId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}, {
    status?: unknown;
    employeeIdOut?: string | undefined;
    employeeIdIn?: string | undefined;
    employeeFunction?: "MOTORISTA" | "COBRADOR" | undefined;
    groupOut?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    groupIn?: "G1" | "G2" | "FIXO_DOMINGO" | "SAB_DOMINGO" | "FIXO_SABADO" | undefined;
    eventType?: "TROCA" | "SUBSTITUICAO" | undefined;
    swapDateStart?: string | undefined;
    swapDateEnd?: string | undefined;
    paybackDateStart?: string | undefined;
    paybackDateEnd?: string | undefined;
    sortBy?: "status" | "employeeIdOut" | "employeeIdIn" | "swapDate" | "paybackDate" | "employeeFunction" | "groupOut" | "groupIn" | "createdAt" | "id" | "eventType" | "updatedAt" | "isMirror" | "relatedRequestId" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export declare const userUpdateSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<{
        readonly ADMINISTRADOR: "ADMINISTRADOR";
        readonly ENCARREGADO: "ENCARREGADO";
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    role?: "ADMINISTRADOR" | "ENCARREGADO" | undefined;
}, {
    name?: string | undefined;
    role?: "ADMINISTRADOR" | "ENCARREGADO" | undefined;
}>, {
    name?: string | undefined;
    role?: "ADMINISTRADOR" | "ENCARREGADO" | undefined;
}, {
    name?: string | undefined;
    role?: "ADMINISTRADOR" | "ENCARREGADO" | undefined;
}>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type RequestSummaryData = {
    byStatus: {
        [SwapStatus.SOLICITADO]: number;
        [SwapStatus.AGENDADO]: number;
        [SwapStatus.NAO_REALIZADA]: number;
        [SwapStatus.REALIZADO]: number;
    };
    byType: {
        [SwapEventType.TROCA]: number;
        [SwapEventType.SUBSTITUICAO]: number;
    };
    attention: {
        scheduledPastDue: number;
    };
};
export declare const auditLogListQuerySchema: z.ZodObject<{
    action: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodNumber>;
    userLoginIdentifier: z.ZodOptional<z.ZodString>;
    timestampStart: z.ZodOptional<z.ZodString>;
    timestampEnd: z.ZodOptional<z.ZodString>;
    targetResourceType: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["timestamp", "action", "userLoginIdentifier"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    sortBy: "action" | "userLoginIdentifier" | "timestamp";
    sortOrder: "asc" | "desc";
    limit: number;
    offset: number;
    action?: string | undefined;
    userId?: number | undefined;
    userLoginIdentifier?: string | undefined;
    timestampStart?: string | undefined;
    timestampEnd?: string | undefined;
    targetResourceType?: string | undefined;
}, {
    sortBy?: "action" | "userLoginIdentifier" | "timestamp" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    action?: string | undefined;
    userId?: number | undefined;
    userLoginIdentifier?: string | undefined;
    timestampStart?: string | undefined;
    timestampEnd?: string | undefined;
    targetResourceType?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
export type AuditLogListQuery = z.infer<typeof auditLogListQuerySchema>;
declare const sortableColumnsValues: readonly ["createdAt", "swapDate", "paybackDate", "id", "employeeIdOut", "employeeIdIn", "employeeFunction", "groupOut", "groupIn", "eventType", "status", "updatedAt"];
export type SortableSwapRequestColumn = (typeof sortableColumnsValues)[number];
export {};
//# sourceMappingURL=index.d.ts.map