// apps/frontend/src/components/admin/cells/ActionsCell.tsx
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
import { SwapRequest } from '@repo/shared-types';
import { MoreHorizontal } from 'lucide-react';

interface ActionsCellProps {
  request: SwapRequest;
  // Adicionar outras props de callback para ações futuras (ex: onDelete)
}

export function ActionsCell({ request }: ActionsCellProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        {/* Item de Observação foi removido daqui */}
        <DropdownMenuItem disabled>Editar Solicitação</DropdownMenuItem>{' '}
        {/* Placeholder */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" disabled>
          Excluir Solicitação
        </DropdownMenuItem>{' '}
        {/* Placeholder */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
