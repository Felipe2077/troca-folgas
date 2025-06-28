// src/components/admin/ObservationDialog.tsx

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { SwapRequest } from '@repo/shared-types';
import { useEffect, useState } from 'react';

interface ObservationDialogProps {
  request: SwapRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (observation: string) => void;
}

export const ObservationDialog = ({
  request,
  open,
  onOpenChange,
  onSave,
}: ObservationDialogProps) => {
  // Estado interno APENAS para o conteúdo do textarea
  const [observation, setObservation] = useState('');

  // Este useEffect garante que o texto no modal seja atualizado
  // sempre que uma nova solicitação for selecionada.
  useEffect(() => {
    if (open && request) {
      setObservation(request.observation || '');
    } else {
      // Limpa o texto quando o modal é fechado, para não mostrar dados antigos
      setObservation('');
    }
  }, [open, request]);

  const handleSave = () => {
    // A função onSave que vem da página principal é chamada
    onSave(observation);
    // Não fechamos o modal aqui. A página principal fará isso no 'onSuccess'.
  };

  // O componente Dialog do shadcn/ui já gerencia o estado de abertura
  // corretamente através das props 'open' e 'onOpenChange'.
  // Não precisamos de um estado de 'open' interno aqui.

  if (!request) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Editar Observação</DialogTitle>
          <DialogDescription>
            Adicione ou edite a observação para a solicitação ID: {request.id}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            id="observation"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="col-span-3 bg-gray-800 border-gray-600 text-white"
            rows={4}
            placeholder="Digite a observação aqui..."
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
