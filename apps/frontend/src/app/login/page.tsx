// apps/frontend/src/app/login/page.tsx
import { Button } from '@/components/ui/button'; // Importa componentes Shadcn
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

// Componente funcional para a página de login
export default function LoginPage() {
  return (
    // Div para centralizar o card na página (opcional)
    <div className="flex justify-center items-center pt-10">
      <Card className="w-full max-w-sm bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com seu identificador e senha para acessar o sistema.
          </CardDescription>
        </CardHeader>
        {/* Conteúdo do Card - onde vão os inputs */}
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="loginIdentifier">Identificador (Email/CPF)</Label>
            <Input
              id="loginIdentifier"
              type="text" // Pode ser 'email' se for sempre email
              placeholder="seu.identificador"
              required
              // NOTA: Não vamos adicionar 'value' ou 'onChange' ainda. Foco na UI.
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              // NOTA: Não vamos adicionar 'value' ou 'onChange' ainda. Foco na UI.
            />
          </div>
        </CardContent>
        {/* Rodapé do Card - onde vai o botão */}
        <CardFooter>
          <Button className="w-full" type="submit">
            Entrar
          </Button>
          {/* Exemplo: Link para registro (podemos adicionar depois) */}
          {/* <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="/register-page" className="underline">
              Registre-se
            </Link>
          </div> */}
        </CardFooter>
      </Card>
    </div>
  );
}
