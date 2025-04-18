// apps/frontend/src/app/admin/dashboard/page.tsx
'use client';

import { ObservationDialog } from '@/components/admin/ObservationDialog'; // Importa o Dialog
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'; // Importa proteção
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import {
  Role,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types'; // Import tipos
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; // Import hooks do React Query
import { Loader2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react'; // Import useState

// --- Funções de API Call (fora do componente para clareza) ---

// Função para buscar todas as solicitações (para useQuery)
async function fetchSwapRequests(): Promise<SwapRequest[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token não encontrado');
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(
      errorData.message || `Falha ao buscar solicitações (${response.status})`
    );
  }
  const data = await response.json();
  return data.requests || [];
}

// Interface para parâmetros da função de marcar como não realizada
interface MarkAsNotRealizedParams {
  requestId: number;
  token: string;
}

// Função que chama a API PATCH /status (para useMutation)
async function markRequestAsNotRealizedApi({
  requestId,
  token,
}: MarkAsNotRealizedParams): Promise<SwapRequest> {
  console.log(
    `>>> [markRequestAsNotRealizedApi] Tentando PATCH para ID: ${requestId}`
  ); // Log de depuração
  // ** CORRIGINDO A URL AQUI **
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}/status`;
  console.log(`>>> [markRequestAsNotRealizedApi] Fetching URL: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      // Não precisa de Content-Type ou body
    },
  });

  console.log(
    `>>> [markRequestAsNotRealizedApi] Fetch response status: ${response.status}`
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    console.error('>>> [markRequestAsNotRealizedApi] Fetch error:', errorData);
    throw new Error(errorData.message || 'Falha ao marcar como não realizada.');
  }
  const data = await response.json();
  return data.request; // Espera { request: ... }
}

// --- Componente Principal da Página ---
export default function AdminDashboardPage() {
  const [editingRequest, setEditingRequest] = useState<SwapRequest | null>(
    null
  );
  const queryClient = useQueryClient();

  // Query para buscar as solicitações
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<SwapRequest[], Error>({
    queryKey: ['adminSwapRequests'],
    queryFn: fetchSwapRequests,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error('Erro ao buscar dados da dashboard:', err);
    },
  });

  // ** MUTATION para marcar como não realizada (no nível correto) **
  const markAsNotRealizedMutation = useMutation<SwapRequest, Error, number>({
    // Resposta, Erro, Input (requestId)
    // mutationFn agora só precisa do ID, pega token e chama a função API
    mutationFn: async (requestId) => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token não encontrado para mutação.');
      return markRequestAsNotRealizedApi({ requestId, token }); // Chama a função externa
    },
    onSuccess: (updatedRequest) => {
      console.log('Status atualizado com sucesso para:', updatedRequest.status);
      queryClient.invalidateQueries({ queryKey: ['adminSwapRequests'] }); // Invalida para refetch
      alert('Solicitação marcada como Não Realizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao marcar como não realizada:', error);
      alert(`Erro: ${error.message}`);
    },
  });

  // ** HANDLER para o clique no menu (no nível correto) **
  const handleMarkAsNotRealized = (requestId: number) => {
    if (
      window.confirm(
        `Tem certeza que deseja marcar a solicitação ID ${requestId} como NÃO REALIZADA?`
      )
    ) {
      markAsNotRealizedMutation.mutate(requestId); // Dispara a mutação
    }
  };

  // ----- Lógica de Renderização -----

  // ProtectedRoute envolve tudo
  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard do Administrador</CardTitle>
          <CardDescription>
            Visualização e gerenciamento das solicitações de troca e
            substituição de folgas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Loading da Query */}
          {isQueryLoading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Erro da Query */}
          {isError && (
            <div className="text-center p-4 text-destructive bg-destructive/10 rounded-md">
              Erro ao buscar solicitações:{' '}
              {error?.message || 'Erro desconhecido'}
            </div>
          )}

          {/* Sem Dados */}
          {!isQueryLoading &&
            !isError &&
            (!requests || requests.length === 0) && (
              <div className="text-center p-4 text-muted-foreground">
                Nenhuma solicitação encontrada.
              </div>
            )}

          {/* Tabela com Dados */}
          {!isQueryLoading && !isError && requests && requests.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Sai (Crachá)</TableHead>
                  <TableHead>Entra (Crachá)</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Data Troca</TableHead>
                  <TableHead>Data Pagamento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Observação</TableHead>
                  <TableHead>Criado Em</TableHead>
                  <TableHead>
                    <span className="sr-only">Ações</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.id}</TableCell>
                    <TableCell>{req.employeeIdOut}</TableCell>
                    <TableCell>{req.employeeIdIn}</TableCell>
                    <TableCell>{req.employeeFunction}</TableCell>
                    <TableCell>{formatDate(req.swapDate)}</TableCell>
                    <TableCell>{formatDate(req.paybackDate)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.eventType === SwapEventType.TROCA
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {req.eventType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.status === SwapStatus.NAO_REALIZADA
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-normal max-w-[250px]">
                      {req.observation || '-'}
                    </TableCell>
                    <TableCell>{formatDate(req.createdAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => setEditingRequest(req)}
                          >
                            Adicionar/Ver Observação
                          </DropdownMenuItem>
                          {/* Item de Marcar como Não Realizada */}
                          <DropdownMenuItem
                            // Chama o handler CORRETO agora
                            onSelect={(e) => {
                              e.preventDefault();
                              handleMarkAsNotRealized(req.id);
                            }}
                            // Desabilita se já for NAO_REALIZADA ou se a mutação estiver rodando
                            disabled={
                              req.status === SwapStatus.NAO_REALIZADA ||
                              markAsNotRealizedMutation.isPending
                            }
                            className="text-red-600 focus:bg-red-100 focus:text-red-700"
                          >
                            {/* Feedback de loading específico para esta mutação/linha */}
                            {markAsNotRealizedMutation.isPending &&
                            markAsNotRealizedMutation.variables === req.id
                              ? 'Marcando...'
                              : 'Marcar como Não Realizada'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Renderização condicional do Dialog (inalterada) */}
      <ObservationDialog
        request={editingRequest}
        onOpenChange={(open) => {
          if (!open) {
            setEditingRequest(null);
          }
        }}
      />
    </ProtectedRoute>
  );
}
