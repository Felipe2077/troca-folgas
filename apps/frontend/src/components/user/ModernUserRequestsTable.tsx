// apps/frontend/src/components/user/ModernUserRequestsTable.tsx
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';
import { SwapEventType, SwapRequest, SwapStatus } from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endOfMonth, startOfMonth } from 'date-fns';
import {
  AlertTriangle,
  ArrowRightLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { getStatusBadge, getTypeBadge } from '@/lib/badgeHelpers';

interface ModernUserRequestsTableProps {
  submittedById: number;
  selectedMonth: string; // Formato 'yyyy-MM'
}

export function ModernUserRequestsTable({
  submittedById,
  selectedMonth,
}: ModernUserRequestsTableProps) {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  // Função para buscar as requisições
  const fetchRequests = async (
    statusFilter: SwapStatus[]
  ): Promise<SwapRequest[]> => {
    const queryParams = new URLSearchParams();
    statusFilter.forEach((status) =>
      queryParams.append('status', status.toString())
    );
    queryParams.append('submittedById', submittedById.toString());

    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    queryParams.append('swapDateStart', startDate.toISOString());
    queryParams.append('swapDateEnd', endDate.toISOString());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/requests?${queryParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar solicitações.');
    }
    const data = await response.json();
    return data.requests;
  };

  // Query para "Não Realizados"
  const {
    data: pendingRequests,
    isLoading: isLoadingPending,
    isError: isErrorPending,
    error: errorPending,
  } = useQuery<SwapRequest[], Error>({
    queryKey: ['userRequests', 'pending', submittedById, selectedMonth],
    queryFn: () => fetchRequests(['SOLICITADO', 'AGENDADO', 'NAO_REALIZADA']),
    enabled: activeTab === 'pending',
  });

  // Query para "Histórico"
  const {
    data: historyRequests,
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
    error: errorHistory,
  } = useQuery<SwapRequest[], Error>({
    queryKey: ['userRequests', 'history', submittedById, selectedMonth],
    queryFn: () => fetchRequests(['REALIZADO']),
    enabled: activeTab === 'history',
  });

  // Mutação para deletar requisição
  const deleteRequestMutation = useMutation({
    mutationFn: async (requestId: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar solicitação.');
      }
    },
    onSuccess: () => {
      toast.success('Solicitação deletada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoadingPending || isLoadingHistory) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
        <div className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Carregando solicitações...</p>
        </div>
      </div>
    );
  }

  if (isErrorPending || isErrorHistory) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-300 mb-2">
          Erro ao carregar solicitações
        </h3>
        <p className="text-red-400/80">
          {(errorPending || errorHistory)?.message}
        </p>
      </div>
    );
  }

  const currentRequests =
    activeTab === 'pending' ? pendingRequests : historyRequests;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/40 backdrop-blur-sm p-1 rounded-xl border border-gray-700/50 w-full sm:w-auto">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 sm:flex-initial px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            activeTab === 'pending'
              ? 'bg-gray-700/80 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Não Realizados</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 sm:flex-initial px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            activeTab === 'history'
              ? 'bg-gray-700/80 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/40'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Histórico</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-gray-700/50 bg-gray-800/50">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-400" />
            <h4 className="text-lg font-semibold text-white">
              {activeTab === 'pending'
                ? 'Solicitações Não Realizadas'
                : 'Histórico de Solicitações'}
            </h4>
          </div>
        </div>

        {/* Content */}
        {!currentRequests || currentRequests.length === 0 ? (
          <div className="text-center py-12">
            {activeTab === 'pending' ? (
              <>
                <Clock className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Nenhuma solicitação pendente
                </h3>
                <p className="text-gray-500">
                  Suas solicitações não realizadas aparecerão aqui.
                </p>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Nenhuma solicitação realizada
                </h3>
                <p className="text-gray-500">
                  Suas solicitações realizadas aparecerão aqui.
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Mobile: Card View */}
            <div className="block sm:hidden">
              <div className="p-4 space-y-4">
                {currentRequests.map((request, index) => (
                  <div
                    key={request.id}
                    className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/30 hover:bg-gray-800/80 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-400">
                          ID
                        </span>
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
                      {activeTab === 'pending' && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-800/95 backdrop-blur-sm border-gray-700/50 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Confirmar Exclusão
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-300">
                                Esta ação não pode ser desfeita. Isso deletará
                                permanentemente a solicitação de troca ID{' '}
                                {request.id}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  deleteRequestMutation.mutate(request.id)
                                }
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Deletar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/60">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      ID
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Sai (Crachá)
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Entra (Crachá)
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Data Troca
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Data Pagamento
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
                    {activeTab === 'pending' && (
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                        Ações
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request, index) => (
                    <tr
                      key={request.id}
                      className={`border-t border-gray-700/30 hover:bg-gray-800/40 transition-colors ${
                        index % 2 === 0 ? 'bg-gray-800/20' : 'bg-transparent'
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
                      <td className="px-6 py-4">
                        {getTypeBadge(request.eventType)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                        {request.observation || '-'}
                      </td>
                      {activeTab === 'pending' && (
                        <td className="px-6 py-4">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-800/95 backdrop-blur-sm border-gray-700/50 text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Confirmar Exclusão
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-300">
                                  Esta ação não pode ser desfeita. Isso deletará
                                  permanentemente a solicitação de troca ID{' '}
                                  {request.id}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    deleteRequestMutation.mutate(request.id)
                                  }
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Deletar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}