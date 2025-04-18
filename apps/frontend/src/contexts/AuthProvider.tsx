// apps/frontend/src/contexts/AuthProvider.tsx
'use client'; // Precisa ser client component devido a useState, useEffect, localStorage

import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext, AuthUser } from './AuthContext'; // Importa o contexto e o tipo User

// Interface para as props do Provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  // Começa como true para indicar que estamos verificando o auth inicial
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Função para definir o token no estado E no localStorage
  const setToken = useCallback((newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, []); // useCallback para evitar recriações desnecessárias

  // Efeito para verificar o token no carregamento inicial
  useEffect(() => {
    async function checkAuthStatus() {
      setIsLoading(true); // Inicia verificação
      const storedToken = localStorage.getItem('authToken');
      try {
        if (storedToken) {
          // Tenta validar o token buscando dados do usuário
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.user) {
              setUser(data.user);
              setTokenState(storedToken);
            } else {
              throw new Error('Resposta inválida da API /me');
            }
          } else {
            // Se o status não for OK (401, 403, 500), considera token inválido
            throw new Error(
              `Token inválido ou erro na API /me (${response.status})`
            );
          }
        } else {
          // Nenhum token encontrado, limpa o estado
          setUser(null);
          setTokenState(null);
        }
      } catch (error) {
        // Captura QUALQUER erro da validação ou fetch
        console.error(
          'AuthProvider - Erro ao verificar status de autenticação:',
          error
        );
        setUser(null);
        setToken(null); // Usa a função que limpa localStorage também
      } finally {
        // Garante que o loading termina mesmo se houver erro
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, [setToken]); // Roda só uma vez no mount (setToken é estável via useCallback)

  // Função de Logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null); // Limpa estado e localStorage
    // Opcional: Redirecionar para o login após logout
    router.push('/login');
    console.log('Usuário deslogado.');
  }, [router, setToken]); // Inclui dependências estáveis

  // Calcula isAuthenticated baseado no estado 'user'
  const isAuthenticated = !!user;

  // Memoiza o valor do contexto para evitar re-renderizações desnecessárias dos consumidores
  const contextValue = useMemo(
    () => ({
      isLoading,
      isAuthenticated,
      user,
      token,
      setToken,
      logout,
      // login: // Adicionaremos a função login aqui depois
    }),
    [isLoading, isAuthenticated, user, token, setToken, logout]
  );

  // Fornece o valor calculado para todos os componentes filhos
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
