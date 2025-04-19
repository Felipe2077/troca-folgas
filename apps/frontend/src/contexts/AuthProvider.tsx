// apps/frontend/src/contexts/AuthProvider.tsx - VERSÃO CORRIGIDA E COMPLETA
'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext, AuthUser, LoginCredentials } from './AuthContext'; // Importa contexto e tipos

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setToken = useCallback((newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, []);

  useEffect(() => {
    async function checkAuthStatus() {
      setIsLoading(true);
      const storedToken = localStorage.getItem('authToken');
      try {
        if (storedToken) {
          // Valida token buscando dados do usuário via /me
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
              throw new Error('API /me OK, mas sem usuário.');
            }
          } else {
            throw new Error(
              `Token inválido ou erro na API /me (${response.status})`
            );
          }
        } else {
          setUser(null);
          setTokenState(null);
        }
      } catch (error) {
        console.error(
          'AuthProvider - Erro ao verificar status de autenticação:',
          error
        );
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuthStatus();
  }, [setToken]);

  const logout = useCallback(() => {
    console.log('[AuthProvider] Logging out...');
    setUser(null);
    setToken(null); // setToken já limpa o localStorage
    console.log(
      '[AuthProvider] State cleared. Redirect will be handled by component reaction.'
    );
  }, [setToken]);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthUser> => {
      setUser(null); // Limpa estado anterior
      setToken(null);
      setIsLoading(true); // Começa loading para o processo de login

      try {
        // Chama a API de login
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          }
        );

        const data = await response.json(); // Lê o corpo, mesmo se der erro

        if (!response.ok) {
          // Usa a mensagem de erro vinda da API, se houver
          throw new Error(
            data?.message || `Erro ${response.status} ao tentar fazer login.`
          );
        }

        if (!data.token) {
          throw new Error('Token não recebido da API após login.');
        }

        const meResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${data.token}` },
          }
        );
        if (!meResponse.ok) {
          // Se o /me falhar mesmo com token novo, algo está errado.
          const meErrorData = await meResponse.json().catch(() => ({}));
          throw new Error(
            meErrorData?.message ||
              'Token recebido, mas falha ao buscar dados do usuário (/me).'
          );
        }
        const meData = await meResponse.json();
        if (!meData.user) {
          throw new Error('API /me OK, mas sem dados do usuário.');
        }

        const loggedUser: AuthUser = meData.user; // Usuário validado vindo de /me

        // Define o estado global da aplicação
        setUser(loggedUser);
        setToken(data.token); // Salva token no estado e localStorage

        console.log('Login realizado (AuthProvider), usuário:', loggedUser);
        return loggedUser; // Retorna os dados do usuário para o LoginPage usar no redirect
      } catch (error) {
        console.error('Erro na função login do AuthProvider:', error);
        setUser(null); // Garante limpeza do estado em caso de erro
        setToken(null);
        throw error; // Re-lança o erro para o LoginPage tratar (mostrar na UI)
      } finally {
        setIsLoading(false); // Termina o loading do processo de login
      }
    },
    [setToken]
  ); // Dependência do useCallback

  // useMemo AGORA DEVE FUNCIONAR, pois a constante 'login' existe
  const contextValue = useMemo(
    () => ({
      isLoading,
      isAuthenticated: !!user,
      user,
      token,
      setToken,
      login,
      logout,
    }),
    [isLoading, user, token, setToken, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
