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
    console.error('Erro ao formatar data:', e); // Adiciona um log de erro
    return 'Data inválida';
  }
};
