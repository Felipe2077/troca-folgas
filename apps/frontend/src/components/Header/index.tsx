// apps/frontend/src/components/Header.tsx
import Link from 'next/link'; // Para links de navegação futuros
import { ThemeToggleButton } from '../theme-toggle-button'; // Importa o botão

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold hover:opacity-90">
          Sistema de Troca de Folgas
        </Link>
        <nav className="flex items-center space-x-4">
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}
