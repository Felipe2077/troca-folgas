// apps/frontend/src/app/requests/new/page.tsx
'use client'; // Marca como Client Component pois usará estado e handlers

import * as React from 'react'; // Importa React e hooks
import { useState } from 'react';
// import Link from "next/link"; // Descomente se/quando adicionar links
import { useRouter } from 'next/navigation'; // Para redirecionamento futuro
// import { z } from 'zod'; // Não estamos usando Zod diretamente aqui por enquanto

// Importa componentes Shadcn/ui
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

// --- Constantes para as opções dos Selects (Substituindo Enums do Prisma) ---
const employeeFunctionOptions = ['MOTORISTA', 'COBRADOR'] as const;
const reliefGroupOptions = [
  'G1',
  'G2',
  'FIXO_DOMINGO',
  'SAB_DOMINGO',
  'FIXO_SABADO',
] as const;

// --- Componente Principal da Página ---
export default function NewRequestPage() {
  // Estados para todos os campos do formulário
  const [employeeIdOut, setEmployeeIdOut] = useState('');
  const [employeeIdIn, setEmployeeIdIn] = useState('');
  const [swapDate, setSwapDate] = useState<Date | undefined>(undefined);
  const [paybackDate, setPaybackDate] = useState<Date | undefined>(undefined);
  const [employeeFunction, setEmployeeFunction] = useState<string | undefined>(
    undefined
  );
  const [groupOut, setGroupOut] = useState<string | undefined>(undefined);
  const [groupIn, setGroupIn] = useState<string | undefined>(undefined);

  const router = useRouter(); // Para navegação futura

  // Calcula se o botão de submit deve estar desabilitado
  const isDisabled =
    !employeeIdOut.trim() ||
    !employeeIdIn.trim() ||
    !swapDate ||
    !paybackDate ||
    !employeeFunction || // Verifica se a string não é vazia/undefined
    !groupOut || // Verifica se a string não é vazia/undefined
    !groupIn; // Verifica se a string não é vazia/undefined

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
    <div className="flex justify-center pt-10">
      {' '}
      {/* Removido items-center para não forçar centralização vertical excessiva */}
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
                  placeholder="Apenas números"
                  required
                  value={employeeIdOut}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    const value = e.target.value;
                    const numericValue = value.replace(/[^0-9]/g, '');
                    setEmployeeIdOut(numericValue); // Atualiza estado SÓ com números
                  }}
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
                  onValueChange={(value: string) => setGroupOut(value)} // Recebe string
                  required
                >
                  <SelectTrigger id="groupOut">
                    <SelectValue placeholder="Selecione o grupo de quem vai folgar" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Itera sobre a constante reliefGroupOptions */}
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
              <div className="grid gap-2">
                <Label htmlFor="employeeIdIn">
                  Funcionário de Entrada (Crachá)
                </Label>
                <Input
                  id="employeeIdIn"
                  placeholder="Apenas números" // Atualiza placeholder
                  required
                  value={employeeIdIn}
                  type="tel" // Sugere teclado numérico em mobile, sem spinners
                  inputMode="numeric" // Hint adicional para teclado numérico
                  pattern="[0-9]*" // Validação HTML básica (opcional)
                  onChange={(e) => {
                    const value = e.target.value;
                    // Remove qualquer caractere que não seja dígito
                    const numericValue = value.replace(/[^0-9]/g, '');
                    setEmployeeIdIn(numericValue); // Atualiza estado SÓ com números
                  }}
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
                  onValueChange={(value: string) => setGroupIn(value)} // Recebe string
                  required
                >
                  <SelectTrigger id="groupIn">
                    <SelectValue placeholder="Selecione o grupo de quem vai cobrir" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Itera sobre a constante reliefGroupOptions */}
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
              {' '}
              {/* Ocupa as duas colunas */}
              <Label htmlFor="employeeFunction">Função</Label>
              <Select
                value={employeeFunction}
                onValueChange={(value: string) => setEmployeeFunction(value)} // Recebe string
                required
              >
                <SelectTrigger id="employeeFunction">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  {/* Itera sobre a constante employeeFunctionOptions */}
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
              Enviar Solicitação
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
