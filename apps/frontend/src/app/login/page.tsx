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
import { useState } from 'react';

// Componente funcional para a página de login
export default function LoginPage() {
  // 3. Criar estados para os inputs
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // 5. Calcular se o botão deve estar desabilitado
  //    (Verifica se algum dos campos, após remover espaços em branco, está vazio)
  const isDisabled = loginIdentifier.trim() === '' || password.trim() === '';

  // Função para lidar com o submit (faremos na próxima etapa)
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return; // Segurança extra
    console.log('Tentando fazer login com:', { loginIdentifier, password });
    // Aqui chamaremos a API de login na próxima tarefa
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
              />
            </div>
          </CardContent>
          <CardFooter>
            {/* 6. Aplicar 'disabled' ao Botão */}
            <Button className="w-full mt-8" type="submit" disabled={isDisabled}>
              Entrar
            </Button>
          </CardFooter>
        </form>
        {/* ... (Link opcional para registro) ... */}
      </Card>
    </div>
  );
}
