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

// Define a "forma" do valor que nosso contexto fornecerá
interface AuthContextType {
  isLoading: boolean; // Indica se a verificação inicial de auth está ocorrendo
  isAuthenticated: boolean; // Se o usuário está logado e autenticado
  user: AuthUser | null; // Dados do usuário logado ou null
  // Adicionaremos as funções login e logout aqui depois, definidas no Provider
  // login: (credentials: LoginCredentials) => Promise<void>;
  // logout: () => void;
  token: string | null; // Opcional: expor o token? Por enquanto pode ser útil.
  setToken: (token: string | null) => void; // Função para o Provider atualizar o token
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
