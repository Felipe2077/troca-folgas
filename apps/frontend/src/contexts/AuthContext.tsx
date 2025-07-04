// apps/frontend/src/contexts/AuthContext.tsx
'use client'; // Context geralmente precisa ser usado em Client Components

import { createContext, useContext } from 'react';
// Importa tipos compartilhados (Role e talvez um tipo User frontend)
import { Role } from '@repo/shared-types';

// Define um tipo para os dados do usuário que queremos no contexto frontend
// Pode ser diferente do modelo Prisma completo
export interface AuthUser {
  id: number;
  name: string;
  loginIdentifier: string;
  role: Role;
}
export interface LoginCredentials {
  loginIdentifier: string;
  password?: string; // Senha pode ser opcional se validação ocorrer antes
}

// Define a "forma" do valor que nosso contexto fornecerá
interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  login: (credentials: LoginCredentials) => Promise<AuthUser>; // Retorna o usuário em caso de sucesso
}

// Cria o Contexto com um valor inicial undefined
// Usaremos undefined para poder verificar se o hook useAuth foi usado dentro de um Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook customizado para consumir o contexto de forma segura
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Garante que o hook só seja usado dentro de um AuthProvider
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Exporta o Context (necessário para o Provider) - NÂO exportamos o Provider daqui
export { AuthContext };
