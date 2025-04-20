// apps/frontend/src/app/admin/users/page.tsx
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Para futuro botão "Criar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';
import { PublicUser, Role } from '@repo/shared-types'; // <-- Importa PublicUser e Role
import { useQuery } from '@tanstack/react-query';
import { Loader2, PlusCircle } from 'lucide-react'; // Ícone para botão Criar
import Link from 'next/link';

// --- Função para Buscar Usuários ---
async function fetchUsers(token: string | null): Promise<PublicUser[]> {
  if (!token) {
    throw new Error('Token não encontrado para buscar usuários.');
  }
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
  // API retorna { users: PublicUser[] }
  return data.users || [];
}

// --- Componente da Página ---
export default function AdminUsersPage() {
  const { token } = useAuth();

  // Query para buscar os usuários
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<PublicUser[], Error>({
    queryKey: ['adminUsersList'], // Chave única para esta query
    queryFn: () => fetchUsers(token), // Chama a função de busca
    enabled: !!token, // Só roda se tiver token
  });

  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
            <CardDescription>
              Visualize e gerencie os usuários do sistema.
            </CardDescription>
          </div>
          <div>
            {/* TODO: Criar página /admin/users/new e habilitar link */}
            <Link href="/admin/users/new" passHref>
              <Button size="sm" className="ml-auto gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Criar Usuário
                </span>
              </Button>
            </Link>
            {/* <Link href="/admin/users/new" passHref>
                <Button size="sm" className="ml-auto gap-1">...</Button>
             </Link> */}
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
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Identificador Login</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Criado Em</TableHead>
                  <TableHead>
                    <span className="sr-only">Ações</span>
                  </TableHead>
                  {/* Ações futuras */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.loginIdentifier}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === Role.ADMINISTRADOR
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      {/* TODO: Adicionar Dropdown para Editar/Desativar */}
                      <span className="text-muted-foreground text-xs">
                        (Ações)
                      </span>
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
