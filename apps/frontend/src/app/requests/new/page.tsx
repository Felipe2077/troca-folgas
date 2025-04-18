// apps/frontend/src/app/requests/new/page.tsx
'use client';

import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query'; // Importar useMutation
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

// Importa componentes Shadcn/ui
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Tipos (Enum podem ser substituídos por string se não vierem de pacote compartilhado)
const employeeFunctionOptions = ['MOTORISTA', 'COBRADOR'] as const;
const reliefGroupOptions = [
  'G1',
  'G2',
  'FIXO_DOMINGO',
  'SAB_DOMINGO',
  'FIXO_SABADO',
] as const;
type EmployeeFunction = (typeof employeeFunctionOptions)[number];
type ReliefGroup = (typeof reliefGroupOptions)[number];

// Tipos para a mutação
interface SwapRequestInput {
  employeeIdOut: string;
  employeeIdIn: string;
  swapDate: Date; // Zod coerce.date garante que seja Date aqui
  paybackDate: Date;
  employeeFunction: EmployeeFunction;
  groupOut: ReliefGroup;
  groupIn: ReliefGroup;
}

interface SubmitSwapRequestParams {
  formData: SwapRequestInput;
  token: string;
}

// Simula a estrutura da resposta da API (ajuste se necessário)
interface SwapRequestResponse {
  request: {
    id: number;
    // ... outros campos se a API retornar ...
  };
}

interface ApiError {
  message: string;
  issues?: unknown;
}

// --- Componente DatePicker (inalterado) ---
interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}
function DatePicker({ date, setDate }: DatePickerProps) {
  /* ... código do DatePicker ... */
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />{' '}
          {date ? (
            format(date, 'PPP', { locale: ptBR })
          ) : (
            <span>Escolha uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
// --- Fim do Componente DatePicker ---

// --- Componente Principal da Página ---
export default function NewRequestPage() {
  // Estados do formulário
  const [employeeIdOut, setEmployeeIdOut] = useState('');
  const [employeeIdIn, setEmployeeIdIn] = useState('');
  const [swapDate, setSwapDate] = useState<Date | undefined>(undefined);
  const [paybackDate, setPaybackDate] = useState<Date | undefined>(undefined);
  const [employeeFunction, setEmployeeFunction] = useState<
    EmployeeFunction | undefined
  >(undefined);
  const [groupOut, setGroupOut] = useState<ReliefGroup | undefined>(undefined);
  const [groupIn, setGroupIn] = useState<ReliefGroup | undefined>(undefined);
  const [apiError, setApiError] = useState<string | null>(null); // Estado para erro da API

  const router = useRouter();

  // Função que faz a chamada à API
  const submitSwapRequest = async ({
    formData,
    token,
  }: SubmitSwapRequestParams): Promise<SwapRequestResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // <-- Inclui o token!
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: `Erro ${response.status}: ${response.statusText}`,
      }));
      // Lança um erro que será pego pelo onError do useMutation
      throw new Error(errorData.message || 'Falha ao criar solicitação.');
    }
    return response.json();
  };

  // Configuração da Mutação com React Query
  const mutation = useMutation<
    SwapRequestResponse,
    Error,
    SubmitSwapRequestParams
  >({
    mutationFn: submitSwapRequest,
    onSuccess: (data) => {
      console.log('Solicitação criada com sucesso:', data);
      setApiError(null); // Limpa erros anteriores
      alert('Solicitação de troca/substituição enviada com sucesso!');
      // Limpar formulário?
      setEmployeeIdOut('');
      setEmployeeIdIn('');
      setSwapDate(undefined); /* ...etc */
      // Redirecionar para outra página?
      router.push('/'); // Volta para home por enquanto
    },
    onError: (error) => {
      console.error('Erro ao criar solicitação:', error);
      setApiError(error.message); // Guarda a mensagem de erro para exibir na UI
      // alert(`Erro ao criar solicitação: ${error.message}`); // Remove alert se usar estado
    },
  });

  // Calcula estado desabilitado (inclui pending da mutação)
  const isDisabled =
    !employeeIdOut.trim() ||
    !employeeIdIn.trim() ||
    !swapDate ||
    !paybackDate ||
    !employeeFunction ||
    !groupOut ||
    !groupIn ||
    mutation.isPending;

  // Handler de submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return;

    // 1. Pega o token do localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Idealmente, ter um hook/context que já faria isso ou redirecionaria
      alert(
        'Erro: Token de autenticação não encontrado. Faça login novamente.'
      );
      router.push('/login'); // Exemplo: Redireciona para login
      return;
    }

    // 2. Prepara os dados (garante que não tem undefined)
    //    A validação do isDisabled já garante que não são undefined aqui
    const formData: SwapRequestInput = {
      employeeIdOut,
      employeeIdIn,
      swapDate: swapDate!,
      paybackDate: paybackDate!,
      employeeFunction: employeeFunction!,
      groupOut: groupOut!,
      groupIn: groupIn!,
    };

    // 3. Limpa erro anterior e chama a mutação
    setApiError(null);
    mutation.mutate({ formData, token });
  };

  return (
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
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mensagem de erro da API */}
            {apiError && (
              <p className="md:col-span-2 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                Erro: {apiError}
              </p>
            )}

            {/* Coluna 1 */}
            <div className="space-y-4">
              {/* ... Input employeeIdOut (com value/onChange e disabled={mutation.isPending}) ... */}
              <div className="grid gap-2">
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
                    const v = e.target.value;
                    setEmployeeIdOut(v.replace(/[^0-9]/g, ''));
                  }}
                  disabled={mutation.isPending}
                />
              </div>
              {/* ... DatePicker swapDate (com date/setDate e talvez disabled?) ... */}
              <div className="grid gap-2">
                <Label htmlFor="swapDate">
                  Data da Troca (Trabalho do Colega)
                </Label>
                <DatePicker date={swapDate} setDate={setSwapDate} />
              </div>
              {/* ... Select groupOut (com value/onValueChange e disabled={mutation.isPending}) ... */}
              <div className="grid gap-2">
                <Label htmlFor="groupOut">Grupo de Folga (Saída)</Label>
                <Select
                  value={groupOut}
                  onValueChange={(value: ReliefGroup) => setGroupOut(value)}
                  required
                  disabled={mutation.isPending}
                >
                  <SelectTrigger id="groupOut">
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
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              {/* ... Input employeeIdIn (com value/onChange e disabled={mutation.isPending}) ... */}
              <div className="grid gap-2">
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
                    const v = e.target.value;
                    setEmployeeIdIn(v.replace(/[^0-9]/g, ''));
                  }}
                  disabled={mutation.isPending}
                />
              </div>
              {/* ... DatePicker paybackDate (com date/setDate e talvez disabled?) ... */}
              <div className="grid gap-2">
                <Label htmlFor="paybackDate">
                  Data do Pagamento (Retorno da Folga)
                </Label>
                <DatePicker date={paybackDate} setDate={setPaybackDate} />
              </div>
              {/* ... Select groupIn (com value/onValueChange e disabled={mutation.isPending}) ... */}
              <div className="grid gap-2">
                <Label htmlFor="groupIn">Grupo de Folga (Entrada)</Label>
                <Select
                  value={groupIn}
                  onValueChange={(value: ReliefGroup) => setGroupIn(value)}
                  required
                  disabled={mutation.isPending}
                >
                  <SelectTrigger id="groupIn">
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
              </div>
            </div>

            {/* Campo Função */}
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="employeeFunction">Função</Label>
              {/* ... Select employeeFunction (com value/onValueChange e disabled={mutation.isPending}) ... */}
              <Select
                value={employeeFunction}
                onValueChange={(value: EmployeeFunction) =>
                  setEmployeeFunction(value)
                }
                required
                disabled={mutation.isPending}
              >
                <SelectTrigger id="employeeFunction">
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
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isDisabled}>
              {/* Mostra feedback de loading no botão */}
              {mutation.isPending ? 'Enviando...' : 'Enviar Solicitação'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
