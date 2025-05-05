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
import { SwapEventType, SwapRequest, SwapStatus } from '@repo/shared-types'; // Importa tipos necessários
import { UseMutationResult } from '@tanstack/react-query'; // Tipagem da mutação
import { ArrowDown, ArrowUp, ArrowUpDown, Link2 } from 'lucide-react';

// Importa as novas células
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
      <TableHeader className="bg-neutral-50/30 ">
        <TableRow className="hover:bg-amber-900/10">
          <TableHead className="w-[60px] text-center">ID</TableHead>
          <TableHead className="w-[100px] text-center">Sai (Crachá)</TableHead>
          <TableHead className="w-[100px] text-center">
            Entra (Crachá)
          </TableHead>
          <TableHead className="w-[120px] text-center">Função</TableHead>
          <TableHead className="w-[130px] text-center">
            <Button
              variant="ghost"
              onClick={() => handleSort('swapDate')}
              className="justify-start px-0 text-center"
            >
              Data Troca {renderSortIcon('swapDate')}
            </Button>
          </TableHead>
          <TableHead className="w-[130px] text-center">
            <Button
              variant="ghost"
              onClick={() => handleSort('paybackDate')}
              className=" justify-start px-0 text-center"
            >
              Data Pagamento {renderSortIcon('paybackDate')}
            </Button>
          </TableHead>
          <TableHead className="w-[150px] text-center">Grupo Sai</TableHead>
          <TableHead className="w-[150px] text-center">Grupo Entra</TableHead>
          <TableHead className="w-[120px] text-center">Tipo</TableHead>
          <TableHead className="w-[120px] text-center">Status</TableHead>
          <TableHead>Observação</TableHead>
          <TableHead className="w-[130px] text-center">
            <Button
              variant="ghost"
              onClick={() => handleSort('createdAt')}
              className="justify-start text-center"
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
                {req.isMirror && (
                  <Link2 className="h-3 w-3 mr-1.5 text-muted-foreground flex-shrink-0" /> // Ícone antes do ID se for espelho
                )}
                {req.id}
              </div>
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
