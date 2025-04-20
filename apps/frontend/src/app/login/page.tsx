// apps/frontend/src/app/login/page.tsx - COM VALIDAÇÃO ZOD E DISPLAY DE ERRO
'use client';

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
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils'; // <-- ADICIONADO: Importa helper cn
import { loginBodySchema, Role } from '@repo/shared-types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'; // Import React e FormEvent
import { toast } from 'sonner';
import { z } from 'zod'; // Importa Zod

// Tipo inferido dos erros formatados pelo Zod
type FormattedErrors = z.ZodFormattedError<
  typeof loginBodySchema._input
> | null;

export default function LoginPage() {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  // Renomeado para apiError para clareza
  const [apiError, setApiError] = useState<string | null>(null);
  // Estado para erros de validação Zod
  const [validationErrors, setValidationErrors] =
    useState<FormattedErrors>(null);
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const isDisabled = !loginIdentifier.trim() || !password.trim() || isLoading;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null); // Limpa erro da API anterior
    setValidationErrors(null); // Limpa erros de validação anteriores
    if (isLoading) return;

    const validationResult = loginBodySchema.safeParse({
      loginIdentifier,
      password,
    });

    if (!validationResult.success) {
      setValidationErrors(validationResult.error.format());
      return; // Para a execução se a validação falhar
    }

    // Se chegou aqui, a validação Zod passou. Chama o login.
    try {
      const loggedUser = await login(validationResult.data); // Usa dados validados
      toast.success('Login bem-sucedido!');
      // Redirecionamento
      if (loggedUser.role === Role.ADMINISTRADOR) {
        router.push('/admin/dashboard');
      } else if (loggedUser.role === Role.ENCARREGADO) {
        router.push('/requests/new');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Falha no login (componente):', err);
      const errorMessage = err.message || 'Erro desconhecido.';
      setApiError(errorMessage); // Guarda erro da API
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <Card className="w-full max-w-xl ">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com seu identificador e senha para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {/* Exibe erro GERAL da API, se houver */}
            {apiError &&
              !validationErrors && ( // Só mostra se não houver erro de validação Zod
                <p className="text-sm font-medium text-destructive">
                  {apiError}
                </p>
              )}
            {/* Campo Identificador */}
            <div className="grid gap-2">
              <Label htmlFor="loginIdentifier" className="text-base">
                Identificador (Email/CPF)
              </Label>
              <Input
                id="loginIdentifier"
                type="text"
                placeholder="Digite o CPF"
                required
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                disabled={isLoading}
                className={cn(
                  'h-14 placeholder:text-base',
                  validationErrors?.loginIdentifier &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {/* <-- ADICIONADO: Exibe erro específico do Zod para este campo --> */}
              {validationErrors?.loginIdentifier?._errors && (
                <p className="text-sm font-medium text-destructive">
                  {validationErrors.loginIdentifier._errors[0]}
                </p>
              )}
            </div>
            {/* Campo Senha */}
            <div className="grid gap-2 mt-2 ">
              <Label htmlFor="password" className="text-base">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                // <-- ADICIONADO: Estilo condicional de erro -->
                className={cn(
                  'h-14',
                  validationErrors?.password &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {/* <-- ADICIONADO: Exibe erro específico do Zod para este campo --> */}
              {validationErrors?.password?._errors && (
                <p className="text-sm font-medium text-destructive">
                  {validationErrors.password._errors[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full mt-8" type="submit" disabled={isDisabled}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
