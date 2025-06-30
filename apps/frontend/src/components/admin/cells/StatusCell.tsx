// apps/frontend/src/components/admin/cells/StatusCell.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getStatusBadge } from '@/lib/badgeHelpers';
import { cn } from '@/lib/utils'; // Assume que getStatusBadgeClasses está em utils
import { SwapRequest, SwapStatus } from '@repo/shared-types';
import { UseMutationResult } from '@tanstack/react-query'; // Para tipar a prop mutation
import { CheckCircle, Loader2 } from 'lucide-react';

// Tipagem das props que o componente recebe
interface StatusCellProps {
  request: SwapRequest;
  // Recebe a função de update do componente pai
  onUpdateStatus: (
    requestId: number,
    currentStatus: SwapStatus,
    newStatus: SwapStatus
  ) => void;
  // Recebe o estado da mutação para feedback de loading/disabled
  mutation: UseMutationResult<
    SwapRequest,
    Error,
    { requestId: number; data: { status?: SwapStatus } }
  >;
}

export function StatusCell({
  request,
  onUpdateStatus,
  mutation,
}: StatusCellProps) {
  const req = request; // Alias para facilitar

  // Verifica se ESTA linha está sendo atualizada
  const isUpdatingThisRow =
    mutation.isPending &&
    mutation.variables?.requestId === req.id &&
    mutation.variables?.data.status !== undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm" // Tamanho do botão um pouco menor
          className={cn(
            'p-0 h-auto font-normal data-[state=open]:bg-muted',
            // Desabilita o trigger se alguma mutação estiver ocorrendo NESTA linha
            isUpdatingThisRow && 'opacity-50 cursor-not-allowed'
          )}
          disabled={isUpdatingThisRow} // Desabilita o botão
        >
          {getStatusBadge(req.status)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Mudar Status Para:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.values(SwapStatus).map((statusOption) => (
          <DropdownMenuItem
            key={statusOption}
            onSelect={(e) => {
              e.preventDefault(); // Prevenir comportamento padrão
              // Só chama o update se o status for diferente
              if (req.status !== statusOption) {
                onUpdateStatus(req.id, req.status, statusOption);
              }
            }}
            // Desabilita a opção se for o status atual ou se QUALQUER update estiver rodando
            disabled={req.status === statusOption || mutation.isPending}
            // Opcional: Adicionar estilo diferente para item selecionado/atual
            className={cn(req.status === statusOption && 'opacity-50')}
          >
            {/* Mostra loader se ESTA linha/status estiver sendo atualizado */}
            {isUpdatingThisRow &&
            mutation.variables?.data.status === statusOption ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              // Bolinha colorida para referência visual
              getStatusBadge(statusOption)
            )}
            {req.status === statusOption && (
              <CheckCircle className="ml-auto h-4 w-4 opacity-50" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
