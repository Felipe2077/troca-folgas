// apps/frontend/src/components/admin/cells/ObservationCell.tsx - SIMPLIFICADO
'use client';

import { cn } from '@/lib/utils';
import { SwapRequest } from '@repo/shared-types';

interface ObservationCellProps {
  request: SwapRequest;
  className?: string; // <-- ADICIONA className opcional
}

export function ObservationCell({ request }: ObservationCellProps) {
  const hasObservation =
    request.observation && request.observation.trim() !== '';

  // Apenas retorna o texto com estilo condicional
  return (
    <span
      className={cn(
        // Mantém estilos de quebra e largura máxima
        'block whitespace-normal break-words max-w-[350px]',
        // Aplica estilo de texto esmaecido/itálico se não houver observação
        !hasObservation && 'text-muted-foreground italic'
      )}
    >
      {request.observation || '-'}
    </span>
  );
}
