// apps/frontend/src/app/admin/dashboard/page.tsx - COM FILTRO E ORDENAÇÃO
'use client';

// --- Imports ---
import { ObservationDialog } from '@/components/admin/ObservationDialog';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Role, SwapRequest, SwapStatus } from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// Imports de ícones (Loader2 já estava, adiciona os de seta)
import { RequestsTable } from '@/components/admin/RequestsTable';
import { Loader2 } from 'lucide-react'; // <-- MODIFICADO: Adiciona ícones de seta
import { useState } from 'react'; // <-- MODIFICADO: Importa React explicitamente se precisar de Fragments <>
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

// --- Tipos Específicos da Página ---
// Define as colunas que permitiremos ordenar (baseado no schema Zod do backend)
type SortableColumn = 'createdAt' | 'swapDate' | 'paybackDate' | 'id'; // <-- ADICIONADO: Tipo para colunas ordenáveis

// --- Funções de API Call ---

// Função fetchSwapRequests (MODIFICADA para usar sortBy/sortOrder corretamente)
async function fetchSwapRequests(
  statusFilter: SwapStatus | 'ALL',
  dateRange: DateRange | undefined,
  sortBy: SortableColumn,
  sortOrder: 'asc' | 'desc',
  token: string | null // <-- Precisa do token
): Promise<SwapRequest[]> {
  if (!token) {
    console.warn('fetchSwapRequests chamado sem token');
    return [];
  } // Retorna vazio se não tiver token

  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests`;
  const queryParams = new URLSearchParams();
  if (statusFilter !== 'ALL') {
    queryParams.append('status', statusFilter);
  }
  if (dateRange?.from) {
    queryParams.append(
      'startDate',
      dateRange.from.toISOString().substring(0, 10)
    );
  } // Envia só YYYY-MM-DD
  if (dateRange?.to) {
    queryParams.append('endDate', dateRange.to.toISOString().substring(0, 10));
  } // Envia só YYYY-MM-DD
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);

  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }
  console.log(`>>> Fetching requests with URL: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    /*...*/ throw new Error('Falha ao buscar solicitações.');
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
  // Estados existentes
  const [editingRequest, setEditingRequest] = useState<SwapRequest | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<SwapStatus | 'ALL'>('ALL');
  // ADICIONADO: Estados para ordenação
  const [sortColumn, setSortColumn] = useState<SortableColumn>('createdAt'); // Padrão: createdAt
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Padrão: desc
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const queryClient = useQueryClient();

  interface SwapRequestUpdateData {
    status?: SwapStatus;
    observation?: string | null;
  }
  interface UpdateRequestParams {
    requestId: number;
    data: SwapRequestUpdateData;
    token: string;
  }
  // Função que chama a API PATCH unificada
  async function updateRequestApi({
    requestId,
    data,
    token,
  }: UpdateRequestParams): Promise<SwapRequest> {
    if (!token) throw new Error('Token não fornecido para updateRequestApi');
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}`;
    console.log(`>>> [updateRequestApi] PATCH ${apiUrl} with data:`, data);
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(
      `>>> [updateRequestApi] Fetch response status: ${response.status}`
    );
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: `Erro ${response.status}` }));
      throw new Error(errorData.message || 'Falha ao atualizar solicitação.');
    }
    const responseData = await response.json();
    if (!responseData.request)
      throw new Error("Resposta da API inválida (sem 'request')");
    return responseData.request;
  }

  // Mutação para ATUALIZAR (Status ou Observação)
  const updateRequestMutation = useMutation<
    SwapRequest,
    Error,
    { requestId: number; data: SwapRequestUpdateData }
  >({
    mutationFn: ({ requestId, data }) => {
      if (!token) throw new Error('Token não encontrado para mutação.');
      // Chama a função de API genérica
      return updateRequestApi({ requestId, data, token });
    },
    onSuccess: (updatedRequest, variables) => {
      // Mensagem específica se foi mudança de status
      if (variables.data.status) {
        toast.success(
          `Status da solicitação ${variables.requestId} atualizado para ${variables.data.status}!`
        );
      }
      // Poderia adicionar outra para observação se quisesse
      queryClient.invalidateQueries({ queryKey: ['adminSwapRequests'] }); // Invalida sempre para garantir
      // Se o dialog de observação estiver aberto e for esta request, fecha? Ou deixa aberto?
      // if (editingRequest?.id === variables.requestId) { setEditingRequest(null); }
    },
    onError: (error) => {
      console.error('Erro ao atualizar solicitação:', error);
      toast.error(error.message || 'Erro ao atualizar solicitação.');
    },
  });

  // Handler específico para mudança de Status (chamado pelo DropdownMenuItem)
  const handleStatusUpdate = (
    requestId: number,
    currentStatus: SwapStatus,
    newStatus: SwapStatus
  ) => {
    // Não faz nada se clicar no status atual
    if (currentStatus === newStatus) return;
    console.log(
      `[handleStatusUpdate] Preparando para chamar mutate com requestId: ${requestId}, newStatus: ${newStatus}`
    );

    console.log(
      `Updating request ${requestId} status from ${currentStatus} to ${newStatus}`
    );
    // Chama a mutação genérica passando apenas o campo status
    updateRequestMutation.mutate({ requestId, data: { status: newStatus } });
  };
  const { token, user: loggedInUser } = useAuth();

  // Query para buscar as solicitações (MODIFICADA queryKey e queryFn)
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<SwapRequest[], Error>({
    queryKey: [
      'adminSwapRequests',
      statusFilter,
      dateRange,
      sortColumn,
      sortDirection,
    ],
    queryFn: () =>
      fetchSwapRequests(
        statusFilter,
        dateRange,
        sortColumn,
        sortDirection,
        token
      ), // Passa token
    enabled: !!token, // Só roda se tiver token
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error('Erro ao buscar dados da dashboard:', err);
    },
  });

  // ADICIONADO: Handler para trocar a ordenação
  const handleSort = (column: SortableColumn) => {
    // Se clicou na mesma coluna, inverte a direção
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // Se clicou em outra coluna, define como a nova coluna e usa ordem padrão (desc)
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // ----- Lógica de Renderização -----
  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card>
        <CardHeader>
          <CardTitle className="md:text-2xl pb-2">
            Dashboard do Administrador
          </CardTitle>
          <CardDescription>
            Visualização e gerenciamento das solicitações de troca e
            substituição de folgas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Bloco do Select para filtro (mantido como estava) */}
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

          {/* Lógica de Loading/Error/Table */}
          {isQueryLoading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {isError && (
            <div className="text-center p-4 text-destructive bg-destructive/10 rounded-md">
              Erro ao buscar solicitações
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
            <RequestsTable
              requests={requests}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              updateRequestMutation={updateRequestMutation} // Passa o objeto da mutação
              handleSort={handleSort}
              handleStatusUpdate={handleStatusUpdate}
              handleEditObservation={setEditingRequest} // Passa setEditingRequest diretamente
            />
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
