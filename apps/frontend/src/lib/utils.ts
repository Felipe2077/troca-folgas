import { SwapStatus } from '@repo/shared-types'; // Importa o enum
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Função formatDate
export const formatDate = (date: Date | null | undefined | string) => {
  if (!date) return '-';
  try {
    // Converte para Date se for string antes de formatar
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch (e) {
    console.error('Erro ao formatar data:', e);
    return 'Data inválida';
  }
};

export const getStatusBadgeClasses = (status: SwapStatus): string => {
  switch (status) {
    case SwapStatus.AGENDADO:
      // Azul/Padrão ou Cinza/Secundário? Vamos usar Secondary por enquanto.
      return 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80';
    case SwapStatus.REALIZADO:
      // Usando cores do Tailwind diretamente para Verde (ajuste se tiver no tema)
      return 'border-transparent bg-green-600 text-primary-foreground hover:bg-green-600/80';
    case SwapStatus.NAO_REALIZADA:
      // Usa a variante 'destructive' do tema
      return 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90';
    default:
      // Fallback para status desconhecido
      return 'border-transparent bg-muted text-muted-foreground';
  }
};
