// apps/frontend/src/app/admin/dashboard/page.tsx
'use client'; // Marcamos como client component pois buscará dados e terá interatividade

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';

// --- Tipagem (Importando do nosso pacote compartilhado) ---
import {
  EmployeeFunction,
  ReliefGroup,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types';

// --- Dados Fictícios (Dummy Data) ---
// Usando o tipo importado SwapRequest
const dummyRequests: SwapRequest[] = [
  // Ajustando para usar Date e Enums/Tipos corretos
  {
    id: 1,
    employeeIdOut: '111',
    employeeIdIn: '222',
    swapDate: new Date('2025-05-04T03:00:00Z'),
    paybackDate: new Date('2025-05-11T03:00:00Z'),
    employeeFunction: EmployeeFunction.MOTORISTA,
    groupOut: ReliefGroup.G1,
    groupIn: ReliefGroup.G2,
    eventType: SwapEventType.SUBSTITUICAO,
    status: SwapStatus.AGENDADO,
    submittedById: 1,
    createdAt: new Date('2025-04-17T10:00:00Z'),
    updatedAt: new Date('2025-04-17T10:00:00Z'),
    observation: null,
  },
  {
    id: 2,
    employeeIdOut: '555',
    employeeIdIn: '666',
    swapDate: new Date('2025-05-10T03:00:00Z'),
    paybackDate: new Date('2025-05-10T03:00:00Z'), // Mesmo dia -> Troca? Ajustar data para ter troca real
    employeeFunction: EmployeeFunction.COBRADOR,
    groupOut: ReliefGroup.FIXO_DOMINGO,
    groupIn: ReliefGroup.G1,
    eventType: SwapEventType.TROCA,
    status: SwapStatus.NAO_REALIZADA,
    submittedById: 2,
    createdAt: new Date('2025-04-18T09:30:00Z'),
    updatedAt: new Date('2025-04-18T11:00:00Z'),
    observation: 'Colaborador faltou.',
  },
  // Adicione mais um exemplo se quiser
];

// --- Função Helper para Formatar Data ---
const formatDate = (date: Date | null | undefined) => {
  if (!date) return '-';
  // Garantir que 'date' é um objeto Date antes de formatar
  try {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch (_e) {
    return 'Data inválida';
  }
};

// --- Componente da Página ---
export default function AdminDashboardPage() {
  // Por enquanto, apenas renderiza a UI estática com dados dummy
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard do Administrador</CardTitle>
        <CardDescription>
          Visualização e gerenciamento das solicitações de troca e substituição
          de folgas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Sai (Crachá)</TableHead>
              <TableHead>Entra (Crachá)</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Data Troca</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Solicitante ID</TableHead> */}
              <TableHead>Criado Em</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapeando os dados fictícios */}
            {dummyRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.id}</TableCell>
                <TableCell>{req.employeeIdOut}</TableCell>
                <TableCell>{req.employeeIdIn}</TableCell>
                <TableCell>{req.employeeFunction}</TableCell>
                <TableCell>{formatDate(req.swapDate)}</TableCell>
                <TableCell>{formatDate(req.paybackDate)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      req.eventType === SwapEventType.TROCA
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {req.eventType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      req.status === SwapStatus.NAO_REALIZADA
                        ? 'destructive'
                        : 'default'
                    }
                  >
                    {req.status}
                  </Badge>
                </TableCell>
                {/* <TableCell>{req.submittedById}</TableCell> */}
                <TableCell>{formatDate(req.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>
                        Adicionar/Ver Observação
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Marcar como Não Realizada
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
