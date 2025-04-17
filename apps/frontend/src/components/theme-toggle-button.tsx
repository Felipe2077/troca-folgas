// apps/frontend/src/components/theme-toggle-button.tsx
'use client';

// Importe useState e useEffect de 'react'
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();
  // Estado para saber se o componente já montou no cliente
  const [mounted, setMounted] = useState(false);

  // Efeito que roda APENAS no cliente, após a montagem inicial
  useEffect(() => {
    setMounted(true);
  }, []);

  // Se ainda não montou, não renderiza nada ou um placeholder
  // para evitar a diferença entre servidor e cliente inicial
  if (!mounted) {
    // Pode retornar null ou um placeholder de mesmo tamanho para evitar layout shift
    return <div className="h-9 w-9 p-2" aria-hidden="true"></div>; // Placeholder com tamanho similar ao botão
    // return null; // Alternativa mais simples se o layout shift não for problema
  }

  // Função de toggle (igual a antes)
  const toggleTheme = () => {
    setTheme(theme === 'light' || theme === 'system' ? 'dark' : 'light'); // Ajuste para considerar 'system'
  };

  // Renderiza o botão COM o ícone correto APÓS montar no cliente
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-200 focus:outline-none  dark:hover:bg-gray-800" // Adicionei estilo dark de exemplo
      aria-label="Alterar tema"
    >
      {/* Lógica de ícone pode ser simplificada se 'system' levar a 'light' ou 'dark' */}
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" /> // Mostra Sol no tema escuro
      ) : (
        <Moon className="h-5 w-5" /> // Mostra Lua no tema claro (ou system)
      )}
    </button>
  );
}
