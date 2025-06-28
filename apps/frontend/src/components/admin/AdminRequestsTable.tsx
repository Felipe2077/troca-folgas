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
import { cn, formatDate } from '@/lib/utils';
import {
  SortableSwapRequestColumn,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types'; // Importa tipos necessários
import { UseMutationResult } from '@tanstack/react-query'; // Tipagem da mutação
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

// Importa as novas células
import { ObservationCell } from './cells/ObservationCell';
import { StatusCell } from './cells/StatusCell';

// Tipo para a coluna de ordenação (definido na página também)

type SortableColumn = SortableSwapRequestColumn;

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
          {/* ID Ordenável */}
          <TableHead className="w-[60px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('id')}
              className="px-0 justify-start"
            >
              ID {renderSortIcon('id')}
            </Button>
          </TableHead>
          {/* Solicitante (Encarregado) */}
          <TableHead className="w-[150px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('submittedById')}
              className="px-0 justify-start"
            >
              Solicitante {renderSortIcon('submittedById')}
            </Button>
          </TableHead>
          {/* Crachá Sai Ordenável */}
          <TableHead className="w-[100px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('employeeIdOut')}
              className="px-0 justify-start"
            >
              Sai (Crachá) {renderSortIcon('employeeIdOut')}
            </Button>
          </TableHead>
          {/* Crachá Entra Ordenável */}
          <TableHead className="w-[100px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('employeeIdIn')}
              className="px-0 justify-start"
            >
              Entra (Crachá) {renderSortIcon('employeeIdIn')}
            </Button>
          </TableHead>
          {/* Função Ordenável */}
          <TableHead className="w-[120px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('employeeFunction')}
              className="px-0 justify-start"
            >
              Função {renderSortIcon('employeeFunction')}
            </Button>
          </TableHead>
          {/* Data Troca Ordenável */}
          <TableHead className="w-[130px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('swapDate')}
              className="px-0 justify-start"
            >
              Troca {renderSortIcon('swapDate')}
            </Button>
          </TableHead>
          {/* Data Pagamento Ordenável */}
          <TableHead className="w-[130px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('paybackDate')}
              className="px-0 justify-start"
            >
              Pagamento {renderSortIcon('paybackDate')}
            </Button>
          </TableHead>
          {/* Grupo Sai Ordenável */}
          <TableHead className="w-[150px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('groupOut')}
              className="px-0 justify-start"
            >
              Grupo Sai {renderSortIcon('groupOut')}
            </Button>
          </TableHead>
          {/* Grupo Entra Ordenável */}
          <TableHead className="w-[150px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('groupIn')}
              className="px-0 justify-start"
            >
              Grupo Entra {renderSortIcon('groupIn')}
            </Button>
          </TableHead>
          {/* Tipo Ordenável */}
          <TableHead className="w-[120px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('eventType')}
              className="px-0 justify-start"
            >
              Tipo {renderSortIcon('eventType')}
            </Button>
          </TableHead>
          {/* Status Ordenável */}
          <TableHead className="w-[120px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('status')}
              className="px-0 justify-start"
            >
              Status {renderSortIcon('status')}
            </Button>
          </TableHead>
          {/* Observação NÃO Ordenável */}
          <TableHead>Observação</TableHead>
          {/* Criado Em Ordenável */}
          <TableHead className="w-[130px]">
            <Button
              variant="ghost"
              onClick={() => handleSort('createdAt')}
              className="px-0 justify-start"
            >
              Criado Em {renderSortIcon('createdAt')}
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id} className={cn('hover:bg-muted/50')}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                {/* Usa flex para alinhar ícone e texto */}
                {req.id}
              </div>
            </TableCell>
            <TableCell className="text-center">
              {req.submittedBy?.name || req.submittedBy?.loginIdentifier || 'N/A'}
            </TableCell>
            <TableCell className="text-center">{req.employeeIdOut}</TableCell>
            <TableCell className="text-center">{req.employeeIdIn}</TableCell>
            <TableCell className="text-center">
              {req.employeeFunction}
            </TableCell>
            <TableCell className="text-center">
              {formatDate(req.swapDate)}
            </TableCell>
            <TableCell className="text-center">
              {formatDate(req.paybackDate)}
            </TableCell>
            <TableCell className="text-center">{req.groupOut}</TableCell>
            <TableCell className="text-center">{req.groupIn}</TableCell>
            <TableCell className="text-center">
              <Badge
                variant={
                  req.eventType === SwapEventType.TROCA
                    ? 'secondary'
                    : 'default'
                }
                className={
                  req.eventType === SwapEventType.TROCA
                    ? 'bg-cyan-600'
                    : 'bg-teal-600/50'
                }
              >
                {req.eventType}
              </Badge>
            </TableCell>
            {/* Célula de Status usa o componente StatusCell */}
            <TableCell className="text-center">
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
              className="cursor-pointer group px-4" // Adiciona 'group' para hover no filho se necessário
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
                className="group-hover:text-primary group-hover:underline text-center"
              />
            </TableCell>
            <TableCell className="text-center">
              {formatDate(req.createdAt)}
            </TableCell>
            {/* Célula de Ações usa o componente ActionsCell */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
