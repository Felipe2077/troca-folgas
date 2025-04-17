'use client'; // Se estiver em arquivo separado
// apps/frontend/src/app/requests/new/page.tsx
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'; // Usado pelo DatePicker
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
} from '@/components/ui/popover'; // Usado pelo DatePicker
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Componente Select
import { cn } from '@/lib/utils'; // Helper do Shadcn
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Para formato de data PT-BR
import { Calendar as CalendarIcon } from 'lucide-react';
import React from 'react';

// TODO: Importar Enums do Prisma ou definir constantes aqui se não compartilhar tipos
// Exemplo - Idealmente viria de um pacote compartilhado ou gerado pelo Prisma
const EmployeeFunction = {
  MOTORISTA: 'MOTORISTA',
  COBRADOR: 'COBRADOR',
} as const;
const ReliefGroup = {
  G1: 'G1',
  G2: 'G2',
  FIXO_DOMINGO: 'FIXO_DOMINGO',
  SAB_DOMINGO: 'SAB_DOMINGO',
  FIXO_SABADO: 'FIXO_SABADO',
} as const;

// Componente DatePicker Simples (pode ser movido para components/ui depois)
// Baseado na documentação do Shadcn/ui
function DatePicker({
  date,
  setDate,
}: {
  date?: Date;
  setDate: (date?: Date) => void;
}) {
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
      <PopoverContent className="w-auto p-0">
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

export default function NewRequestPage() {
  const [swapDate, setSwapDate] = React.useState<Date | undefined>(undefined);
  const [paybackDate, setPaybackDate] = React.useState<Date | undefined>(
    undefined
  );

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Nova Solicitação de Troca/Substituição</CardTitle>
          <CardDescription className="mt-1 te">
            Preencha os dados abaixo para registrar a troca ou substituição de
            folga.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grid responsivo */}
          {/* Coluna 1 */}
          <div className="space-y-4">
            <div className="grid gap-2 mb-6 sm:mb-4">
              <Label htmlFor="employeeIdOut">
                Funcionário de Saída (Crachá)
              </Label>
              <Input
                id="employeeIdOut"
                placeholder="Crachá de quem vai folgar"
              />
            </div>
            <div className="grid gap-2 mb-6 sm:mb-4">
              <Label htmlFor="swapDate">
                Data da Troca (Trabalho do Colega)
              </Label>
              {/* O DatePicker precisará de estado para funcionar interativamente */}
              <DatePicker date={swapDate} setDate={setSwapDate} />
            </div>
            <div className="grid gap-2 mb-6 sm:mb-4">
              <Label htmlFor="groupOut">Grupo de Folga (Saída)</Label>
              <Select /* value/onValueChange serão adicionados depois */>
                <SelectTrigger>
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
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paybackDate">
                Data do Pagamento (Retorno da Folga)
              </Label>
              {/* O DatePicker precisará de estado para funcionar interativamente */}
              <DatePicker date={paybackDate} setDate={setPaybackDate} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="groupIn">Grupo de Folga (Entrada)</Label>
              <Select /* value/onValueChange serão adicionados depois */>
                <SelectTrigger>
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
          {/* Campo Função (ocupando largura total talvez) */}
          <div className="grid gap-2 md:col-span-2">
            {' '}
            {/* Ocupa as duas colunas em telas médias+ */}
            <Label htmlFor="employeeFunction">Função</Label>
            <Select /* value/onValueChange serão adicionados depois */>
              <SelectTrigger>
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
          <Button type="submit" disabled>
            {' '}
            {/* Começa desabilitado */}
            Enviar Solicitação
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
