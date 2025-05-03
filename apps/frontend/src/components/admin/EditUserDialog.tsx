// apps/frontend/src/components/admin/EditUserDialog.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  PublicUser,
  Role,
  UserUpdateInput,
  userUpdateSchema,
} from '@repo/shared-types'; // Importa schema e tipo
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod'; // Importa Zod para o tipo de erro

// Tipo para erros Zod formatados (específico para este form)
type EditUserFormattedErrors = z.ZodFormattedError<UserUpdateInput> | null;

// Props do componente
interface EditUserDialogProps {
  user: PublicUser | null; // Usuário a ser editado (ou null para fechar)
  onOpenChange: (open: boolean) => void; // Para fechar o dialog
}

// Função API (similar às outras, poderia ser centralizada)
interface UpdateUserParams {
  userId: number;
  data: UserUpdateInput;
  token: string | null;
}
async function updateUserApi({
  userId,
  data,
  token,
}: UpdateUserParams): Promise<PublicUser> {
  if (!token) throw new Error('Token não encontrado para atualizar usuário.');
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`;
  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data), // Envia apenas os campos que mudaram (name?, role?)
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(errorData.message || 'Falha ao atualizar usuário.');
  }
  const responseData = await response.json();
  if (!responseData.user)
    throw new Error("Resposta da API inválida (sem 'user')");
  return responseData.user;
}

export function EditUserDialog({ user, onOpenChange }: EditUserDialogProps) {
  // Estados locais do formulário
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role | undefined>(undefined);
  const [validationErrors, setValidationErrors] =
    useState<EditUserFormattedErrors>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const { token, user: loggedInUser } = useAuth(); // Pega token e usuário logado
  const queryClient = useQueryClient();

  // Efeito para popular o formulário quando o 'user' (prop) mudar
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setRole(user.role);
      setValidationErrors(null); // Limpa erros ao abrir/mudar usuário
      setApiError(null);
    }
  }, [user]); // Roda sempre que o 'user' da prop mudar

  // Mutação para salvar as alterações
  const updateUserMutation = useMutation<PublicUser, Error, UserUpdateInput>({
    mutationFn: (updateData) => {
      if (!user) throw new Error('Usuário alvo não definido.');
      return updateUserApi({ userId: user.id, data: updateData, token });
    },
    onSuccess: (updatedUser) => {
      toast.success(`Usuário ${updatedUser.name} atualizado com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['adminUsersList'] }); // Atualiza a lista
      onOpenChange(false); // Fecha o dialog
    },
    onError: (error) => {
      console.error('Erro ao atualizar usuário:', error);
      setApiError(error.message);
      toast.error(error.message || 'Erro ao atualizar usuário.');
    },
  });

  // Handler do submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return; // Segurança
    setValidationErrors(null);
    setApiError(null);

    const formData = {
      // Inclui APENAS se for diferente do original? Ou sempre envia?
      // Enviar sempre é mais simples, o backend pode otimizar se não mudou.
      // Mas podemos enviar só o que mudou para ser um PATCH mais 'puro'.
      // Vamos enviar apenas o que mudou para demonstrar:
      name: name !== user.name ? name : undefined,
      role: role !== user.role ? role : undefined,
    };

    // Remove chaves undefined antes de validar/enviar
    const dataToValidate = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== undefined)
    );

    // Valida com Zod (garante min length nome, enum role, e que algo foi enviado)
    const validationResult = userUpdateSchema.safeParse(dataToValidate);
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.format());
      toast.error('Corrija os erros no formulário.');
      return;
    }

    // Verifica se o Admin está tentando mudar a própria role (redundante com backend, mas bom ter)
    if (
      loggedInUser?.id === user.id &&
      validationResult.data.role &&
      validationResult.data.role !== loggedInUser.role
    ) {
      toast.error('Você não pode alterar sua própria role.');
      setFormError('Você não pode alterar sua própria role.'); // Usa formError aqui? Ou só toast?
      return;
    }

    updateUserMutation.mutate(validationResult.data);
  };

  const isOpen = user !== null; // Dialog está aberto se tiver um usuário para editar

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário - ID: {user?.id}</DialogTitle>
          <DialogDescription>
            Modifique o nome ou o cargo do usuário.
          </DialogDescription>
        </DialogHeader>
        {/* Só mostra o form se tiver usuário */}
        {user && (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Erro da API */}
              {apiError && !validationErrors && (
                <p className="text-sm font-medium text-destructive">
                  {apiError}
                </p>
              )}

              {/* Campo Nome */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setValidationErrors(null);
                  }}
                  required
                  className={cn(
                    'col-span-3',
                    validationErrors?.name && 'border-destructive'
                  )}
                />
                {validationErrors?.name?._errors?.[0] && (
                  <p className="col-span-4 text-right text-sm font-medium text-destructive">
                    {validationErrors.name._errors[0]}
                  </p>
                )}
              </div>

              {/* Campo Identificador (Crachá) - NÃO EDITÁVEL */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loginIdentifier" className="text-right">
                  Crachá
                </Label>
                <Input
                  id="loginIdentifier"
                  value={user.loginIdentifier}
                  disabled
                  className="col-span-3"
                />
              </div>

              {/* Campo Role */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Cargo
                </Label>
                <Select
                  value={role}
                  onValueChange={(value: Role) => {
                    setRole(value);
                    setValidationErrors(null);
                  }}
                  required
                  disabled={
                    updateUserMutation.isPending || loggedInUser?.id === user.id
                  }
                >
                  <SelectTrigger
                    id="role"
                    className={cn(
                      'col-span-3',
                      validationErrors?.role && 'border-destructive'
                    )}
                  >
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Role).map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors?.role?._errors?.[0] && (
                  <p className="col-span-4 text-right text-sm font-medium text-destructive">
                    {validationErrors.role._errors[0]}
                  </p>
                )}
              </div>

              {/* Erro geral do .refine (se houver) */}
              {validationErrors?._errors?.length &&
                !validationErrors?.name &&
                !validationErrors?.role && (
                  <p className="col-span-4 text-center text-sm font-medium text-destructive">
                    {validationErrors._errors.join(', ')}
                  </p>
                )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={updateUserMutation.isPending}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? (
                  <>
                    {' '}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                    Salvando...{' '}
                  </>
                ) : (
                  'Salvar Alterações'
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
