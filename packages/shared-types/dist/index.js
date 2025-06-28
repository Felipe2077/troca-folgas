"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogListQuerySchema = exports.userUpdateSchema = exports.requestListQuerySchema = exports.swapRequestUpdateSchema = exports.registerBodySchema = exports.settingsUpdateSchema = exports.swapRequestCreateBodySchema = exports.loginBodySchema = exports.DayOfWeek = exports.SwapStatus = exports.SwapEventType = exports.ReliefGroup = exports.EmployeeFunction = exports.Role = void 0;
// packages/shared-types/src/index.ts - VERSÃO COMPLETA E CORRIGIDA
const zod_1 = require("zod");
// --- Definições de Tipos/Enums ---
exports.Role = {
    ADMINISTRADOR: 'ADMINISTRADOR',
    ENCARREGADO: 'ENCARREGADO',
};
exports.EmployeeFunction = {
    MOTORISTA: 'MOTORISTA',
    COBRADOR: 'COBRADOR',
};
exports.ReliefGroup = {
    G1: 'G1',
    G2: 'G2',
    FIXO_DOMINGO: 'FIXO_DOMINGO',
    SAB_DOMINGO: 'SAB_DOMINGO',
    FIXO_SABADO: 'FIXO_SABADO',
};
exports.SwapEventType = {
    TROCA: 'TROCA',
    SUBSTITUICAO: 'SUBSTITUICAO',
};
exports.SwapStatus = {
    SOLICITADO: 'SOLICITADO',
    AGENDADO: 'AGENDADO',
    NAO_REALIZADA: 'NAO_REALIZADA',
    REALIZADO: 'REALIZADO',
};
exports.DayOfWeek = {
    SUNDAY: 'SUNDAY',
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURSDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY',
};
// --- Schemas Zod ---
// Login
exports.loginBodySchema = zod_1.z.object({
    loginIdentifier: zod_1.z
        .string({ required_error: 'Crachá é obrigatório.' })
        .trim()
        .regex(/^[0-9]+$/, 'Crachá inválido.'), // Mensagem genérica
    password: zod_1.z
        .string({ required_error: 'Senha é obrigatória.' })
        .min(6, 'Senha inválida'), // Mensagem genérica
});
// Criação de Swap Request (COM Refinamentos)
exports.swapRequestCreateBodySchema = zod_1.z
    .object({
    employeeIdOut: zod_1.z
        .string({ required_error: 'Crachá de Saída obrigatório.' })
        .trim()
        .min(1, 'Crachá de Saída obrigatório.')
        .regex(/^[0-9]+$/, 'Crachá de Saída deve conter apenas números.'),
    employeeIdIn: zod_1.z
        .string({ required_error: 'Crachá de Entrada obrigatório.' })
        .trim()
        .min(1, 'Crachá de Entrada obrigatório.')
        .regex(/^[0-9]+$/, 'Crachá de Entrada deve conter apenas números.'),
    swapDate: zod_1.z.coerce.date({
        required_error: 'Data da Troca é obrigatória.',
        invalid_type_error: 'Data da Troca inválida (deve ser objeto Date).',
    }),
    paybackDate: zod_1.z.coerce.date({
        required_error: 'Data do Pagamento da Folga é obrigatória.',
        invalid_type_error: 'Data do Pagamento inválida (deve ser objeto Date).',
    }),
    employeeFunction: zod_1.z.enum(Object.keys(exports.EmployeeFunction), {
        required_error: 'Função é obrigatória.',
        invalid_type_error: 'Função inválida.',
    }),
    groupOut: zod_1.z.enum(Object.keys(exports.ReliefGroup), {
        required_error: 'Grupo de Saída é obrigatório.',
        invalid_type_error: 'Grupo de Saída inválido.',
    }),
    groupIn: zod_1.z.enum(Object.keys(exports.ReliefGroup), {
        required_error: 'Grupo de Entrada é obrigatório.',
        invalid_type_error: 'Grupo de Entrada inválido.',
    }),
})
    .superRefine((data, ctx) => {
    // Regra 1: Crachás diferentes
    if (data.employeeIdOut &&
        data.employeeIdIn &&
        data.employeeIdOut === data.employeeIdIn) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Crachá de Entrada deve ser diferente do Crachá de Saída.',
            path: ['employeeIdIn'],
        });
    }
    // Regra 2: Datas futuras
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (data.swapDate && data.swapDate < today) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Data da Troca não pode ser no passado.',
            path: ['swapDate'],
        });
    }
    if (data.paybackDate && data.paybackDate < today) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Data do Pagamento não pode ser no passado.',
            path: ['paybackDate'],
        });
    }
    // Regra 3: Datas diferentes
    if (data.swapDate &&
        data.paybackDate &&
        data.swapDate.toDateString() === data.paybackDate.toDateString()) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Data da Troca e Data do Pagamento não podem ser o mesmo dia.',
            path: ['paybackDate'],
        });
    }
    // *** Regra 4: Mesmo Mês ***
    if (data.swapDate &&
        data.paybackDate &&
        data.swapDate.getMonth() !== data.paybackDate.getMonth()) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Troca deve ocorrer dentro do mesmo mês.',
            path: ['paybackDate'],
        }); // Ou path geral?
    }
});
// Atualização de Settings (AGORA COMPLETO)
exports.settingsUpdateSchema = zod_1.z.object({
    submissionStartDay: zod_1.z.nativeEnum(exports.DayOfWeek, {
        required_error: 'Dia de início é obrigatório.',
        invalid_type_error: 'Dia de início inválido.',
    }),
    submissionEndDay: zod_1.z.nativeEnum(exports.DayOfWeek, {
        required_error: 'Dia final é obrigatório.',
        invalid_type_error: 'Dia final inválido.',
    }),
});
// Schema Zod para registro (usado no backend e agora no frontend)
exports.registerBodySchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(3, 'Nome precisa ter no mínimo 3 caracteres.'),
    loginIdentifier: zod_1.z
        .string({ required_error: 'Crachá é obrigatório.' })
        .trim()
        .regex(/^[0-9]+$/, 'Crachá deve conter apenas números.')
        .min(5, 'Crachá deve ter entre 5 e 6 dígitos.')
        .max(6, 'Crachá deve ter entre 5 e 6 dígitos.'),
    password: zod_1.z.string().min(6, 'Senha precisa ter no mínimo 6 caracteres'),
    role: zod_1.z.nativeEnum(exports.Role, { required_error: 'Cargo é obrigatório.' }),
});
exports.swapRequestUpdateSchema = zod_1.z
    .object({
    status: zod_1.z
        .nativeEnum(exports.SwapStatus, {
        invalid_type_error: 'Status inválido.',
    })
        .optional(), // Status é opcional
    observation: zod_1.z
        .string({
        invalid_type_error: 'Observação deve ser texto.',
    })
        .nullable()
        .optional(), // Observação é opcional (pode ser string ou null)
})
    // Garante que pelo menos um campo seja enviado para update
    .refine((data) => data.status !== undefined || data.observation !== undefined, {
    message: "É necessário fornecer 'status' ou 'observation' para atualizar.",
});
const sortableColumns = zod_1.z
    .enum([
    'createdAt',
    'swapDate',
    'paybackDate',
    'id', // Já existentes
    'employeeIdOut',
    'employeeIdIn',
    'employeeFunction', // Novos
    'groupOut',
    'groupIn',
    'eventType',
    'status', // Novos
    // 'observation', // Ordenar por texto longo pode ser ineficiente
    // 'submittedById', // Menos útil talvez?
    'updatedAt', // Novo
    'isMirror', // Novo
    'relatedRequestId', // Novo
])
    .default('createdAt');
const sortOrderValues = zod_1.z.enum(['asc', 'desc']).default('desc');
// Schema para Query Params de GET /requests (CORRIGIDO)
exports.requestListQuerySchema = zod_1.z
    .object({
    // Filtros existentes mantidos
    status: zod_1.z.preprocess((val) => {
        if (val === undefined || val === null)
            return undefined;
        return Array.isArray(val) ? val : [val];
    }, zod_1.z.array(zod_1.z.nativeEnum(exports.SwapStatus))).optional(),
    employeeIdOut: zod_1.z
        .string()
        .regex(/^[0-9]+$/)
        .optional(),
    employeeIdIn: zod_1.z
        .string()
        .regex(/^[0-9]+$/)
        .optional(),
    employeeFunction: zod_1.z.nativeEnum(exports.EmployeeFunction).optional(),
    groupOut: zod_1.z.nativeEnum(exports.ReliefGroup).optional(),
    groupIn: zod_1.z.nativeEnum(exports.ReliefGroup).optional(),
    eventType: zod_1.z.nativeEnum(exports.SwapEventType).optional(),
    // REMOVA startDate e endDate (referentes a createdAt)
    // startDate: z.coerce.date().optional(),
    // endDate: z.coerce.date().optional(),
    // ADICIONE filtros para swapDate
    swapDateStart: zod_1.z.string().optional(),
    swapDateEnd: zod_1.z.string().optional(),
    // ADICIONE filtros para paybackDate
    paybackDateStart: zod_1.z.string().optional(),
    paybackDateEnd: zod_1.z.string().optional(),
    // Ordenação mantida
    sortBy: sortableColumns.optional(),
    sortOrder: sortOrderValues.optional(),
})
    // Adiciona refine para garantir que data final >= data inicial para cada par
    .refine((data) => !(data.swapDateStart &&
    data.swapDateEnd &&
    data.swapDateEnd < data.swapDateStart), {
    message: 'Data final (Troca) não pode ser anterior à inicial.',
    path: ['swapDateEnd'],
})
    .refine((data) => !(data.paybackDateStart &&
    data.paybackDateEnd &&
    data.paybackDateEnd < data.paybackDateStart), {
    message: 'Data final (Pagamento) não pode ser anterior à inicial.',
    path: ['paybackDateEnd'],
});
exports.userUpdateSchema = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .trim()
        .min(3, 'Nome precisa ter no mínimo 3 caracteres.')
        .optional(), // Nome é opcional no update
    role: zod_1.z
        .nativeEnum(exports.Role, {
        invalid_type_error: 'Cargo inválido.',
    })
        .optional(), // Role também é opcional
})
    // Garante que PELO MENOS UM campo foi enviado
    .refine((data) => data.name !== undefined || data.role !== undefined, {
    message: "É necessário fornecer 'name' ou 'role' para atualizar.",
    // Não precisa de path aqui, erro geral do objeto
});
// Schema para Query Params de GET /audit
exports.auditLogListQuerySchema = zod_1.z.object({
    action: zod_1.z.string().optional(),
    userId: zod_1.z.coerce.number().int().optional(),
    userLoginIdentifier: zod_1.z.string().optional(), // Novo filtro
    timestampStart: zod_1.z.string().optional(), // Novo filtro
    timestampEnd: zod_1.z.string().optional(), // Novo filtro
    targetResourceType: zod_1.z.string().optional(),
    limit: zod_1.z.coerce.number().int().min(1).default(10),
    offset: zod_1.z.coerce.number().int().min(0).default(0),
    sortBy: zod_1.z.enum(['timestamp', 'action', 'userLoginIdentifier']).default('timestamp'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
// Schema para Query Params de GET /requests (já deve existir e estar atualizado)
const sortableColumnsValues = [
    // Array com os valores exatos do z.enum
    'createdAt',
    'swapDate',
    'paybackDate',
    'id',
    'employeeIdOut',
    'employeeIdIn',
    'employeeFunction',
    'groupOut',
    'groupIn',
    'eventType',
    'status',
    'updatedAt',
]; // Garante que são literais
// Ou, se preferir uma união explícita:
// export type SortableSwapRequestColumn =
//   | 'createdAt' | 'swapDate' | 'paybackDate' | 'id'
//   | 'employeeIdOut' | 'employeeIdIn' | 'employeeFunction'
//   | 'groupOut' | 'groupIn' | 'eventType' | 'status' | 'updatedAt';
//# sourceMappingURL=index.js.map