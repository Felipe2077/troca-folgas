// apps/frontend/src/app/admin/users/page.tsx - COM ATIVAR/DESATIVAR FUNCIONAL
'use client';

// --- Imports ---
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// <-- ADDED/MODIFIED: Imports do Dropdown Menu -->
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, // Pode precisar se adicionar mais itens
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { Label } from '@/components/ui/label'; // Não usado aqui
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Não usado aqui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { cn, formatDate } from '@/lib/utils'; // formatDate já estava ok
import { PublicUser, Role } from '@repo/shared-types'; // Tipos ok
// <-- ADDED/MODIFIED: Imports do React Query e outros -->
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Ban,
  CheckCircle,
  Loader2,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-react'; // Adiciona ícones necessários
import Link from 'next/link';
import { toast } from 'sonner';

// --- Funções de API Call ---

// Função fetchUsers (mantida)
async function fetchUsers(token: string | null): Promise<PublicUser[]> {
  if (!token) throw new Error('Token não encontrado para buscar usuários.');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(errorData.message || 'Falha ao buscar usuários.');
  }
  const data = await response.json();
  return data.users || [];
}

// Interface para parâmetros (mantida)
interface ToggleUserStatusParams {
  userId: number;
  newStatus: boolean;
  token: string;
}

// Função que chama a API PATCH /users/:id/status (CORRIGIDA A URL)
async function toggleUserStatusApi({
  userId,
  newStatus,
  token,
}: ToggleUserStatusParams): Promise<PublicUser> {
  console.log(
    `>>> [toggleUserStatusApi] Tentando PATCH para ID: ${userId} com isActive: ${newStatus}`
  );
  // *** CORRIGIDO: URL com template literal correto ***
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/status`;
  console.log(`>>> [toggleUserStatusApi] Fetching URL: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json', // Adicionado Content-Type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive: newStatus }), // Envia o novo status no corpo
  });

  console.log(
    `>>> [toggleUserStatusApi] Fetch response status: ${response.status}`
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    console.error('>>> [toggleUserStatusApi] Fetch error:', errorData);
    throw new Error(
      errorData.message || 'Falha ao atualizar status do usuário.'
    );
  }
  const data = await response.json();
  if (!data.user) throw new Error("Resposta da API inválida (sem 'user')");
  return data.user;
}

// --- Componente Principal da Página ---
export default function AdminUsersPage() {
  const { token, user: loggedInUser } = useAuth(); // Pega token E usuário logado
  const queryClient = useQueryClient();

  // Query para buscar usuários (mantida)
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<PublicUser[], Error>({
    queryKey: ['adminUsersList'],
    queryFn: () => fetchUsers(token),
    enabled: !!token,
  });

  // <-- ADDED/MODIFIED: Mutação para ativar/desativar usuário -->
  const toggleStatusMutation = useMutation<
    PublicUser,
    Error,
    { userId: number; newStatus: boolean }
  >({
    mutationFn: ({ userId, newStatus }) => {
      // Não precisamos pegar o token aqui de novo, já temos do useAuth
      if (!token) throw new Error('Token não encontrado para mutação.');
      return toggleUserStatusApi({ userId, newStatus, token });
    },
    onSuccess: (updatedUser) => {
      toast.success(
        `Usuário ${updatedUser.name} foi ${updatedUser.isActive ? 'ativado' : 'desativado'} com sucesso!`
      );
      // Invalida a query da lista para atualizar a tabela
      queryClient.invalidateQueries({ queryKey: ['adminUsersList'] });
    },
    onError: (error) => {
      console.error('Erro ao atualizar status do usuário:', error);
      toast.error(error.message || 'Erro ao atualizar status.');
    },
  });

  // <-- ADDED/MODIFIED: Handler para o clique no menu -->
  const handleToggleStatus = (userToModify: PublicUser) => {
    const actionText = userToModify.isActive ? 'DESATIVAR' : 'ATIVAR';
    const newStatus = !userToModify.isActive;

    // Proteção extra na UI (backend também tem)
    if (loggedInUser?.id === userToModify.id) {
      toast.error('Você não pode ativar/desativar sua própria conta.');
      return;
    }

    if (
      window.confirm(
        `Tem certeza que deseja ${actionText} o usuário ${userToModify.name} (ID: ${userToModify.id})?`
      )
    ) {
      toggleStatusMutation.mutate({ userId: userToModify.id, newStatus });
    }
  };

  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Gerenciamento de Usuários</CardTitle>
            <CardDescription className="text-base mt-2 mb-4">
              Visualize e gerencie os usuários do sistema.
            </CardDescription>
          </div>
          <div>
            {/* Link para criar usuário (já estava correto) */}
            <Link href="/admin/users/new" passHref>
              <Button size="sm" className="ml-auto gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Criar Usuário
                </span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {isError && (
            <div className="text-center p-4 text-destructive bg-destructive/10 rounded-md">
              Erro ao buscar usuários: {error?.message || 'Erro desconhecido'}
            </div>
          )}
          {!isLoading && !isError && (!users || users.length === 0) && (
            <div className="text-center p-4 text-muted-foreground">
              Nenhum usuário encontrado.
            </div>
          )}

          {!isLoading && !isError && users && users.length > 0 && (
            <Table>
              <TableHeader className="bg-stone-800">
                <TableRow>
                  <TableHead className="w-[80px] text-base">ID</TableHead>
                  <TableHead className="text-base">Nome</TableHead>
                  <TableHead className="text-base">
                    Identificador Login
                  </TableHead>
                  <TableHead className="text-base">Role</TableHead>
                  {/* <-- Header Status Ativo --> */}
                  <TableHead className="text-base">Status Ativo</TableHead>
                  <TableHead className="text-base">Criado Em</TableHead>
                  <TableHead className="text-base">
                    <span className="sr-only">Ações</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium ">{user.id}</TableCell>
                    <TableCell className="">{user.name}</TableCell>
                    <TableCell className="">{user.loginIdentifier}</TableCell>
                    <TableCell className="">
                      <Badge
                        variant={
                          user.role === Role.ADMINISTRADOR
                            ? 'default'
                            : 'secondary'
                        }
                        // className="text-base"
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    {/* <-- ADDED/MODIFIED: Cell Status Ativo --> */}
                    <TableCell>
                      <Badge
                        variant={user.isActive ? 'outline' : 'destructive'}
                        className={cn(
                          user.isActive && 'border-green-500 text-green-600'
                        )}
                      >
                        {user.isActive ? 'Sim' : 'Não'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      {/* <-- ADDED/MODIFIED: Dropdown Menu com Ação Ativar/Desativar --> */}
                      <DropdownMenu>
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
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                          {/* Placeholder */}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(user)} // Chama handler ao clicar
                            disabled={
                              loggedInUser?.id === user.id ||
                              toggleStatusMutation.isPending
                            } // Desabilita para si ou durante loading
                            className={
                              user.isActive
                                ? 'text-red-600 focus:bg-red-100 focus:text-red-700'
                                : 'text-green-600 focus:bg-green-100 focus:text-green-700'
                            }
                          >
                            {/* Ícone e Texto Condicional */}
                            {toggleStatusMutation.isPending &&
                            toggleStatusMutation.variables?.userId ===
                              user.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : user.isActive ? (
                              <Ban className="mr-2 h-4 w-4" />
                            ) : (
                              <CheckCircle className="mr-2 h-4 w-4" />
                            )}
                            {user.isActive ? 'Desativar' : 'Ativar'} Usuário
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
      {/* Observation Dialog não é usado aqui */}
      {/* <ObservationDialog request={editingRequest} onOpenChange={(open) => { if (!open) { setEditingRequest(null); } }}/> */}
    </ProtectedRoute>
  );
}
