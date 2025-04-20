'use client'; // Marca como Client Component

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext'; // Hook de Auth
import { Role } from '@repo/shared-types';
import { Loader2, LogOut, Settings } from 'lucide-react'; // Ícones
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  // Pega o estado de autenticação e a função logout do contexto
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground p-2 shadow-md  ">
      <div className="container mx-auto flex justify-between items-center">
        <Image alt="logo" src="/logo.png" width={56} height={56} />
        <Link
          href="/"
          className="text-xl sm:text-2xl font-semibold hover:opacity-90"
        >
          Troca de Folgas
        </Link>

        {/* Navegação Condicional */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          {/* Mostra botões apenas se não estiver carregando o estado inicial */}
          {!isLoading && (
            <>
              {/* Botão de Configurações (SÓ PARA ADMIN) */}
              {isAuthenticated && user?.role === Role.ADMINISTRADOR && (
                <Link href="/admin/settings" passHref>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Configurações</span>{' '}
                    {/* Texto some em telas pequenas */}
                  </Button>
                </Link>
              )}

              {/* Botão de Logout (Para qualquer usuário logado) */}
              {isAuthenticated && (
                <Button variant="ghost" size="sm" onClick={logout}>
                  {' '}
                  {/* Chama a função logout do contexto */}
                  <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              )}
            </>
          )}
          {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
        </nav>
      </div>
    </header>
  );
}
