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
import { Mukta } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'; // Import React e FormEvent
import { toast } from 'sonner';
import { z } from 'zod'; // Importa Zod

// Tipo inferido dos erros formatados pelo Zod
type FormattedErrors = z.ZodFormattedError<
  typeof loginBodySchema._input
> | null;
const mukta = Mukta({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

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
        router.push('/encarregado/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: unknown) {
      // err é unknown
      console.error('Falha no login (componente):', err);
      let errorMessage = 'Erro desconhecido ao tentar fazer login.'; // Default message

      // Verifica se err é uma instância de Error antes de acessar .message
      if (err instanceof Error) {
        errorMessage = err.message; // Se for Error, usa sua mensagem
      }
      // Se não for Error, mantém a mensagem default ou pode logar/tratar diferente

      setApiError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const Saudacao = () => {
    const hora = new Date().getHours();
    const saudacao =
      hora < 12 ? '☀️ Bom dia' : hora < 18 ? '🌤️ Boa tarde' : '🌙 Boa noite';

    return <p className="">{saudacao}! Faça seu login para continuar.</p>;
  };

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 -z-10 h-full w-full "
        aria-hidden="true"
      />
      <div className="flex flex-col justify-center items-center pt-10 ">
        <div className="flex items-center mb-10">
          <Image alt="logo" src={'/logo.png'} width={92} height={92} />
          <p className={`${mukta.className} mr-2 font-bold text-4xl`}>
            Viação Pioneira
          </p>
        </div>
        <Card className="w-full md:px-4 max-w-xl mb-4 glow  h-[450px] md:h-[500px] bg-[#191919]">
          <CardHeader className=" text-center">
            <CardTitle
              className={`${mukta.className} text-2xl md:text-2xl mt-4`}
            >
              Acesse sua conta
            </CardTitle>
            <CardDescription>
              <Saudacao />
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
              <div className="grid gap-2 mt-10">
                <Label htmlFor="loginIdentifier" className="md:text-base">
                  Crachá
                </Label>
                <Input
                  id="loginIdentifier"
                  type="text"
                  placeholder="Digite seu crachá (5-6 dígitos)"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    ' mb-2',
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
                <Label htmlFor="password" className="md:text-base">
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
                    ' ',
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
              <Button
                className="w-full mt-10  text-base"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #75D6FF 0%, #D2FFC1 38%, #EDFF40 74%, #FAFF00 91%)',
                }}
                type="submit"
                disabled={isDisabled}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
