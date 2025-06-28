// apps/frontend/src/app/(app)/admin/dashboard/page.tsx - VERSÃO MODERNIZADA COMPLETA
'use client';

import { RequestsTable } from '@/components/admin/AdminRequestsTable';
import { ObservationDialog } from '@/components/admin/ObservationDialog';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/daterangepicker';
import { Input } from '@/components/ui/input';
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
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  Loader2,
  LogOut,
  RefreshCw,
  Settings,
  Tag,
  Users,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

interface SwapRequestUpdateData {
  status?: SwapStatus;
  observation?: string | null;
}

// Função para buscar vigências administrativas
async function fetchAdminVigencias(token: string | null): Promise<string[]> {
  if (!token) return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/vigencias`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error('Erro ao buscar vigências.');
  return response.json();
}

// Função para buscar resumo de dados
async function fetchSummaryData(
  token: string | null,
  selectedVigencia: string
): Promise<RequestSummaryData> {
  if (!token) throw new Error('Token não disponível');

  const queryParams = new URLSearchParams();
  if (selectedVigencia !== 'ALL') {
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

export default function ModernAdminDashboardPage() {
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    token,
    logout,
  } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Estados para filtros - TODOS OS FILTROS ORIGINAIS
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

  // Estados para ordenação
  const [sortColumn, setSortColumn] = useState<SortableSwapRequestColumn>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Estados para modais
  const [observationDialogOpen, setObservationDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SwapRequest | null>(
    null
  );

  // Proteção de rota
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
  const { data: summaryData, isLoading: isLoadingSummary } = useQuery<
    RequestSummaryData,
    Error
  >({
    queryKey: ['adminSummary', selectedVigencia],
    queryFn: () => fetchSummaryData(token, selectedVigencia),
    enabled: !!token && !!user,
  });

  // Query para requests
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<{ requests: SwapRequest[] }, Error>({
    queryKey: [
      'adminRequests',
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

      if (statusFilter !== 'ALL') {
        queryParams.append('status', statusFilter);
      }
      if (employeeIdOutFilter) {
        queryParams.append('employeeIdOut', employeeIdOutFilter);
      }
      if (employeeIdInFilter) {
        queryParams.append('employeeIdIn', employeeIdInFilter);
      }
      if (employeeFunctionFilter !== 'ALL') {
        queryParams.append('employeeFunction', employeeFunctionFilter);
      }
      if (groupOutFilter !== 'ALL') {
        queryParams.append('groupOut', groupOutFilter);
      }
      if (groupInFilter !== 'ALL') {
        queryParams.append('groupIn', groupInFilter);
      }
      if (eventTypeFilter !== 'ALL') {
        queryParams.append('eventType', eventTypeFilter);
      }
      if (swapDateRange?.from) {
        queryParams.append('swapDateStart', swapDateRange.from.toISOString());
      }
      if (swapDateRange?.to) {
        queryParams.append('swapDateEnd', swapDateRange.to.toISOString());
      }
      if (paybackDateRange?.from) {
        queryParams.append(
          'paybackDateStart',
          paybackDateRange.from.toISOString()
        );
      }
      if (paybackDateRange?.to) {
        queryParams.append('paybackDateEnd', paybackDateRange.to.toISOString());
      }

      queryParams.append('sortBy', sortColumn);
      queryParams.append('sortOrder', sortDirection);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar solicitações.');
      }

      return response.json();
    },
    enabled: !!token,
  });

  // Update request mutation
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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Handler para logout
  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
    router.push('/login');
  };

  // Handler para mudança de vigência
  const handleVigenciaChange = (vigencia: string) => {
    setSelectedVigencia(vigencia);
  };

  // Sorting handlers
  const handleSort = (column: SortableSwapRequestColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // Status update handler
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

  // Observation edit handler
  const handleEditObservation = (request: SwapRequest) => {
    setSelectedRequest(request);
    setObservationDialogOpen(true);
  };

  // Clear filters
  const clearFilters = () => {
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

  // Wrapper functions for date ranges
  const setSwapDateRangeWrapper = (range: DateRange | undefined) => {
    setSwapDateRange(range);
  };

  const setPaybackDateRangeWrapper = (range: DateRange | undefined) => {
    setPaybackDateRange(range);
  };

  // Estados de loading
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
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-50 overflow-auto">
        {/* Header */}
        <header className="border-b border-gray-700/30 bg-gray-900/60 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                <h1 className="text-xl font-bold text-white">
                  Troca de Folgas
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-2 hover:bg-gray-700/30 px-3 py-2 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-none">
          {/* Welcome Section */}
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

            {/* Vigência Selector */}
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
                  <SelectValue placeholder="Selecione um mês..." />
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
                      {vigencia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Cards - MODERNOS COM CORES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {/* Card Agendado */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
              <div className="relative p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Clock className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {summaryData?.byStatus?.AGENDADO || 0}
                  </div>
                </div>
                <h4 className="text-blue-300 font-semibold mb-1">Agendado</h4>
                <p className="text-gray-400 text-sm">Solicitações agendadas</p>
              </div>
            </div>

            {/* Card Realizado */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
              <div className="relative p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {summaryData?.byStatus?.REALIZADO || 0}
                  </div>
                </div>
                <h4 className="text-green-300 font-semibold mb-1">Realizado</h4>
                <p className="text-gray-400 text-sm">Concluídas com sucesso</p>
              </div>
            </div>

            {/* Card Não Realizada */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
              <div className="relative p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-500/20 rounded-xl">
                    <AlertCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {summaryData?.byStatus?.NAO_REALIZADA || 0}
                  </div>
                </div>
                <h4 className="text-red-300 font-semibold mb-1">
                  Não Realizada
                </h4>
                <p className="text-gray-400 text-sm">Requer atenção</p>
              </div>
            </div>

            {/* Card Agendado Atrasado */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-600/5 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
              <div className="relative p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl">
                    <AlertTriangle className="h-6 w-6 text-orange-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {summaryData?.byStatus?.AGENDADO_ATRASADO || 0}
                  </div>
                </div>
                <h4 className="text-orange-300 font-semibold mb-1">
                  Atenção: Agend. Atrasado
                </h4>
                <p className="text-gray-400 text-sm">Agendados atrasados</p>
              </div>
            </div>

            {/* Card Total Trocas */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
              <div className="relative p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {summaryData?.byEventType?.TROCA || 0}
                  </div>
                </div>
                <h4 className="text-purple-300 font-semibold mb-1">
                  Total Trocas
                </h4>
                <p className="text-gray-400 text-sm">Eventos de troca</p>
              </div>
            </div>

            {/* Card Total Substituições */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
              <div className="relative p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-cyan-500/20 rounded-xl">
                    <RefreshCw className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {summaryData?.byEventType?.SUBSTITUICAO || 0}
                  </div>
                </div>
                <h4 className="text-cyan-300 font-semibold mb-1">
                  Total Substituições
                </h4>
                <p className="text-gray-400 text-sm">Eventos de substituição</p>
              </div>
            </div>
          </div>

          {/* Filters - TODOS OS FILTROS ORIGINAIS COM UI MODERNA */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-6 w-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Filtros</h3>
              </div>
              <Button
                onClick={clearFilters}
                variant="outline"
                size="sm"
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 hover:border-red-500/50 transition-all duration-200"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-2xl">
              {/* Uma única linha horizontal de filtros */}
              <div className="flex flex-wrap items-end gap-4">
                {/* Status Filter */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Tag className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">Status:</Label>
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) =>
                      setStatusFilter(
                        value === 'ALL' ? 'ALL' : (value as SwapStatus)
                      )
                    }
                  >
                    <SelectTrigger className="h-8 w-[110px] bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem
                        value="ALL"
                        className="text-white hover:bg-gray-700"
                      >
                        Todos
                      </SelectItem>
                      {Object.values(SwapStatus).map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="text-white hover:bg-gray-700"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Employee ID Out Filter */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">Crachá Sai:</Label>
                  </div>
                  <Input
                    placeholder="Crachá..."
                    value={employeeIdOutFilter}
                    onChange={(e) => setEmployeeIdOutFilter(e.target.value)}
                    className="h-8 w-[110px] bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-500/50"
                  />
                </div>

                {/* Employee ID In Filter */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">
                      Crachá Entra:
                    </Label>
                  </div>
                  <Input
                    placeholder="Crachá..."
                    value={employeeIdInFilter}
                    onChange={(e) => setEmployeeIdInFilter(e.target.value)}
                    className="h-8 w-[110px] bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-500/50"
                  />
                </div>

                {/* Function Filter */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Settings className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">Função:</Label>
                  </div>
                  <Select
                    value={employeeFunctionFilter}
                    onValueChange={(value) =>
                      setEmployeeFunctionFilter(
                        value === 'ALL' ? 'ALL' : (value as EmployeeFunction)
                      )
                    }
                  >
                    <SelectTrigger className="h-8 w-[110px] bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50">
                      <SelectValue placeholder="Função" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem
                        value="ALL"
                        className="text-white hover:bg-gray-700"
                      >
                        Todas
                      </SelectItem>
                      {Object.values(EmployeeFunction).map((func) => (
                        <SelectItem
                          key={func}
                          value={func}
                          className="text-white hover:bg-gray-700"
                        >
                          {func}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Event Type Filter */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <RefreshCw className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">Tipo:</Label>
                  </div>
                  <Select
                    value={eventTypeFilter}
                    onValueChange={(value) =>
                      setEventTypeFilter(
                        value === 'ALL' ? 'ALL' : (value as SwapEventType)
                      )
                    }
                  >
                    <SelectTrigger className="h-8 w-[110px] bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem
                        value="ALL"
                        className="text-white hover:bg-gray-700"
                      >
                        Todos
                      </SelectItem>
                      {Object.values(SwapEventType).map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="text-white hover:bg-gray-700"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Group Out Filter */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">Grupo Sai:</Label>
                  </div>
                  <Select
                    value={groupOutFilter}
                    onValueChange={(value) =>
                      setGroupOutFilter(
                        value === 'ALL' ? 'ALL' : (value as ReliefGroup)
                      )
                    }
                  >
                    <SelectTrigger className="h-8 w-[110px] bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50">
                      <SelectValue placeholder="Grupo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem
                        value="ALL"
                        className="text-white hover:bg-gray-700"
                      >
                        Todos
                      </SelectItem>
                      {Object.values(ReliefGroup).map((group) => (
                        <SelectItem
                          key={group}
                          value={group}
                          className="text-white hover:bg-gray-700"
                        >
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Group In Filter */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">
                      Grupo Entra:
                    </Label>
                  </div>
                  <Select
                    value={groupInFilter}
                    onValueChange={(value) =>
                      setGroupInFilter(
                        value === 'ALL' ? 'ALL' : (value as ReliefGroup)
                      )
                    }
                  >
                    <SelectTrigger className="h-8 w-[110px] bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50">
                      <SelectValue placeholder="Grupo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem
                        value="ALL"
                        className="text-white hover:bg-gray-700"
                      >
                        Todos
                      </SelectItem>
                      {Object.values(ReliefGroup).map((group) => (
                        <SelectItem
                          key={group}
                          value={group}
                          className="text-white hover:bg-gray-700"
                        >
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range Filters */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">
                      Período Data Troca:
                    </Label>
                  </div>
                  <DateRangePicker
                    date={swapDateRange}
                    setDate={setSwapDateRangeWrapper}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-yellow-400" />
                    <Label className="text-xs text-gray-300">
                      Período Data Pagamento:
                    </Label>
                  </div>
                  <DateRangePicker
                    date={paybackDateRange}
                    setDate={setPaybackDateRangeWrapper}
                  />
                </div>

                {/* Botão Limpar */}
                <div className="flex items-end">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className="h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Limpar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Solicitações</h3>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <Button
                variant="outline"
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ['adminRequests'] })
                }
                className="bg-black/40 hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-300 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border-yellow-500/30 hover:border-yellow-500/50 flex-1 lg:flex-initial"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Atualizar</span>
              </Button>

              <Button
                variant="outline"
                className="bg-black/40 hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-300 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border-yellow-500/30 hover:border-yellow-500/50 flex-1 lg:flex-initial"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
            </div>
          </div>

          {/* Requests Table */}
          {isQueryLoading && (
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-yellow-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Carregando solicitações...
              </p>
            </div>
          )}

          {isError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <p className="text-red-400">
                Erro ao buscar solicitações:{' '}
                {error?.message || 'Erro desconhecido'}
              </p>
            </div>
          )}

          {!isQueryLoading && !isError && (
            <RequestsTable
              requests={requests?.requests || []}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              updateRequestMutation={updateRequestMutation}
              handleSort={handleSort}
              handleStatusUpdate={handleStatusUpdate}
              handleEditObservation={handleEditObservation}
            />
          )}

          {!isQueryLoading &&
            !isError &&
            (!requests?.requests || requests.requests.length === 0) && (
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8 text-center">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Nenhuma solicitação encontrada
                </h3>
                <p className="text-gray-500">
                  Nenhuma solicitação corresponde aos filtros aplicados.
                </p>
              </div>
            )}

          {/* Observation Dialog */}
          {selectedRequest && (
            <ObservationDialog
              open={observationDialogOpen}
              onOpenChange={setObservationDialogOpen}
              request={selectedRequest}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['adminRequests'] });
                setObservationDialogOpen(false);
                setSelectedRequest(null);
              }}
            />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
