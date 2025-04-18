// apps/frontend/src/app/admin/dashboard/page.tsx - COM FILTRO CORRIGIDO
'use client';

// --- Imports (mantidos como estavam, garantindo useState) ---
import { ObservationDialog } from '@/components/admin/ObservationDialog';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
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
import { Label } from '@/components/ui/label'; // Import Label
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Import Select
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
} from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react'; // Garantir que useState está importado

// --- Funções de API Call (mantidas como estavam) ---

// Função fetchSwapRequests (JÁ CORRIGIDA para aceitar filtro)
async function fetchSwapRequests(
  statusFilter: SwapStatus | 'ALL'
): Promise<SwapRequest[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token não encontrado');
  }
  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests`;
  if (statusFilter !== 'ALL') {
    apiUrl += `?status=${statusFilter}`;
  }
  console.log(`>>> Fetching requests with URL: ${apiUrl}`);
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
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

// Função markRequestAsNotRealizedApi (mantida como estava)
interface MarkAsNotRealizedParams {
  requestId: number;
  token: string;
}
async function markRequestAsNotRealizedApi({
  requestId,
  token,
}: MarkAsNotRealizedParams): Promise<SwapRequest> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}/status`;
  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(errorData.message || 'Falha ao marcar como não realizada.');
  }
  const data = await response.json();
  return data.request;
}

// --- Componente Principal da Página ---
export default function AdminDashboardPage() {
  // Estado para o Dialog de Observação
  const [editingRequest, setEditingRequest] = useState<SwapRequest | null>(
    null
  );
  // *** ADICIONADO: Estado para o filtro de Status ***
  const [statusFilter, setStatusFilter] = useState<SwapStatus | 'ALL'>('ALL');
  const queryClient = useQueryClient();

  // Query para buscar as solicitações (agora usa statusFilter corretamente)
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<SwapRequest[], Error>({
    queryKey: ['adminSwapRequests', statusFilter], // A queryKey DEPENDE do filtro
    queryFn: () => fetchSwapRequests(statusFilter), // A queryFn PASSA o filtro
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error('Erro ao buscar dados da dashboard:', err);
    },
  });

  // Mutation para marcar como não realizada (mantida como estava)
  const markAsNotRealizedMutation = useMutation<SwapRequest, Error, number>({
    mutationFn: async (requestId) => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token não encontrado para mutação.');
      return markRequestAsNotRealizedApi({ requestId, token });
    },
    onSuccess: (updatedRequest) => {
      console.log('Status atualizado com sucesso para:', updatedRequest.status);
      queryClient.invalidateQueries({ queryKey: ['adminSwapRequests'] });
      alert('Solicitação marcada como Não Realizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao marcar como não realizada:', error);
      alert(`Erro: ${error.message}`);
    },
  });

  // Handler para marcar como não realizada (mantido como estava)
  const handleMarkAsNotRealized = (requestId: number) => {
    if (
      window.confirm(
        `Tem certeza que deseja marcar a solicitação ID ${requestId} como NÃO REALIZADA?`
      )
    ) {
      markAsNotRealizedMutation.mutate(requestId);
    }
  };

  // ----- Lógica de Renderização -----
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
          {/* *** ADICIONADO: Bloco do Select para filtro *** */}
          <div className="flex items-center gap-2 mb-4">
            <Label htmlFor="status-filter" className="shrink-0">
              Filtrar por Status:
            </Label>
            <Select
              value={statusFilter}
              onValueChange={(value: string) => {
                setStatusFilter(
                  value === 'ALL' ? 'ALL' : (value as SwapStatus)
                );
              }}
            >
              <SelectTrigger id="status-filter" className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                {Object.values(SwapStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* *** Fim do Bloco do Select *** */}

          {/* Lógica de Loading/Error/Table (mantida como estava) */}
          {isQueryLoading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {isError && (
            <div className="text-center p-4 text-destructive bg-destructive/10 rounded-md">
              Erro ao buscar solicitações:{' '}
              {error?.message || 'Erro desconhecido'}
            </div>
          )}
          {!isQueryLoading &&
            !isError &&
            (!requests || requests.length === 0) && (
              <div className="text-center p-4 text-muted-foreground">
                Nenhuma solicitação encontrada.
              </div>
            )}
          {!isQueryLoading && !isError && requests && requests.length > 0 && (
            <Table>
              <TableHeader>
                {/* ... */}
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
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              handleMarkAsNotRealized(req.id);
                            }}
                            disabled={
                              req.status === SwapStatus.NAO_REALIZADA ||
                              markAsNotRealizedMutation.isPending
                            }
                            className="text-red-600 focus:bg-red-100 focus:text-red-700"
                          >
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
