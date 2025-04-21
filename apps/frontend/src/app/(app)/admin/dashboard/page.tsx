// apps/frontend/src/app/admin/dashboard/page.tsx - COM FILTRO E ORDENAÇÃO
'use client';

// --- Imports ---
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, formatDate } from '@/lib/utils';
import {
  Role,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// Imports de ícones (Loader2 já estava, adiciona os de seta)
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Loader2,
  MoreHorizontal,
} from 'lucide-react'; // <-- MODIFICADO: Adiciona ícones de seta
import { useState } from 'react'; // <-- MODIFICADO: Importa React explicitamente se precisar de Fragments <>
import { toast } from 'sonner';

// --- Tipos Específicos da Página ---
// Define as colunas que permitiremos ordenar (baseado no schema Zod do backend)
type SortableColumn = 'createdAt' | 'swapDate' | 'paybackDate' | 'id'; // <-- ADICIONADO: Tipo para colunas ordenáveis

// --- Funções de API Call ---

// Função fetchSwapRequests (MODIFICADA para usar sortBy/sortOrder corretamente)
async function fetchSwapRequests(
  statusFilter: SwapStatus | 'ALL',
  sortBy: SortableColumn, // Recebe sortBy
  sortOrder: 'asc' | 'desc' // Recebe sortOrder
): Promise<SwapRequest[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token não encontrado');
  }

  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests`;
  const queryParams = new URLSearchParams();

  if (statusFilter !== 'ALL') {
    queryParams.append('status', statusFilter);
  }
  // *** MODIFICADO: Adiciona sortBy e sortOrder aos parâmetros ***
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);

  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  console.log(`>>> Fetching requests with URL: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'GET', // Certifica que o método GET está explícito (embora seja default)
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
  // Estados existentes
  const [editingRequest, setEditingRequest] = useState<SwapRequest | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<SwapStatus | 'ALL'>('ALL');
  // ADICIONADO: Estados para ordenação
  const [sortColumn, setSortColumn] = useState<SortableColumn>('createdAt'); // Padrão: createdAt
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc'); // Padrão: desc

  const queryClient = useQueryClient();

  // Query para buscar as solicitações (MODIFICADA queryKey e queryFn)
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<SwapRequest[], Error>({
    // Query key agora inclui filtro E ordenação
    queryKey: ['adminSwapRequests', statusFilter, sortColumn, sortDirection],
    // queryFn agora chama fetchSwapRequests passando filtro E ordenação
    queryFn: () => fetchSwapRequests(statusFilter, sortColumn, sortDirection),
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
      toast.success('Status da solicitação atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao marcar como não realizada:', error);
      toast.error(error.message || 'Erro ao marcar como não realizada.');
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
            <Table>
              <TableHeader className="bg-stone-800">
                <TableRow>
                  {/* Cabeçalhos - MODIFICADO 'Criado Em' */}
                  <TableHead className="w-[50px] text-base">ID</TableHead>
                  <TableHead className="text-base">Sai (Crachá)</TableHead>
                  <TableHead className="text-base">Entra (Crachá)</TableHead>
                  <TableHead className="text-base">Função</TableHead>
                  <TableHead className="text-base">Data Troca</TableHead>
                  {/* TODO: Tornar clicável depois */}
                  <TableHead className="text-base">Data Pagamento</TableHead>
                  <TableHead className="text-base">Tipo</TableHead>
                  <TableHead className="text-base">Status</TableHead>
                  <TableHead className="text-base">Observação</TableHead>
                  {/* MODIFICADO: Cabeçalho 'Criado Em' agora é um botão clicável */}
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('createdAt')}
                      className="px-1 text-base"
                    >
                      {/* Ajuste padding se necessário */}
                      Criado Em
                      {sortColumn === 'createdAt' ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        )
                      ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" /> // Opacidade menor se não ativo
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Ações</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Mapeamento dos dados (sem alteração aqui) */}
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
                        // variant={
                        //   req.eventType === SwapEventType.TROCA
                        //     ? 'secondary'
                        //     : 'outline'
                        // }
                        className={cn(
                          req.eventType === SwapEventType.TROCA
                            ? 'bg-blue-900'
                            : 'bg-amber-900'
                        )}
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
                    <TableCell className="whitespace-normal max-w-[350px] break-words">
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
                          <Separator className="mb-1" />
                          <DropdownMenuItem
                            onClick={() => setEditingRequest(req)}
                            className="cursor-pointer"
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
                            className="text-red-600 focus:bg-red-100 focus:text-red-700 cursor-pointer"
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
