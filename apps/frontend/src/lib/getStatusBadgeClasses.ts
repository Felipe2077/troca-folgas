// apps/frontend/src/lib/getStatusBadgeClasses.ts
import { SwapStatus } from '@repo/shared-types';

export function getStatusBadgeClasses(status: SwapStatus): string {
  switch (status) {
    case SwapStatus.SOLICITADO:
      return 'bg-blue-500 text-white'; // Azul para solicitado
    case SwapStatus.AGENDADO:
      return 'bg-yellow-500 text-black'; // Amarelo para agendado
    case SwapStatus.REALIZADO:
      return 'bg-green-500 text-white'; // Verde para realizado
    case SwapStatus.NAO_REALIZADA:
      return 'bg-red-500 text-white'; // Vermelho para não realizada
    default:
      return 'bg-gray-500 text-white'; // Cinza para qualquer outro caso
  }
}
