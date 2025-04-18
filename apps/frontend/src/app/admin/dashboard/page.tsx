// apps/frontend/src/app/admin/dashboard/page.tsx - CORRIGIDO
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Role,
  SwapEventType,
  SwapRequest,
  SwapStatus,
} from '@repo/shared-types'; // Import Role aqui também
import { useQuery } from '@tanstack/react-query';
import { Loader2, MoreHorizontal } from 'lucide-react';
// useRouter não é mais necessário AQUI para o redirect de auth
// useAuth não é mais necessário AQUI diretamente, pois ProtectedRoute o usa
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'; // Importa proteção
import { formatDate } from '@/lib/utils';

// Função fetchSwapRequests continua a mesma
async function fetchSwapRequests(): Promise<SwapRequest[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token não encontrado');
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(
      errorData.message || `Falha ao buscar solicitações (${response.status})`
    );
  }
  const data = await response.json();
  return data.requests || [];
}

// --- Componente da Página ---
export default function AdminDashboardPage() {
  // Os hooks agora rodam *dentro* do contexto protegido, mas useQuery só é
  // habilitado implicitamente se ProtectedRoute renderizar este conteúdo.
  // A verificação de 'isAdmin' é feita pelo ProtectedRoute.
  const {
    data: requests,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<SwapRequest[], Error>({
    queryKey: ['adminSwapRequests'],
    queryFn: fetchSwapRequests,
    refetchOnWindowFocus: false,
    // A opção 'enabled' não é mais estritamente necessária aqui,
    // pois o ProtectedRoute impede a renderização se não for Admin.
    // Mas pode manter como dupla garantia se quiser:
    // enabled: !!useAuth().user && useAuth().user.role === Role.ADMINISTRADOR (precisaria chamar useAuth() aqui)
    // Vamos remover por simplicidade por enquanto.
    onError: (err) => {
      console.error('Erro ao buscar dados da dashboard:', err);
      // NENHUM REDIRECT AQUI
    },
  });

  return (
    // ProtectedRoute é o PRIMEIRO elemento retornado, envolvendo todo o resto
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      {/* O conteúdo SÓ é renderizado se ProtectedRoute permitir */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard do Administrador</CardTitle>
          <CardDescription>
            Visualização e gerenciamento das solicitações de troca e
            substituição de folgas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Lógica de Loading/Error/Data agora dentro do conteúdo protegido */}
          {isQueryLoading && (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {isError && (
            <div className="text-center p-4 text-destructive bg-destructive/10 rounded-md">
              Erro ao buscar solicitações:{' '}
              {error?.message || 'Erro desconhecido'}
            </div>
          )}

          {!isQueryLoading &&
            !isError &&
            (!requests || requests.length === 0) && (
              <div className="text-center p-4 text-muted-foreground">
                Nenhuma solicitação encontrada.
              </div>
            )}

          {!isQueryLoading && !isError && requests && requests.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Sai (Crachá)</TableHead>
                  <TableHead>Entra (Crachá)</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Data Troca</TableHead>
                  <TableHead>Data Pagamento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Observação</TableHead>
                  <TableHead>Criado Em</TableHead>
                  <TableHead>
                    <span className="sr-only">Ações</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.id}</TableCell>
                    <TableCell>{req.employeeIdOut}</TableCell>
                    <TableCell>{req.employeeIdIn}</TableCell>
                    <TableCell>{req.employeeFunction}</TableCell>
                    <TableCell>{formatDate(req.swapDate)}</TableCell>
                    <TableCell>{formatDate(req.paybackDate)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.eventType === SwapEventType.TROCA
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {req.eventType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.status === SwapStatus.NAO_REALIZADA
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-normal max-w-[250px]">
                      {req.observation || '-'}
                    </TableCell>
                    <TableCell>{formatDate(req.createdAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        {/* ... Dropdown ... */}
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-neutral-900 "
                        >
                          <DropdownMenuLabel className="border-b">
                            Ações
                          </DropdownMenuLabel>
                          <DropdownMenuItem className="m-1.5">
                            Adicionar/Ver Observação
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Marcar como Não Realizada
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
