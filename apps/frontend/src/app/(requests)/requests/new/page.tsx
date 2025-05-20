// apps/frontend/src/app/requests/new/page.tsx - COM VALIDAÇÃO ZOD E EXIBIÇÃO DE ERROS
'use client';

// --- Imports ---
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datepicker'; // Assume que está em ui/datepicker.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils'; // <-- ZOD: Importa cn para classes condicionais
import {
  EmployeeFunction,
  ReliefGroup,
  Role,
  SwapRequest,
  swapRequestCreateBodySchema,
} from '@repo/shared-types'; // <-- ZOD: Importa schema
import { useMutation, useQueryClient } from '@tanstack/react-query'; // <-- ZOD: Garante useQueryClient importado
import { FormEvent, useState } from 'react'; // Importa FormEvent e useEffect
import { toast } from 'sonner';
import { z } from 'zod'; // <-- ZOD: Importa Zod

// --- Constantes e Tipos Locais ---
const employeeFunctionOptions = Object.values(EmployeeFunction);
const reliefGroupOptions = Object.values(ReliefGroup);

// <-- ZOD: Tipo inferido do schema para os dados do form -->
type SwapRequestFormData = z.infer<typeof swapRequestCreateBodySchema>;
// <-- ZOD: Tipo para os erros formatados pelo Zod -->
type FormattedErrors = z.ZodFormattedError<SwapRequestFormData> | null;

// Tipos para a mutação (mantidos)
interface SubmitSwapRequestParams {
  formData: SwapRequestFormData;
  token: string;
}
interface SwapRequestResponse {
  request: SwapRequest;
}
interface ApiError {
  message: string;
  issues?: unknown;
}

// --- Função de API Call (mantida como estava) ---
async function submitSwapRequestApi({
  formData,
  token,
}: SubmitSwapRequestParams): Promise<SwapRequestResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      message: `Erro ${response.status}: ${response.statusText}`,
    }));
    throw new Error(errorData.message || 'Falha ao criar solicitação.');
  }
  return response.json();
}

// --- Componente Principal da Página ---
export default function NewRequestPage() {
  // Estados do formulário (mantidos)
  const [employeeIdOut, setEmployeeIdOut] = useState('');
  const [employeeIdIn, setEmployeeIdIn] = useState('');
  const [swapDate, setSwapDate] = useState<Date | undefined>(undefined);
  const [paybackDate, setPaybackDate] = useState<Date | undefined>(undefined);
  const [employeeFunction, setEmployeeFunction] = useState<
    EmployeeFunction | undefined
  >(undefined);
  const [groupOut, setGroupOut] = useState<ReliefGroup | undefined>(undefined);
  const [groupIn, setGroupIn] = useState<ReliefGroup | undefined>(undefined);
  const [apiError, setApiError] = useState<string | null>(null);
  // <-- ZOD: Estado para guardar erros de validação Zod (já estava no seu código, ótimo!) -->
  const [validationErrors, setValidationErrors] =
    useState<FormattedErrors>(null);

  // const router = useRouter(); // Removido router se não usado para redirect aqui
  const queryClient = useQueryClient(); // <-- Adiciona/Garante esta linha
  const { token } = useAuth();

  // Mutação para submeter o formulário (mantida)
  const submitRequestMutation = useMutation<
    SwapRequestResponse,
    Error,
    SubmitSwapRequestParams
  >({
    mutationFn: submitSwapRequestApi,
    onSuccess: (data) => {
      console.log('Solicitação criada com sucesso:', data);
      toast.success('Solicitação enviada com sucesso!');
      setApiError(null);
      setValidationErrors(null); // Limpa erros Zod também
      // *** Limpa o formulário ***
      setEmployeeIdOut('');
      setEmployeeIdIn('');
      setSwapDate(undefined);
      setPaybackDate(undefined);
      setEmployeeFunction(undefined);
      setGroupOut(undefined);
      setGroupIn(undefined);
      queryClient.invalidateQueries({ queryKey: ['requestSummary'] });
      // *** Fim da Limpeza ***
      console.log('>>> [onSuccess] Form state cleared.'); // <-- ADICIONE ESTE LOG
    },
    onError: (error) => {
      setApiError(error.message);
      toast.error(error.message || 'Erro ao criar solicitação.');
    },
  });

  // Calcula estado desabilitado (mantido)
  const isDisabled =
    !employeeIdOut.trim() ||
    !employeeIdIn.trim() ||
    !swapDate ||
    !paybackDate ||
    !employeeFunction ||
    !groupOut ||
    !groupIn ||
    submitRequestMutation.isPending;

  console.log('[Render] Checking isDisabled:', {
    isDisabled, // Valor final
    isPending: submitRequestMutation.isPending, // Estado da mutação
    // Valores dos campos (simplificado)
    idOut: !employeeIdOut.trim(),
    idIn: !employeeIdIn.trim(),
    sDate: !swapDate,
    pDate: !paybackDate,
    func: !employeeFunction,
    gOut: !groupOut,
    gIn: !groupIn,
  });

  // Handler de submit (MODIFICADO para incluir validação Zod)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);
    setValidationErrors(null); // <-- ZOD: Limpa erros Zod anteriores
    if (submitRequestMutation.isPending) return;

    // <-- ZOD: Coleta os dados do estado para validar -->
    // Nota: Zod espera Date para as datas, nosso estado já é Date | undefined
    const currentFormData = {
      employeeIdOut: employeeIdOut.trim(),
      employeeIdIn: employeeIdIn.trim(),
      swapDate,
      paybackDate,
      employeeFunction,
      groupOut,
      groupIn,
    };

    // <-- ZOD: Valida com safeParse -->
    const validationResult =
      swapRequestCreateBodySchema.safeParse(currentFormData);

    // <-- ZOD: Se falhar, guarda os erros e para -->
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.format());
      // Log para debug
      console.log('Erros Zod Frontend:', validationResult.error.format());
      // Toast genérico para indicar erro no form
      toast.error('Por favor, corrija os erros no formulário.');
      return; // Interrompe o envio
    }

    // Se Zod passou, verifica o token (mantido)
    if (!token) {
      toast.error('Erro de autenticação. Faça login novamente.');
      return;
    }

    // Chama a mutação com os dados VALIDADOS (result.data)
    submitRequestMutation.mutate({ formData: validationResult.data, token });
  };

  return (
    <ProtectedRoute allowedRoles={[Role.ENCARREGADO]}>
      <div className="flex justify-center pt-10">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="sm:text-2xl mb-4">
              Nova Solicitação de Troca/Substituição
            </CardTitle>
            <CardDescription className="sm:text-base">
              Preencha os dados abaixo para registrar a troca ou substituição de
              folga.
            </CardDescription>
          </CardHeader>
          <Separator />
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
              {/* Mensagem de erro geral da API (mantida) */}
              {apiError && !validationErrors && (
                <p className="md:col-span-2 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md -mb-2">
                  Erro no envio: {apiError}
                </p>
              )}

              {/* Coluna 1 */}
              <div className="space-y-1">
                {/* --- Campo employeeIdOut --- */}
                <div className="grid gap-1.5 ">
                  <Label htmlFor="employeeIdOut">Crachá de Quem Sai</Label>
                  <Input
                    id="employeeIdOut"
                    placeholder="Crachá (5-6 dígitos)"
                    required
                    value={employeeIdOut}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    onChange={(e) => {
                      setEmployeeIdOut(e.target.value.replace(/[^0-9]/g, ''));
                      setValidationErrors(null);
                    }}
                    disabled={submitRequestMutation.isPending}
                    className={cn(
                      validationErrors?.employeeIdOut &&
                        'border-destructive focus-visible:ring-destructive'
                    )} // ZOD: Estilo erro
                  />
                  {/* ZOD: Exibe erro */}
                  {validationErrors?.employeeIdOut?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.employeeIdOut._errors[0]}
                    </p>
                  )}
                </div>
                {/* --- Campo swapDate --- */}
                <div className="grid gap-1.5 my-6">
                  <Label htmlFor="swapDate">
                    Data da Troca (Trabalho do Colega)
                  </Label>
                  {/* TODO: Aplicar estilo de erro no botão do DatePicker se houver validationErrors?.swapDate */}
                  <DatePicker
                    date={swapDate}
                    setDate={(d) => {
                      setSwapDate(d);
                      setValidationErrors(null);
                    }}
                  />
                  {/* ZOD: Exibe erro (incluindo os de refine) */}
                  {validationErrors?.swapDate?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.swapDate._errors[0]}
                    </p>
                  )}
                  {validationErrors?._errors?.includes(
                    'Data da Troca não pode ser no passado.'
                  ) && (
                    <p className="text-sm font-medium text-destructive">
                      Data da Troca não pode ser no passado.
                    </p>
                  )}
                </div>
                {/* --- Campo groupOut --- */}
                <div className="grid gap-1.5 my-6">
                  <Label htmlFor="groupOut">Grupo de Folga (Saída)</Label>
                  <Select
                    value={groupOut}
                    key={groupOut ?? 'initial-gOut'}
                    onValueChange={(value: ReliefGroup) => {
                      setGroupOut(value);
                      setValidationErrors(null);
                    }}
                    required
                    disabled={submitRequestMutation.isPending}
                  >
                    <SelectTrigger
                      id="groupOut"
                      className={cn(
                        validationErrors?.groupOut &&
                          'border-destructive focus-visible:ring-destructive'
                      )}
                    >
                      {' '}
                      {/* ZOD: Estilo erro */}
                      <SelectValue placeholder="Selecione o grupo de quem vai folgar" />
                    </SelectTrigger>
                    <SelectContent>
                      {reliefGroupOptions.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* ZOD: Exibe erro */}
                  {validationErrors?.groupOut?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.groupOut._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              <Separator className="md:hidden mb-6 bg-amber-950" />
              {/* Coluna 2 */}
              <div className="space-y-1">
                {/* --- Campo employeeIdIn --- */}
                <div className="grid gap-1.5">
                  <Label htmlFor="employeeIdIn">Crachá de Quem Entra</Label>
                  <Input
                    id="employeeIdIn"
                    placeholder="Crachá (5-6 dígitos)"
                    required
                    value={employeeIdIn}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    onChange={(e) => {
                      setEmployeeIdIn(e.target.value.replace(/[^0-9]/g, ''));
                      setValidationErrors(null);
                    }}
                    disabled={submitRequestMutation.isPending}
                    className={cn(
                      validationErrors?.employeeIdIn &&
                        'border-destructive focus-visible:ring-destructive'
                    )} // ZOD: Estilo erro
                  />
                  {/* ZOD: Exibe erro (incluindo o de refine) */}
                  {validationErrors?.employeeIdIn?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.employeeIdIn._errors[0]}
                    </p>
                  )}
                  {validationErrors?._errors?.includes(
                    'Crachá de Entrada deve ser diferente do Crachá de Saída.'
                  ) && (
                    <p className="text-sm font-medium text-destructive">
                      Crachá de Entrada deve ser diferente do Crachá de Saída.
                    </p>
                  )}
                </div>
                {/* --- Campo paybackDate --- */}
                <div className="grid gap-1.5 my-6">
                  <Label htmlFor="paybackDate">
                    Data do Pagamento (Retorno da Folga)
                  </Label>
                  {/* TODO: Aplicar estilo de erro no botão do DatePicker */}
                  <DatePicker
                    date={paybackDate}
                    setDate={(d) => {
                      setPaybackDate(d);
                      setValidationErrors(null);
                    }}
                  />
                  {/* ZOD: Exibe erro (incluindo os de refine) */}
                  {validationErrors?.paybackDate?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.paybackDate._errors[0]}
                    </p>
                  )}
                  {validationErrors?._errors?.includes(
                    'Data do Pagamento não pode ser no passado.'
                  ) && (
                    <p className="text-sm font-medium text-destructive">
                      Data do Pagamento não pode ser no passado.
                    </p>
                  )}
                  {validationErrors?._errors?.includes(
                    'Data da Troca e Data do Pagamento não podem ser o mesmo dia.'
                  ) && (
                    <p className="text-sm font-medium text-destructive">
                      Data da Troca e Data do Pagamento não podem ser o mesmo
                      dia.
                    </p>
                  )}
                </div>
                {/* --- Campo groupIn --- */}
                <div className="grid gap-1.5">
                  <Label htmlFor="groupIn">Grupo de Folga (Entrada)</Label>
                  <Select
                    value={groupIn}
                    key={groupIn ?? 'initial-gIn'}
                    onValueChange={(value: ReliefGroup) => {
                      setGroupIn(value);
                      setValidationErrors(null);
                    }}
                    required
                    disabled={submitRequestMutation.isPending}
                  >
                    <SelectTrigger
                      id="groupIn"
                      className={cn(
                        validationErrors?.groupIn &&
                          'border-destructive focus-visible:ring-destructive'
                      )}
                    >
                      {/* ZOD: Estilo erro */}
                      <SelectValue placeholder="Selecione o grupo de quem vai cobrir" />
                    </SelectTrigger>
                    <SelectContent>
                      {reliefGroupOptions.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* ZOD: Exibe erro */}
                  {validationErrors?.groupIn?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.groupIn._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              <Separator className="md:hidden my-6 bg-amber-950" />

              {/* --- Campo Função --- */}
              <div className="grid gap-1.5 md:col-span-2">
                <Label htmlFor="employeeFunction">Função</Label>
                <Select
                  value={employeeFunction}
                  key={employeeFunction ?? 'initial-func'}
                  onValueChange={(value: EmployeeFunction) => {
                    setEmployeeFunction(value);
                    setValidationErrors(null);
                  }}
                  required
                  disabled={submitRequestMutation.isPending}
                >
                  <SelectTrigger
                    id="employeeFunction"
                    className={cn(
                      validationErrors?.employeeFunction &&
                        'border-destructive focus-visible:ring-destructive'
                    )}
                  >
                    {' '}
                    {/* ZOD: Estilo erro */}
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeFunctionOptions.map((func) => (
                      <SelectItem key={func} value={func}>
                        {func}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* ZOD: Exibe erro */}
                {validationErrors?.employeeFunction?._errors?.[0] && (
                  <p className="text-sm font-medium text-destructive">
                    {validationErrors.employeeFunction._errors[0]}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full my-6"
                type="submit"
                disabled={isDisabled}
              >
                {submitRequestMutation.isPending
                  ? 'Enviando...'
                  : 'Enviar Solicitação'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
