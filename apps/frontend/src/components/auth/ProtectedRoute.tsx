// apps/frontend/src/components/auth/ProtectedRoute.tsx - VERSÃO FINAL FUNCIONAL
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@repo/shared-types';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Role[]; // Array de roles permitidas
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, user } = useAuth();

  // 1. Se ainda está carregando o estado de autenticação, mostra o loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. Se terminou de carregar e NÃO está autenticado, redireciona para login
  if (!isAuthenticated) {
    redirect('/login');
    // Nota: O código abaixo de redirect() não é executado
  }

  // 3. Se está autenticado mas o objeto user não existe (caso de segurança)
  //    Isso não deveria ocorrer se AuthProvider estiver correto, mas é uma salvaguarda.
  if (!user) {
    redirect('/login');
  }

  // 4. Se está autenticado, tem usuário, mas a role NÃO é permitida
  if (!allowedRoles.includes(user.role)) {
    console.log(
      `[ProtectedRoute] Render - Role mismatch (${user.role} not allowed for this route), redirecting to default page for role...`
    );

    // *** LÓGICA DE REDIRECT POR ROLE ATUAL ***
    if (user.role === Role.ADMINISTRADOR) {
      // Se é Admin tentando acessar pág não-admin (ex: /requests/new se protegêssemos só pra Encarregado)
      redirect('/admin/dashboard');
    } else if (user.role === Role.ENCARREGADO) {
      // Se é Encarregado tentando acessar pág Admin (ex: /admin/dashboard)
      redirect('/requests/new'); // <-- Manda para a página do Encarregado
    } else {
      // Se a role for desconhecida ou inesperada, manda pro login por segurança
      console.warn(
        `[ProtectedRoute] Unknown role (${user.role}) encountered, redirecting to /login`
      );
      redirect('/login');
    }
    // *** FIM DA LÓGICA DE REDIRECT ***

    // O código abaixo não será executado por causa do redirect()
  }

  // 5. Se passou por todas as verificações => Autorizado!
  console.log('[ProtectedRoute] Render - Authorized! Rendering children.');
  return <>{children}</>;
}
