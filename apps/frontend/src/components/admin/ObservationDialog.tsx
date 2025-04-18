// apps/frontend/src/components/admin/ObservationDialog.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose, // Para botão de fechar/cancelar
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SwapRequest } from '@repo/shared-types'; // Importa tipo
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Tipos locais
interface ObservationDialogProps {
  request: SwapRequest | null; // Recebe a solicitação inteira ou null para fechar
  onOpenChange: (open: boolean) => void; // Função para controlar abertura/fechamento
}

interface UpdateObservationParams {
  requestId: number;
  observation: string | null;
  token: string;
}

// Função que chama a API PATCH
async function updateObservationApi({
  requestId,
  observation,
  token,
}: UpdateObservationParams): Promise<SwapRequest> {
  const response = await fetch(
    `<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_API\_URL\}/api/requests/</span>{requestId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        observation: observation === '' ? null : observation,
      }), // Envia null se string vazia
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(errorData.message || 'Falha ao atualizar observação.');
  }
  const data = await response.json();
  return data.request; // Assume que API retorna { request: SwapRequest }
}

export function ObservationDialog({
  request,
  onOpenChange,
}: ObservationDialogProps) {
  const [observationText, setObservationText] = useState('');
  const queryClient = useQueryClient(); // Hook para invalidar cache

  // Atualiza o texto no state local quando o 'request' (prop) mudar
  useEffect(() => {
    if (request) {
      setObservationText(request.observation || ''); // Usa '' se for null
    } else {
      setObservationText(''); // Limpa ao fechar
    }
  }, [request]);

  // Mutação para salvar a observação
  const mutation = useMutation<SwapRequest, Error, string | null>({
    // Resposta, Erro, Input (obs)
    mutationFn: async (newObservation) => {
      if (!request) throw new Error('Nenhuma solicitação selecionada.');
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token não encontrado.');

      return updateObservationApi({
        requestId: request.id,
        observation: newObservation,
        token,
      });
    },
    onSuccess: () => {
      console.log('Observação salva com sucesso!');
      // Invalida a query da dashboard para forçar refetch
      queryClient.invalidateQueries({ queryKey: ['adminSwapRequests'] });
      onOpenChange(false); // Fecha o dialog
      // TODO: Mostrar um Toast de sucesso
    },
    onError: (error) => {
      console.error('Erro ao salvar observação:', error);
      // TODO: Mostrar um Toast de erro
      alert(`Erro ao salvar: ${error.message}`); // Alert temporário
    },
  });

  const handleSave = () => {
    // Chama a mutação passando o texto atual do state
    mutation.mutate(observationText);
  };

  // Determina se o dialog deve estar aberto baseado na prop 'request'
  const isOpen = request !== null;

  return (
    // Controla a abertura/fechamento pelo estado do componente pai via onOpenChange
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Observação - Solicitação ID: {request?.id}</DialogTitle>
          <DialogDescription>
            Adicione ou edite a observação para esta solicitação. Clique em
            salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="observation-text" className="text-right">
              Observação
            </Label>
            <Textarea
              id="observation-text"
              value={observationText}
              onChange={(e) => setObservationText(e.target.value)}
              className="col-span-3 h-24" // Textarea maior
              disabled={mutation.isPending} // Desabilita enquanto salva
            />
          </div>
          {/* Mostra erro da mutação, se houver */}
          {mutation.isError && (
            <p className="text-sm font-medium text-destructive col-span-4 text-center">
              Erro: {mutation.error?.message || 'Ocorreu um erro.'}
            </p>
          )}
        </div>
        <DialogFooter>
          {/* Botão para fechar sem salvar */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
          </DialogClose>
          {/* Botão para salvar */}
          <Button
            type="button"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Salvando...' : 'Salvar Observação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
