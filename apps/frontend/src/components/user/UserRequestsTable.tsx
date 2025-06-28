// apps/frontend/src/components/user/UserRequestsTable.tsx
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
import { Badge } from '@/components/ui/badge'; // Importar Badge
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { getStatusBadgeClasses } from '@/lib/getStatusBadgeClasses'; // Importar a função
import { cn, formatDate } from '@/lib/utils';
import { SwapRequest, SwapStatus } from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { endOfMonth, startOfMonth } from 'date-fns'; // Importar helpers de data

interface UserRequestsTableProps {
  submittedById: number;
  selectedMonth: string; // Formato 'yyyy-MM'
}

export function UserRequestsTable({ submittedById, selectedMonth }: UserRequestsTableProps) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Estado para o filtro de status da aba
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

    // Adicionar filtros de data baseados no selectedMonth
    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = startOfMonth(new Date(year, month - 1)); // Mês é 0-indexed
    const endDate = endOfMonth(new Date(year, month - 1));

    queryParams.append('swapDateStart', startDate.toISOString());
    queryParams.append('swapDateEnd', endDate.toISOString());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/requests?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `[UserRequestsTable] API Error: ${errorData.message || response.statusText}`
      );
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
    queryKey: ['userRequests', 'pending', submittedById, selectedMonth], // Adicionar selectedMonth ao queryKey
    queryFn: () => fetchRequests(['SOLICITADO', 'AGENDADO', 'NAO_REALIZADA']),
    enabled: activeTab === 'pending', // Só busca se a aba estiver ativa
  });

  // Query para "Histórico"
  const {
    data: historyRequests,
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
    error: errorHistory,
  } = useQuery<SwapRequest[], Error>({
    queryKey: ['userRequests', 'history', submittedById, selectedMonth], // Adicionar selectedMonth ao queryKey
    queryFn: () => fetchRequests(['REALIZADO']),
    enabled: activeTab === 'history', // Só busca se a aba estiver ativa
  });

  // Mutação para deletar requisição
  const deleteRequestMutation = useMutation({
    mutationFn: async (requestId: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${requestId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao deletar solicitação.');
      }
    },
    onSuccess: () => {
      toast.success('Solicitação deletada com sucesso!');
      // Invalida as queries para re-buscar os dados
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoadingPending || isLoadingHistory) {
    return (
      <div className="text-center py-10">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" /> Carregando
        solicitações...
      </div>
    );
  }

  if (isErrorPending) {
    return (
      <div className="text-center py-10 text-destructive">
        Erro: {JSON.stringify(errorPending)}
      </div>
    );
  }
  if (isErrorHistory) {
    return (
      <div className="text-center py-10 text-destructive">
        Erro: {JSON.stringify(errorHistory)}
      </div>
    );
  }

  return (
    <Tabs
      value={activeTab}
      className="w-full"
      onValueChange={(value) => setActiveTab(value as 'pending' | 'history')}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pending">Não Realizados</TabsTrigger>
        <TabsTrigger value="history">Histórico</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <h2 className="text-2xl font-bold mb-4">Solicitações Não Realizadas</h2>
        {pendingRequests && pendingRequests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Sai (Crachá)</TableHead>
                <TableHead>Entra (Crachá)</TableHead>
                <TableHead>Data Troca</TableHead>
                <TableHead>Data Pagamento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Observação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.employeeIdOut}</TableCell>
                  <TableCell>{req.employeeIdIn}</TableCell>
                  <TableCell>{formatDate(req.swapDate)}</TableCell>
                  <TableCell>{formatDate(req.paybackDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        req.eventType === 'TROCA' ? 'secondary' : 'default'
                      }
                      className={cn(
                        req.eventType === 'TROCA'
                          ? 'bg-cyan-600'
                          : 'bg-teal-600/50'
                      )}
                    >
                      {req.eventType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(getStatusBadgeClasses(req.status))}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{req.observation || '-'}</TableCell>
                  <TableCell>
                    {/* Botão de Deleção Condicional */}
                    {(req.status === SwapStatus.SOLICITADO ||
                      req.status === SwapStatus.NAO_REALIZADA) && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 w-8 p-0"
                            disabled={deleteRequestMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Tem certeza que deseja deletar?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Isso deletará
                              permanentemente a solicitação de troca ID\
                              {req.id}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteRequestMutation.mutate(req.id)
                              }
                            >
                              Deletar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Nenhuma solicitação encontrada nesta categoria.
          </p>
        )}
      </TabsContent>
      <TabsContent value="history">
        <h2 className="text-2xl font-bold mb-4">Histórico de Solicitações</h2>
        {historyRequests && historyRequests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Sai (Crachá)</TableHead>
                <TableHead>Entra (Crachá)</TableHead>
                <TableHead>Data Troca</TableHead>
                <TableHead>Data Pagamento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Observação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.employeeIdOut}</TableCell>
                  <TableCell>{req.employeeIdIn}</TableCell>
                  <TableCell>{formatDate(req.swapDate)}</TableCell>
                  <TableCell>{formatDate(req.paybackDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        req.eventType === 'TROCA' ? 'secondary' : 'default'
                      }
                      className={cn(
                        req.eventType === 'TROCA'
                          ? 'bg-cyan-600'
                          : 'bg-teal-600/50'
                      )}
                    >
                      {req.eventType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(getStatusBadgeClasses(req.status))}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{req.observation || '-'}</TableCell>
                  <TableCell>
                    {/* No histórico, não há botão de deleção */}-
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Nenhuma solicitação encontrada nesta categoria.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}
