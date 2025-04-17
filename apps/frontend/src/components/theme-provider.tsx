// apps/frontend/src/components/theme-provider.tsx
'use client'; // Necessário pois usa hooks (useState, useEffect) internamente

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // atributo="class" -> adiciona/remove a classe .dark no <html>
  // defaultTheme="system" -> usa o tema do sistema como padrão inicial
  // enableSystem -> permite que o tema siga o sistema
  // disableTransitionOnChange -> evita piscar cores em transições de rota
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
