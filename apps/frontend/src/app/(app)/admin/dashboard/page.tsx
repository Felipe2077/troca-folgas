// apps/frontend/src/app/(app)/admin/dashboard/page.tsx - COMPLETO COM FILTROS
'use client';

// --- Imports ---
import { DashboardFilters } from '@/components/admin/DashboardFilters'; // <-- Componente de Filtros
import { ObservationDialog } from '@/components/admin/ObservationDialog';
import { RequestsTable } from '@/components/admin/RequestsTable'; // <-- Componente da Tabela
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import {
  EmployeeFunction,
  ReliefGroup,
  Role,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react'; // Ícones
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

// --- Tipos Específicos ---
type SortableColumn = 'createdAt' | 'swapDate' | 'paybackDate' | 'id';
interface SwapRequestUpdateData {
  status?: SwapStatus;
  observation?: string | null;
}
interface UpdateRequestParams {
  requestId: number;
  data: SwapRequestUpdateData;
  token: string;
}

// --- Funções API ---
// Função fetchSwapRequests (aceita todos os filtros e ordenação)
async function fetchSwapRequests(
  statusFilter: SwapStatus | 'ALL',
  dateRange: DateRange | undefined,
  sortBy: SortableColumn,
  sortOrder: 'asc' | 'desc',
  employeeIdOut: string,
  employeeIdIn: string,
  employeeFunction: EmployeeFunction | 'ALL',
  groupOut: ReliefGroup | 'ALL',
  groupIn: ReliefGroup | 'ALL',
  eventType: SwapEventType | 'ALL',
  token: string | null
): Promise<SwapRequest[]> {
  if (!token) return [];
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
  }
  if (dateRange?.to) {
    queryParams.append('endDate', dateRange.to.toISOString().substring(0, 10));
  }
  if (employeeIdOut.trim()) {
    queryParams.append('employeeIdOut', employeeIdOut.trim());
  }
  if (employeeIdIn.trim()) {
    queryParams.append('employeeIdIn', employeeIdIn.trim());
  }
  if (employeeFunction !== 'ALL') {
    queryParams.append('employeeFunction', employeeFunction);
  }
  if (groupOut !== 'ALL') {
    queryParams.append('groupOut', groupOut);
  }
  if (groupIn !== 'ALL') {
    queryParams.append('groupIn', groupIn);
  }
  if (eventType !== 'ALL') {
    queryParams.append('eventType', eventType);
  }
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
    throw new Error('Falha ao buscar solicitações.');
  }
  const data = await response.json();
  return data.requests || [];
}

// Função updateRequestApi (para PATCH)
async function updateRequestApi({
  requestId,
  data,
  token,
}: UpdateRequestParams): Promise<SwapRequest> {
  // ... (código da função como na resposta #196, com a URL corrigida) ...
  if (!token) throw new Error('Token não fornecido para updateRequestApi');
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}`;
  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
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

// --- Componente Principal ---
export default function AdminDashboardPage() {
  // Estados para Filtros
  const [statusFilter, setStatusFilter] = useState<SwapStatus | 'ALL'>('ALL');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [employeeIdOutFilter, setEmployeeIdOutFilter] = useState('');
  const [employeeIdInFilter, setEmployeeIdInFilter] = useState('');
  const [employeeFunctionFilter, setEmployeeFunctionFilter] = useState<
    EmployeeFunction | 'ALL'
  >('ALL');
  const [groupOutFilter, setGroupOutFilter] = useState<ReliefGroup | 'ALL'>(
    'ALL'
  );
  const [groupInFilter, setGroupInFilter] = useState<ReliefGroup | 'ALL'>(
    'ALL'
  );
  const [eventTypeFilter, setEventTypeFilter] = useState<SwapEventType | 'ALL'>(
    'ALL'
  );

  // Estados para Ordenação
  const [sortColumn, setSortColumn] = useState<SortableColumn>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Estado para Dialog de Observação
  const [editingRequest, setEditingRequest] = useState<SwapRequest | null>(
    null
  );

  // Hooks
  const queryClient = useQueryClient();
  const { token, user: loggedInUser } = useAuth();

  // Query Principal (agora com todos os filtros e ordenação)
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<SwapRequest[], Error>({
    queryKey: [
      'adminSwapRequests',
      statusFilter,
      dateRange?.from?.toISOString(),
      dateRange?.to?.toISOString(),
      employeeIdOutFilter,
      employeeIdInFilter,
      employeeFunctionFilter,
      groupOutFilter,
      groupInFilter,
      eventTypeFilter,
      sortColumn,
      sortDirection,
    ],
    queryFn: () =>
      fetchSwapRequests(
        statusFilter,
        dateRange,
        sortColumn,
        sortDirection,
        employeeIdOutFilter,
        employeeIdInFilter,
        employeeFunctionFilter,
        groupOutFilter,
        groupInFilter,
        eventTypeFilter,
        token
      ),
    enabled: !!token,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error('Erro ao buscar dados da dashboard:', err);
    },
  });

  // Mutação para Atualizar Status/Observação (mantida)
  const updateRequestMutation = useMutation<
    SwapRequest,
    Error,
    { requestId: number; data: SwapRequestUpdateData }
  >({
    mutationFn: ({ requestId, data }) => {
      if (!token) throw new Error('Token não encontrado');
      return updateRequestApi({ requestId, data, token });
    },
    onSuccess: (updatedRequest, variables) => {
      if (variables.data.status) {
        toast.success(
          `Status da solicitação ${variables.requestId} atualizado!`
        );
      }
      if (variables.data.observation !== undefined) {
        toast.success(
          `Observação da solicitação ${variables.requestId} atualizada!`
        );
      } // Feedback para observação
      queryClient.invalidateQueries({ queryKey: ['adminSwapRequests'] });
      if (editingRequest?.id === variables.requestId) {
        setEditingRequest(null);
      } // Fecha dialog se aberto
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar solicitação.');
    },
  });

  // Handler para atualizar Status (mantido)
  const handleStatusUpdate = (
    requestId: number,
    currentStatus: SwapStatus,
    newStatus: SwapStatus
  ) => {
    if (currentStatus === newStatus || updateRequestMutation.isPending) return;
    updateRequestMutation.mutate({ requestId, data: { status: newStatus } });
  };

  // Handler para Ordenação (mantido)
  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard do Administrador</CardTitle>
          <CardDescription>
            Visualize e gerencie as solicitações.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Renderiza o Componente de Filtros passando todos os estados e setters */}
          <DashboardFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
            employeeIdOutFilter={employeeIdOutFilter}
            setEmployeeIdOutFilter={setEmployeeIdOutFilter}
            employeeIdInFilter={employeeIdInFilter}
            setEmployeeIdInFilter={setEmployeeIdInFilter}
            employeeFunctionFilter={employeeFunctionFilter}
            setEmployeeFunctionFilter={setEmployeeFunctionFilter}
            groupOutFilter={groupOutFilter}
            setGroupOutFilter={setGroupOutFilter}
            groupInFilter={groupInFilter}
            setGroupInFilter={setGroupInFilter}
            eventTypeFilter={eventTypeFilter}
            setEventTypeFilter={setEventTypeFilter}
          />

          {/* Lógica de Loading/Error */}
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
                Nenhuma solicitação encontrada para os filtros aplicados.
              </div>
            )}

          {/* Renderiza a Tabela Abstraída */}
          {!isQueryLoading && !isError && requests && requests.length > 0 && (
            <RequestsTable
              requests={requests}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              updateRequestMutation={updateRequestMutation} // Passa a mutação para as células
              handleSort={handleSort}
              handleStatusUpdate={handleStatusUpdate}
              handleEditObservation={setEditingRequest} // Passa o setter do dialog
            />
          )}
        </CardContent>
      </Card>

      {/* Dialog de Observação */}
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
