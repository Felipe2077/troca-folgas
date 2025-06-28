// src/components/admin/SummaryCards.tsx
import { RequestSummaryData } from '@repo/shared-types';
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  RefreshCw,
} from 'lucide-react';

interface SummaryCardsProps {
  summaryData: RequestSummaryData | undefined;
}

export const SummaryCards = ({ summaryData }: SummaryCardsProps) => {
  console.log('DADOS DO RESUMO RECEBIDOS:', summaryData);

  if (!summaryData) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-8">
      {/* Card 1: Solicitado (CORRIGIDO) */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-300 text-xs font-medium">Solicitado</p>
            <p className="text-2xl font-bold text-white">
              {/* Adicionado '|| 0' para garantir que 0 seja exibido se o valor for nulo ou indefinido */}
              {summaryData.byStatus.SOLICITADO || 0}
            </p>
          </div>
          <Clock className="h-6 w-6 text-yellow-400" />
        </div>
      </div>

      {/* Card 2: Agendado */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-xs font-medium">Agendado</p>
            <p className="text-2xl font-bold text-white">
              {summaryData.byStatus.AGENDADO || 0}
            </p>
          </div>
          <Calendar className="h-6 w-6 text-blue-400" />
        </div>
      </div>

      {/* Card 3: Realizado */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-300 text-xs font-medium">Realizado</p>
            <p className="text-2xl font-bold text-white">
              {summaryData.byStatus.REALIZADO || 0}
            </p>
          </div>
          <CheckCircle2 className="h-6 w-6 text-green-400" />
        </div>
      </div>

      {/* Card 4: Não Realizado */}
      <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-300 text-xs font-medium">Não Realizado</p>
            <p className="text-2xl font-bold text-white">
              {summaryData.byStatus.NAO_REALIZADA || 0}
            </p>
          </div>
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
      </div>

      {/* Card 5: Atenção: Agend. Atrasado */}
      <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-300 text-xs font-medium">
              Atenção: Agend. Atrasado
            </p>
            <p className="text-2xl font-bold text-white">
              {summaryData.attention.scheduledPastDue || 0}
            </p>
          </div>
          <AlertCircle className="h-6 w-6 text-orange-400" />
        </div>
      </div>

      {/* Card 6: Total Trocas */}
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-xs font-medium">Total Trocas</p>
            <p className="text-2xl font-bold text-white">
              {summaryData.byType.TROCA || 0}
            </p>
          </div>
          <BarChart3 className="h-6 w-6 text-purple-400" />
        </div>
      </div>

      {/* Card 7: Total Substituições */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cyan-300 text-xs font-medium">
              Total Substituições
            </p>
            <p className="text-2xl font-bold text-white">
              {summaryData.byType.SUBSTITUICAO || 0}
            </p>
          </div>
          <RefreshCw className="h-6 w-6 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
