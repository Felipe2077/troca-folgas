// apps/frontend/src/components/admin/cells/ObservationCell.tsx
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SwapRequest } from '@repo/shared-types';

interface ObservationCellProps {
  request: SwapRequest;
  onEdit: (request: SwapRequest) => void;
}

export function ObservationCell({ request, onEdit }: ObservationCellProps) {
  const hasObservation =
    request.observation && request.observation.trim() !== '';

  return (
    // Substitui div por Button estilizado
    <Button
      variant="ghost" // Faz parecer texto normal, sem fundo/borda visível
      onClick={() => onEdit(request)}
      title={
        hasObservation
          ? 'Clique para editar observação'
          : 'Clique para adicionar observação'
      }
      // Classes para alinhar como texto, permitir quebra, e dar feedback
      className={cn(
        'h-auto p-0 font-normal text-left justify-start whitespace-normal max-w-[350px] break-words', // Estilos base + quebra de linha
        !hasObservation && 'text-muted-foreground italic', // Estilo diferente se vazio
        'hover:underline hover:bg-transparent focus-visible:ring-1 focus-visible:ring-ring' // Feedback hover/focus
      )}
    >
      {request.observation || '-'} {/* Mostra observação ou '-' */}
    </Button>
  );
}
