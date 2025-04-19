// apps/frontend/src/app/requests/new/page.tsx - COM VALIDAÇÃO ZOD FRONTEND
'use client';

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
import { DatePicker } from '@/components/ui/datepicker'; // Confirma import do seu DatePicker
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils'; // <-- ZOD: Importa cn (necessário para estilo de erro)
import {
  EmployeeFunction,
  ReliefGroup,
  Role,
  SwapRequest,
  swapRequestCreateBodySchema,
} from '@repo/shared-types'; // <-- ZOD: Importa tudo de shared-types
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react'; // Import FormEvent e useEffect se necessário
import { toast } from 'sonner';
import { z } from 'zod'; // <-- ZOD: Importa Zod

const reliefGroupOptions = [
  'G1',
  'G2',
  'FIXO_DOMINGO',
  'SAB_DOMINGO',
  'FIXO_SABADO',
] as const;
type SwapRequestFormData = z.infer<typeof swapRequestCreateBodySchema>;
type FormattedErrors = z.ZodFormattedError<SwapRequestFormData> | null;
const employeeFunctionOptions = ['MOTORISTA', 'COBRADOR'] as const;

// Interface para SubmitSwapRequestParams (mantém)
interface SubmitSwapRequestParams {
  formData: SwapRequestFormData;
  token: string;
}
// Interface para SwapRequestResponse (mantém)
interface SwapRequestResponse {
  request: SwapRequest;
}
// Interface para ApiError (mantém)
interface ApiError {
  message: string;
  issues?: unknown;
}

// --- Funções de API Call (mantidas como estavam) ---
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
  const [validationErrors, setValidationErrors] =
    useState<FormattedErrors>(null);

  const router = useRouter();
  const queryClient = useQueryClient(); // Necessário para onSuccess da mutation
  const { token } = useAuth(); // Pega token para a mutation

  // Mutação para submeter o formulário
  const submitRequestMutation = useMutation<
    SwapRequestResponse,
    Error,
    SubmitSwapRequestParams
  >({
    mutationFn: submitSwapRequestApi, // Usa a função definida fora
    onSuccess: (data) => {
      console.log('Solicitação criada com sucesso:', data);
      toast.success('Solicitação enviada com sucesso!');
      setApiError(null);
      // Limpa o formulário
      setEmployeeIdOut('');
      setEmployeeIdIn('');
      setSwapDate(undefined);
      setPaybackDate(undefined);
      setEmployeeFunction(undefined);
      setGroupOut(undefined);
      setGroupIn(undefined);
      setValidationErrors(null); // Limpa erros de validação também
      // Não redireciona, permanece na página
    },
    onError: (error) => {
      console.error('Erro ao criar solicitação:', error);
      setApiError(error.message); // Guarda erro da API
      toast.error(error.message || 'Erro ao criar solicitação.');
    },
  });

  // Calcula estado desabilitado (agora inclui pending da mutação correta)
  const isDisabled =
    !employeeIdOut.trim() ||
    !employeeIdIn.trim() ||
    !swapDate ||
    !paybackDate ||
    !employeeFunction ||
    !groupOut ||
    !groupIn ||
    submitRequestMutation.isPending;

  // Handler de submit (agora com validação Zod)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null); // Limpa erro API
    setValidationErrors(null); // Limpa erro Zod
    if (isDisabled) return;

    // Coleta os dados atuais do estado
    const currentFormData = {
      employeeIdOut: employeeIdOut.trim(), // Envia trimed
      employeeIdIn: employeeIdIn.trim(),
      swapDate,
      paybackDate,
      employeeFunction,
      groupOut,
      groupIn,
    };

    // 1. Validar com Zod ANTES de preparar para API
    const validationResult =
      swapRequestCreateBodySchema.safeParse(currentFormData);

    // 2. Se validação falhar, atualiza estado de erros e para
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.format());
      console.log('Erros Zod Frontend:', validationResult.error.format());
      return;
    }

    // 3. Se OK, pega token e chama a mutação com dados VALIDADOS
    const currentToken = localStorage.getItem('authToken'); // Renomeado para evitar conflito
    if (!currentToken) {
      toast.error('Erro de autenticação. Faça login novamente.');
      router.push('/login');
      return;
    }

    // Chama a mutação com os dados já validados pelo Zod e o token
    submitRequestMutation.mutate({
      formData: validationResult.data,
      token: currentToken,
    });
  };

  return (
    // Permite apenas ENCARREGADO
    <ProtectedRoute allowedRoles={[Role.ENCARREGADO]}>
      <div className="flex justify-center pt-10">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Nova Solicitação de Troca/Substituição</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para registrar a troca ou substituição de
              folga.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {' '}
              {/* Ajustado gap */}
              {/* Mensagem de erro geral da API (se houver) */}
              {apiError && !validationErrors && (
                <p className="md:col-span-2 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                  Erro no envio: {apiError}
                </p>
              )}
              {/* Coluna 1 */}
              <div className="space-y-4">
                <div className="grid gap-1.5">
                  {' '}
                  {/* Diminuido gap interno */}
                  <Label htmlFor="employeeIdOut">
                    Funcionário de Saída (Crachá)
                  </Label>
                  <Input
                    id="employeeIdOut"
                    placeholder="Apenas números"
                    required
                    value={employeeIdOut}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      setEmployeeIdOut(e.target.value.replace(/[^0-9]/g, ''));
                      setValidationErrors(null);
                    }} // Limpa erro ao digitar
                    disabled={submitRequestMutation.isPending}
                    className={cn(
                      validationErrors?.employeeIdOut &&
                        'border-destructive focus-visible:ring-destructive'
                    )} // <-- ZOD: Estilo de erro
                  />
                  {/* <-- ZOD: Exibe erro --> */}
                  {validationErrors?.employeeIdOut?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.employeeIdOut._errors[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="swapDate">
                    Data da Troca (Trabalho do Colega)
                  </Label>
                  <DatePicker
                    date={swapDate}
                    setDate={(d) => {
                      setSwapDate(d);
                      setValidationErrors(null);
                    }}
                  />{' '}
                  {/* Limpa erro ao mudar */}
                  {/* <-- ZOD: Exibe erro --> */}
                  {validationErrors?.swapDate?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.swapDate._errors[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="groupOut">Grupo de Folga (Saída)</Label>
                  <Select
                    value={groupOut}
                    onValueChange={(value: ReliefGroup) => {
                      setGroupOut(value);
                      setValidationErrors(null);
                    }} // Limpa erro
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
                      {/* <-- ZOD: Estilo de erro */}
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
                  {/* <-- ZOD: Exibe erro --> */}
                  {validationErrors?.groupOut?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.groupOut._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              {/* Coluna 2 */}
              <div className="space-y-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="employeeIdIn">
                    Funcionário de Entrada (Crachá)
                  </Label>
                  <Input
                    id="employeeIdIn"
                    placeholder="Apenas números"
                    required
                    value={employeeIdIn}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      setEmployeeIdIn(e.target.value.replace(/[^0-9]/g, ''));
                      setValidationErrors(null);
                    }} // Limpa erro
                    disabled={submitRequestMutation.isPending}
                    className={cn(
                      validationErrors?.employeeIdIn &&
                        'border-destructive focus-visible:ring-destructive'
                    )} // <-- ZOD: Estilo de erro
                  />
                  {/* <-- ZOD: Exibe erro --> */}
                  {validationErrors?.employeeIdIn?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.employeeIdIn._errors[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="paybackDate">
                    Data do Pagamento (Retorno da Folga)
                  </Label>
                  <DatePicker
                    date={paybackDate}
                    setDate={(d) => {
                      setPaybackDate(d);
                      setValidationErrors(null);
                    }}
                  />{' '}
                  {/* Limpa erro */}
                  {/* <-- ZOD: Exibe erro --> */}
                  {validationErrors?.paybackDate?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.paybackDate._errors[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="groupIn">Grupo de Folga (Entrada)</Label>
                  <Select
                    value={groupIn}
                    onValueChange={(value: ReliefGroup) => {
                      setGroupIn(value);
                      setValidationErrors(null);
                    }} // Limpa erro
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
                      {' '}
                      {/* <-- ZOD: Estilo de erro */}
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
                  {/* <-- ZOD: Exibe erro --> */}
                  {validationErrors?.groupIn?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.groupIn._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              {/* Campo Função */}
              <div className="grid gap-1.5 md:col-span-2">
                <Label htmlFor="employeeFunction">Função</Label>
                <Select
                  value={employeeFunction}
                  onValueChange={(value: EmployeeFunction) => {
                    setEmployeeFunction(value);
                    setValidationErrors(null);
                  }} // Limpa erro
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
                    {/* <-- ZOD: Estilo de erro */}
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
                {/* <-- ZOD: Exibe erro --> */}
                {validationErrors?.employeeFunction?._errors?.[0] && (
                  <p className="text-sm font-medium text-destructive">
                    {validationErrors.employeeFunction._errors[0]}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {/* Botão usa isDisabled (que já inclui isPending) */}
              <Button className="w-full" type="submit" disabled={isDisabled}>
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
