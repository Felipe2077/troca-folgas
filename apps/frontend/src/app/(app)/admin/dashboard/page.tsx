'use client';

// ... (imports)
import { RequestsTable } from '@/components/admin/AdminRequestsTable';
import { DashboardFilters } from '@/components/admin/DashboardFilters';
import { ObservationDialog } from '@/components/admin/ObservationDialog';
import { SummaryCards } from '@/components/admin/SummaryCards';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import {
  EmployeeFunction,
  ReliefGroup,
  RequestSummaryData,
  Role,
  SortableSwapRequestColumn,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endOfMonth, startOfMonth } from 'date-fns';
import {
  AlertCircle,
  Calendar,
  FileText,
  Loader2,
  LogOut,
  ScrollText,
  Settings,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

// ... (interface e funções async de fetch)
interface SwapRequestUpdateData {
  status?: SwapStatus;
  observation?: string | null;
}

async function fetchAdminVigencias(token: string | null): Promise<string[]> {
  if (!token) return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests/vigencias/all`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error('Erro ao buscar vigências.');
  return response.json();
}

async function fetchSummaryData(
  token: string | null,
  selectedVigencia: string,
  swapDateRange?: DateRange
): Promise<RequestSummaryData> {
  if (!token) throw new Error('Token não disponível');

  const queryParams = new URLSearchParams();

  if (swapDateRange?.from) {
    queryParams.append('swapDateStart', swapDateRange.from.toISOString());
    if (swapDateRange.to) {
      queryParams.append('swapDateEnd', swapDateRange.to.toISOString());
    }
  } else if (selectedVigencia !== 'ALL') {
    const [year, month] = selectedVigencia.split('-').map(Number);
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));
    queryParams.append('swapDateStart', startDate.toISOString());
    queryParams.append('swapDateEnd', endDate.toISOString());
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests/summary?${queryParams.toString()}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) throw new Error('Erro ao buscar resumo.');
  return response.json();
}

export default function AdminDashboardPage() {
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    token,
    logout,
  } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Estados para filtros
  const [selectedVigencia, setSelectedVigencia] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<SwapStatus | 'ALL'>('ALL');
  const [swapDateRange, setSwapDateRange] = useState<DateRange | undefined>();
  const [paybackDateRange, setPaybackDateRange] = useState<
    DateRange | undefined
  >();
  const [employeeIdOutFilter, setEmployeeIdOutFilter] = useState<string>('');
  const [employeeIdInFilter, setEmployeeIdInFilter] = useState<string>('');
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

  // ... (estados de ordenação e modais)
  const [sortColumn, setSortColumn] = useState<SortableSwapRequestColumn>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [observationDialogOpen, setObservationDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SwapRequest | null>(
    null
  );

  // ... (useEffect de proteção de rota)
  useEffect(() => {
    if (
      !isAuthLoading &&
      (!isAuthenticated || user?.role !== Role.ADMINISTRADOR)
    ) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, user, router]);

  // Query para vigências
  const { data: adminVigencias, isLoading: isLoadingVigencias } = useQuery<
    string[],
    Error
  >({
    queryKey: ['adminVigencias'],
    queryFn: () => fetchAdminVigencias(token),
    enabled: !!token && !!user,
  });

  // Query para resumo
  const { data: summaryData } = useQuery<RequestSummaryData, Error>({
    queryKey: ['adminSummary', selectedVigencia, swapDateRange],
    queryFn: () => fetchSummaryData(token, selectedVigencia, swapDateRange),
    enabled: !!token && !!user,
  });

  // Query para a tabela de solicitações
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<{ requests: SwapRequest[] }, Error>({
    queryKey: [
      'adminRequests',
      selectedVigencia,
      statusFilter,
      swapDateRange,
      paybackDateRange,
      employeeIdOutFilter,
      employeeIdInFilter,
      employeeFunctionFilter,
      groupOutFilter,
      groupInFilter,
      eventTypeFilter,
      sortColumn,
      sortDirection,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      // ===============================================
      // INÍCIO DA LÓGICA DE FILTRO CORRIGIDA
      // ===============================================

      // Prioriza o DateRangePicker de "Data Troca" sobre a Vigência
      if (swapDateRange?.from) {
        queryParams.append('swapDateStart', swapDateRange.from.toISOString());
        // Incluímos a data final apenas se ela existir no intervalo
        if (swapDateRange.to) {
          queryParams.append('swapDateEnd', swapDateRange.to.toISOString());
        }
      } else if (selectedVigencia !== 'ALL') {
        // Se o DateRangePicker estiver vazio, usa a Vigência como fallback
        const [year, month] = selectedVigencia.split('-').map(Number);
        const startDate = startOfMonth(new Date(year, month - 1));
        const endDate = endOfMonth(new Date(year, month - 1));
        queryParams.append('swapDateStart', startDate.toISOString());
        queryParams.append('swapDateEnd', endDate.toISOString());
      }

      // O filtro de Data de Pagamento é independente e funciona da mesma forma
      if (paybackDateRange?.from) {
        queryParams.append(
          'paybackDateStart',
          paybackDateRange.from.toISOString()
        );
        if (paybackDateRange.to) {
          queryParams.append(
            'paybackDateEnd',
            paybackDateRange.to.toISOString()
          );
        }
      }

      // ===============================================
      // FIM DA LÓGICA DE FILTRO CORRIGIDA
      // ===============================================

      // Outros filtros...
      if (statusFilter !== 'ALL') queryParams.append('status', statusFilter);
      if (employeeIdOutFilter)
        queryParams.append('employeeIdOut', employeeIdOutFilter);
      if (employeeIdInFilter)
        queryParams.append('employeeIdIn', employeeIdInFilter);
      if (employeeFunctionFilter !== 'ALL')
        queryParams.append('employeeFunction', employeeFunctionFilter);
      if (groupOutFilter !== 'ALL')
        queryParams.append('groupOut', groupOutFilter);
      if (groupInFilter !== 'ALL') queryParams.append('groupIn', groupInFilter);
      if (eventTypeFilter !== 'ALL')
        queryParams.append('eventType', eventTypeFilter);

      queryParams.append('sortBy', sortColumn);
      queryParams.append('sortOrder', sortDirection);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests?${queryParams.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar solicitações.');
      }

      return response.json();
    },
    enabled: !!token,
  });

  // ... (mutation, useMemo, handlers e o resto do componente)
  const updateRequestMutation = useMutation({
    mutationFn: async ({
      requestId,
      data,
    }: {
      requestId: number;
      data: SwapRequestUpdateData;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao atualizar solicitação.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRequests'] });
      queryClient.invalidateQueries({ queryKey: ['adminSummary'] });
      toast.success('Solicitação atualizada com sucesso!');
      setObservationDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const mergedSummaryData = useMemo(() => {
    if (!summaryData) return undefined;
    const solicitedCountFromTable =
      requests?.requests?.filter((req) => req.status === SwapStatus.SOLICITADO)
        .length || 0;
    return {
      ...summaryData,
      byStatus: {
        ...summaryData.byStatus,
        SOLICITADO:
          solicitedCountFromTable + (summaryData.byStatus.SOLICITADO || 0),
      },
    };
  }, [summaryData, requests]);

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
    router.push('/login');
  };

  const handleVigenciaChange = (vigencia: string) => {
    setSelectedVigencia(vigencia);
  };

  const handleSort = (column: SortableSwapRequestColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const handleStatusUpdate = (
    requestId: number,
    currentStatus: SwapStatus,
    newStatus: SwapStatus
  ) => {
    updateRequestMutation.mutate({
      requestId,
      data: { status: newStatus },
    });
  };

  const handleEditObservation = (request: SwapRequest) => {
    setSelectedRequest(request);
    setObservationDialogOpen(true);
  };

  const clearFilters = () => {
    setSelectedVigencia('ALL');
    setStatusFilter('ALL');
    setSwapDateRange(undefined);
    setPaybackDateRange(undefined);
    setEmployeeIdOutFilter('');
    setEmployeeIdInFilter('');
    setEmployeeFunctionFilter('ALL');
    setGroupOutFilter('ALL');
    setGroupInFilter('ALL');
    setEventTypeFilter('ALL');
  };

  const formatVigenciaLabel = (vigencia: string) => {
    const [year, month] = vigencia.split('-');
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  if (isAuthLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-50 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== Role.ADMINISTRADOR) {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 z-50 overflow-auto">
        {/* TODO COMPONENTIZAR O HEADER PARA USAR EM OUTRAS ROTAS ADMIN */}
        <header className="border-b border-gray-700/30 bg-gray-900/60 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between">
              {/* Lado Esquerdo: Logo e Título (sem alteração) */}
              <div className="flex items-center space-x-3">
                <Image alt="logo" src="/logo.png" width={60} height={60} />
                <h1 className="text-xl font-bold text-white">
                  Troca de Folgas
                </h1>
              </div>

              {/* Lado Direito: Botões de Navegação e Ação */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                {/* Atalho para Configurações */}
                <button
                  onClick={() => router.push('/admin/settings')}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-700/30 hover:text-white cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Configurações</span>
                </button>

                {/* Atalho para Usuários */}
                <button
                  onClick={() => router.push('/admin/users')}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-700/30 hover:text-white cursor-pointer"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Usuários</span>
                </button>

                {/* Atalho para Log */}
                <button
                  onClick={() => router.push('/admin/audit-logs')}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-700/30 hover:text-white cursor-pointer"
                >
                  <ScrollText className="h-4 w-4" />
                  <span className="hidden sm:inline">Log</span>
                </button>

                {/* Botão de Sair */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-700/30 hover:text-white cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-none">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent mb-2">
                Dashboard do Administrador
              </h2>
              <p className="text-gray-400 text-lg">
                Bem-vindo,{' '}
                <span className="text-yellow-300 font-semibold">
                  {user?.name}
                </span>
                ! Visualize e gerencie as solicitações.
              </p>
            </div>

            <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm rounded-2xl p-3 border border-yellow-500/20">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <Label
                  htmlFor="vigencia-filter"
                  className="text-sm text-gray-300"
                >
                  Vigência:
                </Label>
              </div>
              <Select
                value={selectedVigencia}
                onValueChange={handleVigenciaChange}
                disabled={isLoadingVigencias}
              >
                <SelectTrigger
                  id="vigencia-filter"
                  className="h-10 w-[200px] bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                >
                  <SelectValue
                    placeholder={
                      isLoadingVigencias
                        ? 'Carregando...'
                        : 'Selecione um mês...'
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem
                    value="ALL"
                    className="text-white hover:bg-gray-700"
                  >
                    Todos os Períodos
                  </SelectItem>
                  {adminVigencias?.map((vigencia) => (
                    <SelectItem
                      key={vigencia}
                      value={vigencia}
                      className="text-white hover:bg-gray-700"
                    >
                      {formatVigenciaLabel(vigencia)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isLoadingVigencias && (
                <Loader2 className="h-4 w-4 animate-spin text-yellow-400" />
              )}
            </div>
          </div>

          <SummaryCards summaryData={mergedSummaryData} />

          <DashboardFilters
            clearFilters={clearFilters}
            employeeFunctionFilter={employeeFunctionFilter}
            employeeIdInFilter={employeeIdInFilter}
            employeeIdOutFilter={employeeIdOutFilter}
            eventTypeFilter={eventTypeFilter}
            groupInFilter={groupInFilter}
            groupOutFilter={groupOutFilter}
            paybackDateRange={paybackDateRange}
            setEmployeeFunctionFilter={setEmployeeFunctionFilter}
            setEmployeeIdInFilter={setEmployeeIdInFilter}
            setEmployeeIdOutFilter={setEmployeeIdOutFilter}
            setEventTypeFilter={setEventTypeFilter}
            setGroupInFilter={setGroupInFilter}
            setGroupOutFilter={setGroupOutFilter}
            setPaybackDateRange={setPaybackDateRange}
            setStatusFilter={setStatusFilter}
            setSwapDateRange={setSwapDateRange}
            statusFilter={statusFilter}
            swapDateRange={swapDateRange}
          />

          {/* ... (ActiveFilters, ResultsSection, ObservationDialog) */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-700/30 mt-8">
            <div className="p-6">
              {isQueryLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-400 mx-auto mb-4" />
                  <p className="text-gray-400">Carregando solicitações...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
                  <p className="text-red-400 mb-2">
                    Erro ao carregar solicitações
                  </p>
                  <p className="text-gray-500 text-sm">{error?.message}</p>
                </div>
              ) : !requests?.requests || requests.requests.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-8 w-8 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">
                    Nenhuma solicitação encontrada
                  </p>
                  <p className="text-gray-500 text-sm">
                    Tente ajustar os filtros ou verificar se há dados para o
                    período selecionado.
                  </p>
                </div>
              ) : (
                <RequestsTable
                  requests={requests.requests}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  updateRequestMutation={updateRequestMutation}
                  handleSort={handleSort}
                  handleStatusUpdate={handleStatusUpdate}
                  handleEditObservation={handleEditObservation}
                />
              )}
            </div>
          </div>
        </div>

        <ObservationDialog
          request={selectedRequest}
          open={observationDialogOpen}
          onOpenChange={setObservationDialogOpen}
          onSave={(observation) => {
            if (selectedRequest) {
              updateRequestMutation.mutate({
                requestId: selectedRequest.id,
                data: { observation },
              });
            }
          }}
        />
      </div>
    </ProtectedRoute>
  );
}
