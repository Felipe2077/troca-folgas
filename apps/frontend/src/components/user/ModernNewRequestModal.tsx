// apps/frontend/src/components/user/ModernNewRequestModal.tsx
'use client';

import { Button } from '@/components/ui/button';
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
  swapRequestCreateBodySchema,
  SwapRequestInput,
} from '@repo/shared-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Calendar,
  FileText,
  Loader2,
  Send,
  User,
  Users,
  X,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';

type FormattedErrors = ZodError<SwapRequestInput>['formErrors']['fieldErrors'];

interface ModernNewRequestModalProps {
  onOpenChange: (open: boolean) => void;
}

export function ModernNewRequestModal({
  onOpenChange,
}: ModernNewRequestModalProps) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [employeeIdOut, setEmployeeIdOut] = useState('');
  const [employeeIdIn, setEmployeeIdIn] = useState('');
  const [swapDate, setSwapDate] = useState<Date | undefined>(undefined);
  const [paybackDate, setPaybackDate] = useState<Date | undefined>(undefined);
  const [employeeFunction, setEmployeeFunction] = useState<
    EmployeeFunction | ''
  >('');
  const [groupOut, setGroupOut] = useState<ReliefGroup | ''>('');
  const [groupIn, setGroupIn] = useState<ReliefGroup | ''>('');
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
      // Invalida as queries
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
      queryClient.invalidateQueries({ queryKey: ['userRequestSummary'] });
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
        swapRequestCreateBodySchema.safeParse(requestData);

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

  // Função para formatar data para input
  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Função para converter string do input para Date
  const handleDateChange = (
    dateString: string,
    setter: (date: Date | undefined) => void
  ) => {
    if (dateString) {
      setter(new Date(dateString + 'T00:00:00'));
    } else {
      setter(undefined);
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Display */}
        {apiError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
            <p className="text-red-400">{apiError}</p>
          </div>
        )}

        {/* Employee IDs Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-yellow-400" />
            <h4 className="text-lg font-semibold text-white">Funcionários</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeIdOut" className="text-gray-300">
                Crachá do Funcionário de Saída
              </Label>
              <Input
                id="employeeIdOut"
                type="text"
                placeholder="Ex: 001234 (6 dígitos)"
                value={employeeIdOut}
                onChange={(e) => setEmployeeIdOut(e.target.value)}
                onBlur={(e) => {
                  const value = e.target.value.padStart(6, '0');
                  setEmployeeIdOut(value);
                }}
                maxLength={6}
                disabled={isDisabled}
                className={cn(
                  'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20',
                  validationErrors?.employeeIdOut &&
                    'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                )}
              />
              {validationErrors?.employeeIdOut && (
                <p className="text-red-400 text-sm">
                  {validationErrors.employeeIdOut[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeIdIn" className="text-gray-300">
                Crachá do Funcionário de Entrada
              </Label>
              <Input
                id="employeeIdIn"
                type="text"
                placeholder="Ex: 005432 (6 dígitos)"
                value={employeeIdIn}
                onChange={(e) => setEmployeeIdIn(e.target.value)}
                onBlur={(e) => {
                  const value = e.target.value.padStart(6, '0');
                  setEmployeeIdIn(value);
                }}
                maxLength={6}
                disabled={isDisabled}
                className={cn(
                  'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20',
                  validationErrors?.employeeIdIn &&
                    'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                )}
              />
              {validationErrors?.employeeIdIn && (
                <p className="text-red-400 text-sm">
                  {validationErrors.employeeIdIn[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-yellow-400" />
            <h4 className="text-lg font-semibold text-white">Datas</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="swapDate" className="text-gray-300">
                Data da Troca
              </Label>
              <Input
                id="swapDate"
                type="date"
                value={formatDateForInput(swapDate)}
                onChange={(e) => handleDateChange(e.target.value, setSwapDate)}
                disabled={isDisabled}
                className={cn(
                  'bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20',
                  validationErrors?.swapDate &&
                    'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                )}
              />
              {validationErrors?.swapDate && (
                <p className="text-red-400 text-sm">
                  {validationErrors.swapDate[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paybackDate" className="text-gray-300">
                Data de Pagamento
              </Label>
              <Input
                id="paybackDate"
                type="date"
                value={formatDateForInput(paybackDate)}
                onChange={(e) =>
                  handleDateChange(e.target.value, setPaybackDate)
                }
                disabled={isDisabled}
                className={cn(
                  'bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20',
                  validationErrors?.paybackDate &&
                    'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                )}
              />
              {validationErrors?.paybackDate && (
                <p className="text-red-400 text-sm">
                  {validationErrors.paybackDate[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Function and Groups Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-5 w-5 text-yellow-400" />
            <h4 className="text-lg font-semibold text-white">
              Função e Grupos
            </h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeFunction" className="text-gray-300">
                Função do Funcionário
              </Label>
              <Select
                value={employeeFunction}
                onValueChange={(value: EmployeeFunction) =>
                  setEmployeeFunction(value)
                }
                disabled={isDisabled}
              >
                <SelectTrigger
                  className={cn(
                    'bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20',
                    validationErrors?.employeeFunction &&
                      'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                  )}
                >
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {Object.values(EmployeeFunction).map((func) => (
                    <SelectItem
                      key={func}
                      value={func}
                      className="text-white hover:bg-gray-700"
                    >
                      {func}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors?.employeeFunction && (
                <p className="text-red-400 text-sm">
                  {validationErrors.employeeFunction[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groupOut" className="text-gray-300">
                  Grupo de Folga de Saída
                </Label>
                <Select
                  value={groupOut}
                  onValueChange={(value: ReliefGroup) => setGroupOut(value)}
                  disabled={isDisabled}
                >
                  <SelectTrigger
                    className={cn(
                      'bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20',
                      validationErrors?.groupOut &&
                        'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                    )}
                  >
                    <SelectValue placeholder="Selecione o grupo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Object.values(ReliefGroup).map((group) => (
                      <SelectItem
                        key={group}
                        value={group}
                        className="text-white hover:bg-gray-700"
                      >
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors?.groupOut && (
                  <p className="text-red-400 text-sm">
                    {validationErrors.groupOut[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupIn" className="text-gray-300">
                  Grupo de Folga de Entrada
                </Label>
                <Select
                  value={groupIn}
                  onValueChange={(value: ReliefGroup) => setGroupIn(value)}
                  disabled={isDisabled}
                >
                  <SelectTrigger
                    className={cn(
                      'bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20',
                      validationErrors?.groupIn &&
                        'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                    )}
                  >
                    <SelectValue placeholder="Selecione o grupo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {Object.values(ReliefGroup).map((group) => (
                      <SelectItem
                        key={group}
                        value={group}
                        className="text-white hover:bg-gray-700"
                      >
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors?.groupIn && (
                  <p className="text-red-400 text-sm">
                    {validationErrors.groupIn[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Observation Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-yellow-400" />
            <h4 className="text-lg font-semibold text-white">Observação</h4>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observation" className="text-gray-300">
              Observação (Opcional)
            </Label>
            <Textarea
              id="observation"
              placeholder="Adicione qualquer observação relevante..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              disabled={isDisabled}
              rows={3}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-700/50">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="outline"
            disabled={isDisabled}
            className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border-gray-600/50 hover:border-gray-500/50 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancelar</span>
          </Button>

          <Button
            type="submit"
            disabled={isDisabled}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black border-0 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-yellow-500/25 font-semibold"
          >
            {createRequestMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Enviar Solicitação</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
