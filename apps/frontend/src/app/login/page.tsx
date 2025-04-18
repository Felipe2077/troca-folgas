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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

// Tipagem para os dados enviados e recebidos da API
interface LoginData {
  loginIdentifier: string;
  password?: string; // Senha opcional aqui pois podemos validar antes
}
interface LoginResponse {
  token: string;
}
interface ApiError {
  // Tipo simples para erros da API
  message: string;
  issues?: unknown; // Para erros Zod
}

async function loginUser(credentials: LoginData): Promise<LoginResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }
  );

  // Se a resposta não for OK (ex: 400, 401, 500), lança um erro
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      message: `Erro ${response.status}: ${response.statusText}`, // Fallback se o JSON falhar
    }));
    throw new Error(errorData.message || 'Falha no login');
  }

  // Se a resposta for OK, retorna o JSON (esperamos { token: "..." })
  return response.json();
}

// Componente funcional para a página de login
export default function LoginPage() {
  // 3. Criar estados para os inputs
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const mutation = useMutation<LoginResponse, Error, LoginData>({
    // Tipos: Resposta Sucesso, Tipo Erro, Tipo Input
    mutationFn: loginUser, // Função que será chamada para executar a mutação
    onSuccess: (data) => {
      // Ação em caso de SUCESSO
      console.log('Login bem-sucedido!', data);
      // Armazenar o token (ex: localStorage - PODE SER MELHORADO COM ZUSTAND DEPOIS)
      localStorage.setItem('authToken', data.token);
      toast.success('Login bem-sucedido!');
      // Redirecionar para uma página pós-login (ex: dashboard ou home)
      router.push('/'); // Redireciona para a home por enquanto
      // Poderia usar toast para mostrar sucesso
    },
    onError: (error) => {
      // Ação em caso de ERRO
      console.error('Erro no login:', error);
      // Mostrar mensagem de erro para o usuário (usando um estado ou toast)
      // Exemplo simples (melhorar depois):
      toast.error(error.message || 'Falha no login.');
    },
  });
  // 5. Calcular se o botão deve estar desabilitado
  //    (Verifica se algum dos campos, após remover espaços em branco, está vazio)
  const isDisabled = loginIdentifier.trim() === '' || password.trim() === '';

  // Função para lidar com o submit (faremos na próxima etapa)
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return;
    // Chama a função 'mutate' do React Query para iniciar a chamada da API
    mutation.mutate({ loginIdentifier, password });
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
        {/* Adicionamos o onSubmit ao form implícito do CardContent/CardFooter */}
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="loginIdentifier">Identificador (Email/CPF)</Label>
              <Input
                id="loginIdentifier"
                type="text"
                placeholder="seu.identificador"
                required
                // 4. Conectar Input ao Estado
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                disabled={mutation.isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                // 4. Conectar Input ao Estado
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={mutation.isPending}
              />
            </div>
          </CardContent>
          <CardFooter>
            {/* 6. Aplicar 'disabled' ao Botão */}
            <Button className="w-full mt-8" type="submit" disabled={isDisabled}>
              {mutation.isPending ? 'Entrando...' : 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
