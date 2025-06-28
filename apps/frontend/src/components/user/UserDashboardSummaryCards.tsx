// apps/frontend/src/components/user/UserDashboardSummaryCards.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { RequestSummaryData, SwapEventType, SwapStatus } from '@repo/shared-types';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { endOfMonth, startOfMonth } from 'date-fns'; // Importar helpers de data

interface UserDashboardSummaryCardsProps {
  selectedMonth: string; // Formato 'yyyy-MM'
}

export function UserDashboardSummaryCards({ selectedMonth }: UserDashboardSummaryCardsProps) {
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery<RequestSummaryData, Error>({
    queryKey: ['userRequestSummary', selectedMonth], // Adicionar selectedMonth ao queryKey
    queryFn: async () => {
      const [year, month] = selectedMonth.split('-').map(Number);
      const startDate = startOfMonth(new Date(year, month - 1)); // Mês é 0-indexed
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-gray-800 text-white animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carregando...</CardTitle>
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">---</div>
              <p className="text-xs text-muted-foreground">---</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-destructive">
        Erro ao carregar resumo: {error?.message}
      </div>
    );
  }

  const totalRequests = Object.values(data?.byStatus || {}).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="bg-gray-800 text-white border-l-4 border-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Solicitações</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRequests}</div>
          <p className="text-xs text-muted-foreground">Todas as suas solicitações</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white border-l-4 border-yellow-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solicitadas/Agendadas</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(data?.byStatus[SwapStatus.SOLICITADO] || 0) +
              (data?.byStatus[SwapStatus.AGENDADO] || 0)}
          </div>
          <p className="text-xs text-muted-foreground">Aguardando realização</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white border-l-4 border-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Realizadas</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.byStatus[SwapStatus.REALIZADO] || 0}
          </div>
          <p className="text-xs text-muted-foreground">Concluídas com sucesso</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 text-white border-l-4 border-red-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Não Realizadas</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.byStatus[SwapStatus.NAO_REALIZADA] || 0}
          </div>
          <p className="text-xs text-muted-foreground">Exigem atenção</p>
        </CardContent>
      </Card>
    </div>
  );
}
