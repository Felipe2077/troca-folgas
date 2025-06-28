// apps/frontend/src/components/admin/ModernAdminRequestsTable.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';
import {
  EmployeeFunction,
  ReliefGroup,
  SortableSwapRequestColumn,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowRightLeft,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Edit3,
  FileText,
  Loader2,
} from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

interface ModernAdminRequestsTableProps {
  statusFilter: SwapStatus | 'ALL';
  swapDateRange: DateRange | undefined;
  paybackDateRange: DateRange | undefined;
  employeeIdOutFilter: string;
  employeeIdInFilter: string;
  employeeFunctionFilter: EmployeeFunction | 'ALL';
  groupOutFilter: ReliefGroup | 'ALL';
  groupInFilter: ReliefGroup | 'ALL';
  eventTypeFilter: SwapEventType | 'ALL';
  sortColumn: SortableSwapRequestColumn;
  sortDirection: 'asc' | 'desc';
  setSortColumn: (column: SortableSwapRequestColumn) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  onEditObservation: (request: SwapRequest) => void;
  onOpenObservationDialog: () => void;
}

interface SwapRequestUpdateData {
  status?: SwapStatus;
  observation?: string | null;
}

export function ModernAdminRequestsTable({
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
  setSortColumn,
  setSortDirection,
  onEditObservation,
  onOpenObservationDialog,
}: ModernAdminRequestsTableProps) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Fetch requests with filters
  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useQuery<SwapRequest[], Error>({
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

      const data = await response.json();
      return data.requests;
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
      toast.success('Solicitação atualizada com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Sorting handlers
  const handleSort = (column: SortableSwapRequestColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (column: SortableSwapRequestColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 text-yellow-400" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-yellow-400" />
    );
  };

  // Status badge helper
  const getStatusBadge = (status: SwapStatus) => {
    const statusConfig = {
      [SwapStatus.SOLICITADO]: {
        color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        icon: Clock,
        label: 'Solicitado',
      },
      [SwapStatus.AGENDADO]: {
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        icon: Clock,
        label: 'Agendado',
      },
      [SwapStatus.REALIZADO]: {
        color: 'bg-green-500/20 text-green-400 border-green-500/30',
        icon: CheckCircle2,
        label: 'Realizado',
      },
      [SwapStatus.NAO_REALIZADA]: {
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        icon: AlertCircle,
        label: 'Não Realizada',
      },
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-lg border ${config.color} flex items-center space-x-1`}
      >
        <IconComponent className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  // Type badge helper
  const getTypeBadge = (type: SwapEventType) => {
    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-lg border ${
          type === SwapEventType.TROCA
            ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
            : 'bg-teal-500/20 text-teal-400 border-teal-500/30'
        } flex items-center space-x-1`}
      >
        <ArrowRightLeft className="h-3 w-3" />
        <span>{type}</span>
      </span>
    );
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
    onEditObservation(request);
    onOpenObservationDialog();
  };

  if (isLoading) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 overflow-hidden shadow-2xl">
        <div className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Carregando solicitações...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-300 mb-2">
          Erro ao carregar solicitações
        </h3>
        <p className="text-red-400/80">{error?.message}</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-8 text-center">
        <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          Nenhuma solicitação encontrada
        </h3>
        <p className="text-gray-500">
          Nenhuma solicitação corresponde aos filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-yellow-500/20 bg-black/50">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-yellow-400" />
          <h4 className="text-lg font-semibold text-white">
            Solicitações ({requests.length})
          </h4>
        </div>
      </div>

      {/* Mobile: Card View */}
      <div className="block lg:hidden">
        <div className="p-4 space-y-4">
          {requests.map((request, index) => (
            <div
              key={request.id}
              className="bg-black/60 rounded-xl p-4 border border-yellow-500/20 hover:bg-black/80 hover:border-yellow-500/30 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-400">ID</span>
                  <span className="text-white font-semibold">
                    #{request.id}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  {getTypeBadge(request.eventType)}
                  {getStatusBadge(request.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <span className="text-xs text-gray-400 block">
                    Sai (Crachá)
                  </span>
                  <span className="text-white font-medium">
                    {request.employeeIdOut}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">
                    Entra (Crachá)
                  </span>
                  <span className="text-white font-medium">
                    {request.employeeIdIn}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">
                    Data Troca
                  </span>
                  <span className="text-white">
                    {formatDate(request.swapDate)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">
                    Data Pagamento
                  </span>
                  <span className="text-white">
                    {formatDate(request.paybackDate)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-400 block">
                    Observação
                  </span>
                  <span className="text-sm text-gray-300">
                    {request.observation || '-'}
                  </span>
                </div>
                <button
                  onClick={() => handleEditObservation(request)}
                  className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors border border-yellow-500/30"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/60">
            <tr>
              <th
                className="text-left px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID
                  {renderSortIcon('id')}
                </div>
              </th>
              <th
                className="text-left px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => handleSort('employeeIdOut')}
              >
                <div className="flex items-center">
                  Sai (Crachá)
                  {renderSortIcon('employeeIdOut')}
                </div>
              </th>
              <th
                className="text-left px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => handleSort('employeeIdIn')}
              >
                <div className="flex items-center">
                  Entra (Crachá)
                  {renderSortIcon('employeeIdIn')}
                </div>
              </th>
              <th
                className="text-left px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => handleSort('swapDate')}
              >
                <div className="flex items-center">
                  Data Troca
                  {renderSortIcon('swapDate')}
                </div>
              </th>
              <th
                className="text-left px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => handleSort('paybackDate')}
              >
                <div className="flex items-center">
                  Data Pagamento
                  {renderSortIcon('paybackDate')}
                </div>
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                Tipo
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                Observação
              </th>
              <th
                className="text-left px-6 py-4 text-sm font-semibold text-gray-300 cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center">
                  Criado em
                  {renderSortIcon('createdAt')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className={`border-t border-yellow-500/10 hover:bg-yellow-500/5 transition-colors ${
                  index % 2 === 0 ? 'bg-black/20' : 'bg-transparent'
                }`}
              >
                <td className="px-6 py-4 text-white font-medium">
                  #{request.id}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {request.employeeIdOut}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {request.employeeIdIn}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {formatDate(request.swapDate)}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {formatDate(request.paybackDate)}
                </td>
                <td className="px-6 py-4">{getTypeBadge(request.eventType)}</td>
                <td className="px-6 py-4">
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        request.id,
                        request.status,
                        e.target.value as SwapStatus
                      )
                    }
                    disabled={updateRequestMutation.isPending}
                    className="bg-gray-800/50 border border-gray-600/50 text-white rounded-lg px-3 py-1 text-sm focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  >
                    {Object.values(SwapStatus).map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="bg-gray-800"
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditObservation(request)}
                    className="text-gray-300 hover:text-yellow-300 transition-colors text-sm max-w-xs truncate block"
                    title={
                      request.observation || 'Clique para adicionar observação'
                    }
                  >
                    {request.observation || 'Adicionar...'}
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm">
                  {formatDate(request.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
