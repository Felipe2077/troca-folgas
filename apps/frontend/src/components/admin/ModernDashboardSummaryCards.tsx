// apps/frontend/src/components/admin/ModernDashboardSummaryCards.tsx
'use client';

import { RequestSummaryData } from '@repo/shared-types';
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface ModernDashboardSummaryCardsProps {
  summaryData: RequestSummaryData | undefined;
  isLoading: boolean;
}

export function ModernDashboardSummaryCards({
  summaryData,
  isLoading,
}: ModernDashboardSummaryCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-black/40 border border-yellow-500/20 animate-pulse"
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

  if (!summaryData) {
    return (
      <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-300 mb-2">
          Erro ao carregar dados
        </h3>
        <p className="text-red-400/80">
          Não foi possível carregar o resumo das solicitações.
        </p>
      </div>
    );
  }

  const totalRequests = Object.values(summaryData.byStatus || {}).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
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
              {summaryData.byStatus?.AGENDADO || 0}
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
              {summaryData.byStatus?.REALIZADO || 0}
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
              {summaryData.byStatus?.NAO_REALIZADA || 0}
            </div>
          </div>
          <h4 className="text-red-300 font-semibold mb-1">Não Realizada</h4>
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
              {summaryData.byStatus?.AGENDADO_ATRASADO || 0}
            </div>
          </div>
          <h4 className="text-orange-300 font-semibold mb-1">Atenção</h4>
          <p className="text-gray-400 text-sm">Agendados atrasados</p>
        </div>
      </div>

      {/* Card Solicitado */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
        <div className="relative p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <RefreshCw className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              {summaryData.byStatus?.SOLICITADO || 0}
            </div>
          </div>
          <h4 className="text-yellow-300 font-semibold mb-1">Solicitado</h4>
          <p className="text-gray-400 text-sm">Aguardando processamento</p>
        </div>
      </div>

      {/* Card Total */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
        <div className="relative p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white">{totalRequests}</div>
          </div>
          <h4 className="text-purple-300 font-semibold mb-1">Total</h4>
          <p className="text-gray-400 text-sm">Todas as solicitações</p>
        </div>
      </div>
    </div>
  );
}
