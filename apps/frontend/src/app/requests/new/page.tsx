// apps/frontend/src/app/requests/new/page.tsx
'use client'; // Marca como Client Component pois usará estado e handlers

import { cn } from '@/lib/utils'; // Helper Shadcn para classes condicionais
import { format } from 'date-fns'; // Para formatar data no botão DatePicker
import { ptBR } from 'date-fns/locale'; // Para formato PT-BR
import { Calendar as CalendarIcon } from 'lucide-react'; // Ícone do calendário
import { useRouter } from 'next/navigation'; // Para redirecionamento futuro
import * as React from 'react'; // Importa React e hooks
import { useState } from 'react';

// Importa componentes Shadcn/ui (certifique-se que todos foram adicionados via 'pnpm dlx shadcn@latest add ...')
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

// Importa os Enums do Prisma Client (idealmente viriam de um pacote compartilhado, mas por enquanto ok)
// Se der erro aqui, pode ser necessário ajustar o caminho ou gerar tipos compartilhados
import { EmployeeFunction, ReliefGroup } from '@prisma/client';

// --- Componente DatePicker Reutilizável (Definido aqui ou importado de ui/date-picker.tsx) ---
// Se mover para arquivo separado, ele também precisa de "use client";
interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

function DatePicker({ date, setDate }: DatePickerProps) {
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
          <CalendarIcon className="mr-2 h-4 w-4" />
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
  // Estados para todos os campos do formulário
  const [employeeIdOut, setEmployeeIdOut] = useState('');
  const [employeeIdIn, setEmployeeIdIn] = useState('');
  const [swapDate, setSwapDate] = useState<Date | undefined>(undefined);
  const [paybackDate, setPaybackDate] = useState<Date | undefined>(undefined);
  const [employeeFunction, setEmployeeFunction] = useState<
    EmployeeFunction | undefined
  >(undefined);
  const [groupOut, setGroupOut] = useState<ReliefGroup | undefined>(undefined);
  const [groupIn, setGroupIn] = useState<ReliefGroup | undefined>(undefined);

  const router = useRouter(); // Para navegação futura

  // Calcula se o botão de submit deve estar desabilitado
  const isDisabled =
    !employeeIdOut.trim() ||
    !employeeIdIn.trim() ||
    !swapDate ||
    !paybackDate ||
    !employeeFunction ||
    !groupOut ||
    !groupIn;

  // Handler para o submit do formulário (por enquanto só loga)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede refresh padrão
    if (isDisabled) return; // Não faz nada se desabilitado

    const formData = {
      employeeIdOut,
      employeeIdIn,
      swapDate,
      paybackDate,
      employeeFunction,
      groupOut,
      groupIn,
    };
    console.log('Dados do formulário para enviar:', formData);
    alert('Dados prontos no console! Próximo passo: Enviar para API.');
    // TODO: Chamar a API com useMutation (Tarefa 3.7)
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Nova Solicitação de Troca/Substituição</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para registrar a troca ou substituição de
            folga.
          </CardDescription>
        </CardHeader>
        {/* Formulário envolvendo o conteúdo e o rodapé */}
        <form onSubmit={handleSubmit}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1 */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="employeeIdOut">
                  Funcionário de Saída (Crachá)
                </Label>
                <Input
                  id="employeeIdOut"
                  placeholder="Crachá de quem vai folgar"
                  required
                  value={employeeIdOut}
                  onChange={(e) => setEmployeeIdOut(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="swapDate">
                  Data da Troca (Trabalho do Colega)
                </Label>
                <DatePicker date={swapDate} setDate={setSwapDate} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="groupOut">Grupo de Folga (Saída)</Label>
                <Select
                  value={groupOut}
                  onValueChange={(value: ReliefGroup) => setGroupOut(value)}
                  required
                >
                  <SelectTrigger id="groupOut">
                    <SelectValue placeholder="Selecione o grupo de quem vai folgar" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ReliefGroup).map((group) => (
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
              <div className="grid gap-2">
                <Label htmlFor="employeeIdIn">
                  Funcionário de Entrada (Crachá)
                </Label>
                <Input
                  id="employeeIdIn"
                  placeholder="Crachá de quem vai cobrir"
                  required
                  value={employeeIdIn}
                  onChange={(e) => setEmployeeIdIn(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paybackDate">
                  Data do Pagamento (Retorno da Folga)
                </Label>
                <DatePicker date={paybackDate} setDate={setPaybackDate} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="groupIn">Grupo de Folga (Entrada)</Label>
                <Select
                  value={groupIn}
                  onValueChange={(value: ReliefGroup) => setGroupIn(value)}
                  required
                >
                  <SelectTrigger id="groupIn">
                    <SelectValue placeholder="Selecione o grupo de quem vai cobrir" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ReliefGroup).map((group) => (
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
              <Select
                value={employeeFunction}
                onValueChange={(value: EmployeeFunction) =>
                  setEmployeeFunction(value)
                }
                required
              >
                <SelectTrigger id="employeeFunction">
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
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isDisabled}>
              Enviar Solicitação
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
