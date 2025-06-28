// apps/frontend/src/components/user/NewRequestModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  EmployeeFunction,
  ReliefGroup,
  swapRequestCreateBodySchema, // Importar o schema correto
  SwapRequestInput,
} from '@repo/shared-types';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Importar useQueryClient
import { Loader2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; // Importar componentes de Dialog

// Tipo inferido dos erros formatados pelo Zod
type FormattedErrors = ZodError<SwapRequestInput>['formErrors']['fieldErrors'];

interface NewRequestModalProps {
  onOpenChange: (open: boolean) => void; // Para controlar o estado do modal
}

export function NewRequestModal({ onOpenChange }: NewRequestModalProps) {
  const { token } = useAuth();
  const queryClient = useQueryClient(); // Hook para invalidar queries

  const [employeeIdOut, setEmployeeIdOut] = useState('');
  const [employeeIdIn, setEmployeeIdIn] = useState('');
  const [swapDate, setSwapDate] = useState<Date | undefined>(undefined);
  const [paybackDate, setPaybackDate] = useState<Date | undefined>(undefined);
  const [employeeFunction, setEmployeeFunction] = useState<
    EmployeeFunction | ''
  >('');
  const [groupOut, setGroupOut] = useState<ReliefGroup | ''>((''));
  const [groupIn, setGroupIn] = useState<ReliefGroup | ''>((''));
  const [observation, setObservation] = useState<string>('');

  const [validationErrors, setValidationErrors] =
    useState<FormattedErrors | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const createRequestMutation = useMutation({
    mutationFn: async (newRequest: SwapRequestInput) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newRequest),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar solicitação.');
      }
      return data;
    },
    onSuccess: () => {
      toast.success('Solicitação criada com sucesso!');
      // Limpar formulário
      setEmployeeIdOut('');
      setEmployeeIdIn('');
      setSwapDate(undefined);
      setPaybackDate(undefined);
      setEmployeeFunction('');
      setGroupOut('');
      setGroupIn('');
      setObservation('');
      setValidationErrors(null);
      setApiError(null);
      // Fechar o modal
      onOpenChange(false);
      // Invalida as queries de requisições para re-buscar os dados na tabela
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
    },
    onError: (error) => {
      console.error('Erro na mutação:', error);
      setApiError(error.message);
      toast.error(error.message);
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);
    setValidationErrors(null);

    const requestData: SwapRequestInput = {
      employeeIdOut,
      employeeIdIn,
      swapDate: swapDate || new Date(),
      paybackDate: paybackDate || new Date(),
      employeeFunction: employeeFunction as EmployeeFunction,
      groupOut: groupOut as ReliefGroup,
      groupIn: groupIn as ReliefGroup,
      observation: observation || null,
    };

    try {
      const validationResult =
        swapRequestCreateBodySchema.safeParse(requestData); // Usar o schema correto

      if (!validationResult.success) {
        setValidationErrors(validationResult.error.formErrors.fieldErrors);
        toast.error('Verifique os campos do formulário.');
        return;
      }

      await createRequestMutation.mutateAsync(validationResult.data);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setValidationErrors(err.formErrors.fieldErrors);
        toast.error('Verifique os campos do formulário.');
      } else if (err instanceof Error) {
        setApiError(err.message);
        toast.error(err.message);
      } else {
        setApiError('Erro desconhecido ao processar a solicitação.');
        toast.error('Erro desconhecido ao processar a solicitação.');
      }
    }
  };

  const isDisabled = createRequestMutation.isPending;

  return (
    <Card className="w-full max-w-2xl bg-gray-800 text-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Nova Solicitação de Troca/Substituição
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {apiError && (
            <p className="text-destructive text-center">{apiError}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Crachá de Saída */}
            <div className="grid gap-2">
              <Label htmlFor="employeeIdOut">Crachá do Funcionário de Saída</Label>
              <Input
                id="employeeIdOut"
                type="text"
                placeholder="Ex: 12345"
                value={employeeIdOut}
                onChange={(e) => setEmployeeIdOut(e.target.value)}
                disabled={isDisabled}
                className={cn(
                  validationErrors?.employeeIdOut &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {validationErrors?.employeeIdOut && (
                <p className="text-destructive text-sm">
                  {validationErrors.employeeIdOut[0]}
                </p>
              )}
            </div>

            {/* Crachá de Entrada */}
            <div className="grid gap-2">
              <Label htmlFor="employeeIdIn">Crachá do Funcionário de Entrada</Label>
              <Input
                id="employeeIdIn"
                type="text"
                placeholder="Ex: 54321"
                value={employeeIdIn}
                onChange={(e) => setEmployeeIdIn(e.target.value)}
                disabled={isDisabled}
                className={cn(
                  validationErrors?.employeeIdIn &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {validationErrors?.employeeIdIn && (
                <p className="text-destructive text-sm">
                  {validationErrors.employeeIdIn[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Data da Troca */}
            <div className="grid gap-2">
              <Label htmlFor="swapDate">Data da Troca</Label>
              <DatePicker
                date={swapDate}
                setDate={setSwapDate}
                disabled={isDisabled}
                className={cn(
                  validationErrors?.swapDate &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {validationErrors?.swapDate && (
                <p className="text-destructive text-sm">
                  {validationErrors.swapDate[0]}
                </p>
              )}
            </div>

            {/* Data do Pagamento da Folga */}
            <div className="grid gap-2">
              <Label htmlFor="paybackDate">Data do Pagamento da Folga</Label>
              <DatePicker
                date={paybackDate}
                setDate={setPaybackDate}
                disabled={isDisabled}
                className={cn(
                  validationErrors?.paybackDate &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {validationErrors?.paybackDate && (
                <p className="text-destructive text-sm">
                  {validationErrors.paybackDate[0]}
                </p>
              )}
            </div>
          </div>

          {/* Função do Funcionário */}
          <div className="grid gap-2">
            <Label htmlFor="employeeFunction">Função do Funcionário</Label>
            <Select
              value={employeeFunction}
              onValueChange={(value: EmployeeFunction) =>
                setEmployeeFunction(value)
              }
              disabled={isDisabled}
            >
              <SelectTrigger
                className={cn(
                  validationErrors?.employeeFunction &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              >
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EmployeeFunction).map((func) => (
                  <SelectItem key={func} value={func}>
                    {func}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors?.employeeFunction && (
              <p className="text-destructive text-sm">
                {validationErrors.employeeFunction[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grupo de Saída */}
            <div className="grid gap-2">
              <Label htmlFor="groupOut">Grupo de Folga de Saída</Label>
              <Select
                value={groupOut}
                onValueChange={(value: ReliefGroup) => setGroupOut(value)}
                disabled={isDisabled}
              >
                <SelectTrigger
                  className={cn(
                    validationErrors?.groupOut &&
                      'border-destructive focus-visible:ring-destructive'
                  )}
                >
                  <SelectValue placeholder="Selecione o grupo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ReliefGroup).map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors?.groupOut && (
                <p className="text-destructive text-sm">
                  {validationErrors.groupOut[0]}
                </p>
              )}
            </div>

            {/* Grupo de Entrada */}
            <div className="grid gap-2">
              <Label htmlFor="groupIn">Grupo de Folga de Entrada</Label>
              <Select
                value={groupIn}
                onValueChange={(value: ReliefGroup) => setGroupIn(value)}
                disabled={isDisabled}
              >
                <SelectTrigger
                  className={cn(
                    validationErrors?.groupIn &&
                      'border-destructive focus-visible:ring-destructive'
                  )}
                >
                  <SelectValue placeholder="Selecione o grupo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ReliefGroup).map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors?.groupIn && (
                <p className="text-destructive text-sm">
                  {validationErrors.groupIn[0]}
                </p>
              )}
            </div>
          </div>

          {/* Observação */}
          <div className="grid gap-2">
            <Label htmlFor="observation">Observação (Opcional)</Label>
            <Textarea
              id="observation"
              placeholder="Adicione qualquer observação relevante..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              disabled={isDisabled}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 text-lg font-semibold"
            disabled={isDisabled}
          >
            {createRequestMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Solicitação'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
