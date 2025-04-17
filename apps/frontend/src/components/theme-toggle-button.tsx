// apps/frontend/src/components/theme-toggle-button.tsx
'use client';

import { Moon, Sun } from 'lucide-react'; // Ícones (Shadcn/ui geralmente instala lucide-react)
import { useTheme } from 'next-themes';

// Supondo que você terá um componente Button do Shadcn/ui depois
// Por enquanto, vamos usar um botão HTML simples estilizado com Tailwind
// import { Button } from "@/components/ui/button"; // Importaria assim depois

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      aria-label="Alterar tema"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" /> // Ícone de lua para tema escuro
      ) : (
        <Sun className="h-5 w-5" /> // Ícone de sol para tema claro
      )}
    </button>
    // <Button variant="ghost" size="icon" onClick={toggleTheme}>
    //   <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //   <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //   <span className="sr-only">Alterar tema</span>
    // </Button> // <-- Exemplo de como seria com o Button do Shadcn/ui
  );
}
