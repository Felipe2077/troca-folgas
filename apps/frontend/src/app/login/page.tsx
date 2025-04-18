// apps/frontend/src/app/login/page.tsx - REATORADO COM AUTH CONTEXT
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
import { useAuth } from '@/contexts/AuthContext'; // <-- Importa useAuth
import { Role } from '@repo/shared-types'; // Importa Role
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'; // Importa FormEvent
import { toast } from 'sonner'; // Mantém toast para erros

// REMOVIDO: Tipagens LoginData, LoginResponse, ApiError (agora gerenciadas no AuthContext/AuthProvider)
// REMOVIDO: Função async function loginUser(credentials: LoginData)

// --- Componente Principal da Página ---
export default function LoginPage() {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  // ADICIONADO: Estado local para exibir erros vindos do auth.login()
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // MODIFICADO: Pega 'login' e 'isLoading' do contexto, remove useMutation
  const { login, isLoading } = useAuth();

  // MODIFICADO: Usa 'isLoading' do contexto para desabilitar
  const isDisabled =
    loginIdentifier.trim() === '' || password.trim() === '' || isLoading;

  // MODIFICADO: handleSubmit agora chama auth.login() e faz o redirect
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return;
    setError(null); // Limpa erros anteriores

    try {
      // Chama a função login do CONTEXTO e espera o resultado
      const loggedUser = await login({ loginIdentifier, password });

      // Se chegou aqui, o login no AuthProvider foi bem-sucedido
      toast.success('Login bem-sucedido!'); // Mantém toast de sucesso

      // Redirecionamento baseado na role retornada pelo login do AuthProvider
      if (loggedUser.role === Role.ADMINISTRADOR) {
        router.push('/admin/dashboard');
      } else if (loggedUser.role === Role.ENCARREGADO) {
        router.push('/requests/new'); // Ou para uma futura dashboard do Encarregado
      } else {
        // Role desconhecida ou não definida? Vai para a raiz como fallback.
        console.warn(
          'Role de usuário desconhecida após login:',
          loggedUser.role
        );
        router.push('/');
      }
    } catch (err: any) {
      // Pega o erro lançado pela função login do AuthProvider
      console.error('Falha no login (componente):', err);
      const errorMessage =
        err.message || 'Erro desconhecido ao tentar fazer login.';
      setError(errorMessage); // Define o erro local para exibição
      toast.error(errorMessage); // Mostra o erro no toast também
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com seu identificador e senha para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {/* ADICIONADO: Exibe erro local */}
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="loginIdentifier">Identificador (Email/CPF)</Label>
              <Input
                id="loginIdentifier"
                type="text"
                placeholder="seu.identificador"
                required
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                disabled={isLoading} // <-- Usa isLoading do contexto
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading} // <-- Usa isLoading do contexto
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full mt-8" type="submit" disabled={isDisabled}>
              {/* MODIFICADO: Usa isLoading do contexto */}
              {isLoading ? (
                <>
                  {' '}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                  Entrando...{' '}
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
