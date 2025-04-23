// apps/frontend/src/app/admin/users/new/page.tsx
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { registerBodySchema, RegisterInput, Role } from '@repo/shared-types'; // Importa schema e tipo
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// Tipo para erros formatados do Zod
type FormattedErrors = z.ZodFormattedError<RegisterInput> | null;

// Função para chamar a API de registro
interface CreateUserParams {
  formData: RegisterInput;
  token: string | null;
}
async function createUserApi({ formData, token }: CreateUserParams) {
  // Não precisamos do tipo de retorno aqui geralmente
  if (!token)
    throw new Error('Token de Admin não encontrado para criar usuário.');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(errorData.message || 'Falha ao criar usuário.');
  }
  return response.json(); // Retorna a resposta (que deve conter o usuário criado)
}

export default function CreateUserPage() {
  const router = useRouter();
  const { token } = useAuth();

  // Estados do formulário
  const [name, setName] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role | undefined>(undefined);
  const [apiError, setApiError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] =
    useState<FormattedErrors>(null);

  // Mutação para criar o usuário
  const createUserMutation = useMutation<
    unknown,
    Error,
    CreateUserParams['formData']
  >({
    mutationFn: (formData) => createUserApi({ formData, token }), // Passa o token aqui
    onSuccess: () => {
      toast.success('Usuário criado com sucesso!');
      setApiError(null);
      setValidationErrors(null);
      // Limpa formulário e redireciona para a lista
      setName('');
      setLoginIdentifier('');
      setPassword('');
      setRole(undefined);
      router.push('/admin/users'); // Redireciona para a lista após sucesso
    },
    onError: (error) => {
      console.error('Erro ao criar usuário:', error);
      setApiError(error.message);
      toast.error(error.message || 'Erro ao criar usuário.');
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);
    setValidationErrors(null);
    if (createUserMutation.isPending) return;

    const formData = { name, loginIdentifier, password, role: role! }; // Assume role selecionada na validação Zod

    // Valida com Zod
    const validationResult = registerBodySchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.format());
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }

    // Chama a mutação com dados validados
    createUserMutation.mutate(validationResult.data);
  };

  // Desabilita botão se campos vazios ou carregando
  const isDisabled =
    !name.trim() ||
    !loginIdentifier.trim() ||
    !password.trim() ||
    !role ||
    createUserMutation.isPending;

  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Criar Novo Usuário</CardTitle>
          <CardDescription>
            Preencha os dados para registrar um novo membro da equipe.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Erro geral da API */}
            {apiError && !validationErrors && (
              <p className="text-sm font-medium text-destructive">{apiError}</p>
            )}

            {/* Campo Nome */}
            <div className="grid gap-1.5">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setValidationErrors(null);
                }}
                required
                disabled={createUserMutation.isPending}
                className={cn(validationErrors?.name && 'border-destructive')}
              />
              {validationErrors?.name?._errors?.[0] && (
                <p className="text-sm font-medium text-destructive">
                  {validationErrors.name._errors[0]}
                </p>
              )}
            </div>

            {/* Campo Identificador Login */}
            <div className="grid gap-1.5 my-5">
              <Label htmlFor="loginIdentifier">
                Identificador Login (Email/CPF/Matrícula)
              </Label>
              <Input
                id="loginIdentifier"
                value={loginIdentifier}
                onChange={(e) => {
                  setLoginIdentifier(e.target.value);
                  setValidationErrors(null);
                }}
                required
                disabled={createUserMutation.isPending}
                className={cn(
                  validationErrors?.loginIdentifier && 'border-destructive'
                )}
              />
              {validationErrors?.loginIdentifier?._errors?.[0] && (
                <p className="text-sm font-medium text-destructive">
                  {validationErrors.loginIdentifier._errors[0]}
                </p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="grid gap-1.5">
              <Label htmlFor="password">Senha (mínimo 6 caracteres)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidationErrors(null);
                }}
                required
                disabled={createUserMutation.isPending}
                className={cn(
                  validationErrors?.password && 'border-destructive'
                )}
              />
              {validationErrors?.password?._errors?.[0] && (
                <p className="text-sm font-medium text-destructive">
                  {validationErrors.password._errors[0]}
                </p>
              )}
            </div>

            {/* Campo Role */}
            <div className="grid gap-1.5">
              <Label htmlFor="role">Cargo</Label>
              <Select
                value={role}
                onValueChange={(value: Role) => {
                  setRole(value);
                  setValidationErrors(null);
                }}
                required
                disabled={createUserMutation.isPending}
              >
                <SelectTrigger
                  id="role"
                  className={cn(validationErrors?.role && 'border-destructive')}
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
                <p className="text-sm font-medium text-destructive">
                  {validationErrors.role._errors[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isDisabled}>
              {createUserMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar Usuário'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </ProtectedRoute>
  );
}
