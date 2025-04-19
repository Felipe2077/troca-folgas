// apps/frontend/src/app/page.tsx - COM REDIRECTS
'use client'; // Precisa ser client component para usar hooks

import { useAuth } from '@/contexts/AuthContext'; // Nosso hook
import { Role } from '@repo/shared-types';
import { Loader2 } from 'lucide-react'; // Loader
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Só executa depois que o estado de autenticação carregou
    if (!isLoading) {
      if (!isAuthenticated) {
        // Não logado -> vai pro login
        router.replace('/login');
      } else if (user) {
        // Logado -> vai para a página da role
        if (user.role === Role.ADMINISTRADOR) {
          router.replace('/admin/dashboard');
        } else if (user.role === Role.ENCARREGADO) {
          router.replace('/requests/new');
        } else {
          // Role desconhecida? Pode ir pro login ou uma página de erro.
          console.warn(
            'Usuário logado com role desconhecida na home:',
            user.role
          );
          router.replace('/login'); // Segurança: manda pro login
        }
      } else {
        // Autenticado mas sem user? Estado estranho, manda pro login.
        console.error(
          'Estado de autenticação inconsistente na home: isAuthenticated=true, user=null'
        );
        router.replace('/login');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Mostra um loader enquanto verifica o estado de auth/redireciona
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
