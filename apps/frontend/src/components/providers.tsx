// apps/frontend/src/components/providers.tsx
'use client'; // Provider precisa ser client component se instanciar client aqui

import { ThemeProvider } from '@/components/theme-provider'; // Nosso provider de tema
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Cria uma instância do QueryClient
// staleTime: 0 -> refetch on mount/window focus by default
// cacheTime: 1000 * 60 * 60 * 24 -> cache data for 24 hours (adjust as needed)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Adjust based on your data freshness needs
    },
  },
});

// Componente que agrupa todos os provedores
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Colocamos o ThemeProvider dentro do QueryClientProvider */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
