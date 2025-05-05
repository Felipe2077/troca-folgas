// apps/frontend/src/components/admin/DashboardSummaryCards.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // Para estado de loading
import { cn } from '@/lib/utils';
import { RequestSummaryData } from '@repo/shared-types'; // Importa tipo
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MinusCircle,
  RefreshCw,
  Shuffle,
} from 'lucide-react'; // Ícones
import React from 'react';

interface DashboardSummaryCardsProps {
  summaryData: RequestSummaryData | undefined;
  isLoading: boolean;
}

// Componente interno para um Card individual (evita repetição)
const InfoCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  isLoading,
}: {
  title: string;
  value: number | string | undefined;
  icon: React.ElementType;
  colorClass?: string;
  isLoading: boolean;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn('h-4 w-4 text-muted-foreground', colorClass)} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-1/2" /> // Mostra Skeleton durante loading
        ) : (
          <div className={cn('text-2xl font-bold', colorClass)}>
            {value ?? '-'} {/* Mostra valor ou '-' se undefined */}
          </div>
        )}
        {/* Pode adicionar mais texto aqui se quiser (ex: % de mudança) */}
      </CardContent>
    </Card>
  );
};

export function DashboardSummaryCards({
  summaryData,
  isLoading,
}: DashboardSummaryCardsProps) {
  return (
    // Grid responsivo para os cards
    <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {/* Card Agendado */}
      <InfoCard
        title="Agendado"
        isLoading={isLoading}
        value={summaryData?.byStatus?.AGENDADO}
        icon={Clock}
        colorClass="text-blue-600" // Exemplo de cor
      />

      {/* Card Realizado */}
      <InfoCard
        title="Realizado"
        isLoading={isLoading}
        value={summaryData?.byStatus?.REALIZADO}
        icon={CheckCircle}
        colorClass="text-green-700" // Exemplo de cor
      />

      {/* Card Não Realizada */}
      <InfoCard
        title="Não Realizada"
        isLoading={isLoading}
        value={summaryData?.byStatus?.NAO_REALIZADA}
        icon={MinusCircle}
        colorClass="text-red-600" // Exemplo de cor (theme destructive?)
      />

      {/* Card Agendado Atrasado (Atenção) */}
      <InfoCard
        title="Atenção: Agend. Atrasado"
        isLoading={isLoading}
        value={summaryData?.attention?.scheduledPastDue}
        icon={AlertCircle}
        colorClass="text-amber-600" // Exemplo de cor
      />

      {/* Card Total Trocas */}
      <InfoCard
        title="Total Trocas"
        isLoading={isLoading}
        value={summaryData?.byType?.TROCA}
        icon={Shuffle} // Ícone exemplo
        // Sem cor específica
      />

      {/* Card Total Substituições */}
      <InfoCard
        title="Total Substituições"
        isLoading={isLoading}
        value={summaryData?.byType?.SUBSTITUICAO}
        icon={RefreshCw} // Ícone exemplo
        // Sem cor específica
      />
    </div>
  );
}
