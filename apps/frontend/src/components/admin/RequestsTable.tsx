// apps/frontend/src/components/admin/RequestsTable.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { SwapEventType, SwapRequest, SwapStatus } from '@repo/shared-types'; // Importa tipos necessários
import { UseMutationResult } from '@tanstack/react-query'; // Tipagem da mutação
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

// Importa as novas células
import { ActionsCell } from './cells/ActionsCell';
import { ObservationCell } from './cells/ObservationCell';
import { StatusCell } from './cells/StatusCell';

// Tipo para a coluna de ordenação (definido na página também)
type SortableColumn = 'createdAt' | 'swapDate' | 'paybackDate' | 'id';

// Tipo para dados de atualização (definido na página também)
interface SwapRequestUpdateData {
  status?: SwapStatus;
  observation?: string | null;
}

// Props do componente Tabela
interface RequestsTableProps {
  requests: SwapRequest[];
  sortColumn: SortableColumn;
  sortDirection: 'asc' | 'desc';
  updateRequestMutation: UseMutationResult<
    SwapRequest,
    Error,
    { requestId: number; data: SwapRequestUpdateData }
  >;
  handleSort: (column: SortableColumn) => void;
  handleStatusUpdate: (
    requestId: number,
    currentStatus: SwapStatus,
    newStatus: SwapStatus
  ) => void;
  handleEditObservation: (request: SwapRequest) => void;
}

export function RequestsTable({
  requests,
  sortColumn,
  sortDirection,
  updateRequestMutation,
  handleSort,
  handleStatusUpdate,
  handleEditObservation,
}: RequestsTableProps) {
  // Helper local para renderizar ícone de ordenação
  const renderSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Sai (Crachá)</TableHead>
          <TableHead>Entra (Crachá)</TableHead>
          <TableHead>Função</TableHead>
          {/* Data Troca Ordenável */}
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('swapDate')}
              className="px-1"
            >
              Data Troca {renderSortIcon('swapDate')}
            </Button>
          </TableHead>
          {/* Data Pagamento Ordenável */}
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('paybackDate')}
              className="px-1"
            >
              Data Pagamento {renderSortIcon('paybackDate')}
            </Button>
          </TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Observação</TableHead>
          {/* Criado Em Ordenável */}
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort('createdAt')}
              className="px-1"
            >
              Criado Em {renderSortIcon('createdAt')}
            </Button>
          </TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
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
                    : 'default'
                }
              >
                {req.eventType}
              </Badge>
            </TableCell>
            {/* Célula de Status usa o componente StatusCell */}
            <TableCell>
              <StatusCell
                request={req}
                onUpdateStatus={handleStatusUpdate}
                mutation={updateRequestMutation}
              />
            </TableCell>
            {/* Célula de Observação usa o componente ObservationCell */}
            <TableCell
              // Ação de clique agora está na célula
              onClick={() => handleEditObservation(req)}
              // Muda cursor e adiciona feedback visual no hover
              className="cursor-pointer group" // Adiciona 'group' para hover no filho se necessário
              // Tooltip
              title={
                req.observation
                  ? 'Clique para editar observação'
                  : 'Clique para adicionar observação'
              }
              // Acessibilidade para teclado
              role="button" // Informa que se comporta como botão
              tabIndex={0} // Permite focar com Tab
              onKeyDown={(e) => {
                // Permite ativar com Enter ou Espaço
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); // Previne scroll da página com Espaço
                  handleEditObservation(req);
                }
              }}
              aria-label={
                req.observation ? 'Editar observação' : 'Adicionar observação'
              } // Label para leitor de tela
            >
              {/* Renderiza a célula de conteúdo (agora apenas visual) */}
              {/* Adiciona um hover no texto filho quando a célula pai (group) está hover */}
              <ObservationCell
                request={req}
                className="group-hover:text-primary group-hover:underline"
              />
            </TableCell>
            <TableCell>{formatDate(req.createdAt)}</TableCell>
            {/* Célula de Ações usa o componente ActionsCell */}
            <TableCell>
              <ActionsCell request={req} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
