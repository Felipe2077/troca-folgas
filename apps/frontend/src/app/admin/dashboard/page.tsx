// apps/frontend/src/app/admin/dashboard/page.tsx
'use client'; // Marcamos como client component pois buscará dados e terá interatividade

import { Badge } from '@/components/ui/badge'; // Para Status/Tipo
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
  DropdownMenuLabel, // Importado caso necessário pelo DropdownMenu
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Componentes da tabela
import { MoreHorizontal } from 'lucide-react'; // Ícone para menu de ações

// --- Dados Fictícios (Dummy Data) ---
// Substituiremos pela chamada da API GET /api/requests depois
const dummyRequests = [
  {
    id: 1,
    employeeIdOut: '111',
    employeeIdIn: '222',
    swapDate: new Date('2025-05-04'),
    paybackDate: new Date('2025-05-11'),
    employeeFunction: 'MOTORISTA',
    groupOut: 'G1',
    groupIn: 'G2',
    eventType: 'SUBSTITUICAO',
    status: 'AGENDADO',
    submittedById: 1,
    createdAt: new Date('2025-04-17T10:00:00Z'),
  },
  {
    id: 2,
    employeeIdOut: '555',
    employeeIdIn: '666',
    swapDate: new Date('2025-05-10'),
    paybackDate: new Date('2025-05-10'), // Mesmo dia -> Troca
    employeeFunction: 'COBRADOR',
    groupOut: 'FIXO_DOMINGO',
    groupIn: 'G1',
    eventType: 'TROCA',
    status: 'NAO_REALIZADA',
    submittedById: 2,
    createdAt: new Date('2025-04-18T09:30:00Z'),
  },
  {
    id: 3,
    employeeIdOut: '333',
    employeeIdIn: '444',
    swapDate: new Date('2025-05-17'),
    paybackDate: new Date('2025-05-25'),
    employeeFunction: 'MOTORISTA',
    groupOut: 'G2',
    groupIn: 'SAB_DOMINGO',
    eventType: 'SUBSTITUICAO',
    status: 'AGENDADO',
    submittedById: 1,
    createdAt: new Date('2025-04-18T10:15:00Z'),
  },
];

// --- Função Helper para Formatar Data (pode mover para /lib/utils.ts) ---
const formatDate = (date: Date | null | undefined) => {
  if (!date) return '-';
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// --- Componente da Página ---
export default function AdminDashboardPage() {
  return (
    // Usando Card para envolver a tabela (opcional)
    <Card>
      <CardHeader>
        <CardTitle>Dashboard do Administrador</CardTitle>
        <CardDescription>
          Visualização e gerenciamento das solicitações de troca e substituição
          de folgas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Componente Table do Shadcn/ui */}
        <Table>
          <TableHeader>
            <TableRow>
              {/* Definindo os Cabeçalhos das Colunas */}
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Sai (Crachá)</TableHead>
              <TableHead>Entra (Crachá)</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Data Troca</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Solicitante ID</TableHead>
              <TableHead>Criado Em</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
              {/* Coluna sem título visível */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapeando os dados fictícios para linhas da tabela */}
            {dummyRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.id}</TableCell>
                <TableCell>{req.employeeIdOut}</TableCell>
                <TableCell>{req.employeeIdIn}</TableCell>
                <TableCell>{req.employeeFunction}</TableCell>
                <TableCell>{formatDate(req.swapDate)}</TableCell>
                <TableCell>{formatDate(req.paybackDate)}</TableCell>
                <TableCell>
                  {/* Usando Badge para destacar o Tipo */}
                  <Badge
                    variant={
                      req.eventType === 'TROCA' ? 'secondary' : 'outline'
                    }
                  >
                    {req.eventType}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* Usando Badge para destacar o Status */}
                  <Badge
                    variant={
                      req.status === 'NAO_REALIZADA' ? 'destructive' : 'default'
                    }
                  >
                    {req.status}
                  </Badge>
                </TableCell>
                <TableCell>{req.submittedById}</TableCell>
                <TableCell>{formatDate(req.createdAt)}</TableCell>
                <TableCell>
                  {/* Dropdown Menu como placeholder para futuras ações */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      {/* Itens de exemplo, sem funcionalidade ainda */}
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
