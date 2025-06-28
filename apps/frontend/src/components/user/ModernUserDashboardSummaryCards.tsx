// apps/frontend/src/components/user/ModernUserDashboardSummaryCards.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { RequestSummaryData, SwapStatus } from '@repo/shared-types';
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, startOfMonth } from 'date-fns';
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react';

interface ModernUserDashboardSummaryCardsProps {
  selectedMonth: string; // Formato 'yyyy-MM'
}

export function ModernUserDashboardSummaryCards({
  selectedMonth,
}: ModernUserDashboardSummaryCardsProps) {
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery<
    RequestSummaryData,
    Error
  >({
    queryKey: ['userRequestSummary', selectedMonth],
    queryFn: async () => {
      const [year, month] = selectedMonth.split('-').map(Number);
      const startDate = startOfMonth(new Date(year, month - 1));
      const endDate = endOfMonth(new Date(year, month - 1));

      const queryParams = new URLSearchParams();
      queryParams.append('swapDateStart', startDate.toISOString());
      queryParams.append('swapDateEnd', endDate.toISOString());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests/summary/user?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar resumo das solicitações.');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-gray-800/40 border border-gray-700/50 animate-pulse"
          >
            <div className="p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-700/50 rounded-xl">
                  <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
                </div>
                <div className="w-8 h-8 bg-gray-700/50 rounded"></div>
              </div>
              <div className="w-24 h-4 bg-gray-700/50 rounded mb-1"></div>
              <div className="w-32 h-3 bg-gray-700/50 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-300 mb-2">
          Erro ao carregar resumo
        </h3>
        <p className="text-red-400/80">{error?.message}</p>
      </div>
    );
  }

  const totalRequests = Object.values(data?.byStatus || {}).reduce(
    (sum, count) => sum + count,
    0
  );

  const pendingRequests =
    (data?.byStatus[SwapStatus.SOLICITADO] || 0) +
    (data?.byStatus[SwapStatus.AGENDADO] || 0);
  const completedRequests = data?.byStatus[SwapStatus.REALIZADO] || 0;
  const failedRequests = data?.byStatus[SwapStatus.NAO_REALIZADA] || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
        <div className="relative p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <BarChart3 className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white">{totalRequests}</div>
          </div>
          <h4 className="text-yellow-300 font-semibold mb-1">
            Total de Solicitações
          </h4>
          <p className="text-gray-400 text-sm">Todas as suas solicitações</p>
        </div>
      </div>

      {/* Pending Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-600/5 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
        <div className="relative p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Clock className="h-6 w-6 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              {pendingRequests}
            </div>
          </div>
          <h4 className="text-orange-300 font-semibold mb-1">
            Solicitadas/Agendadas
          </h4>
          <p className="text-gray-400 text-sm">Aguardando realização</p>
        </div>
      </div>

      {/* Completed Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
        <div className="relative p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              {completedRequests}
            </div>
          </div>
          <h4 className="text-green-300 font-semibold mb-1">Realizadas</h4>
          <p className="text-gray-400 text-sm">Concluídas com sucesso</p>
        </div>
      </div>

      {/* Failed Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
        <div className="relative p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <AlertCircle className="h-6 w-6 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              {failedRequests}
            </div>
          </div>
          <h4 className="text-red-300 font-semibold mb-1">Não Realizadas</h4>
          <p className="text-gray-400 text-sm">Exigem atenção</p>
        </div>
      </div>
    </div>
  );
}
