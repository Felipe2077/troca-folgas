// apps/frontend/src/components/Header.tsx
import Link from 'next/link'; // Para links de navegação futuros

export function Header() {
  return (
    <header className="bg-zinc-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Link para a Home (depois podemos ajustar a rota exata) */}
        <Link href="/" className="text-xl font-semibold hover:text-gray-300">
          Sistema de Troca de Folgas
        </Link>
        <nav>
          {/* Aqui podemos adicionar links ou botão de Login/Logout depois */}
          {/* <Link href="/login" className="hover:text-gray-300">Login</Link> */}
        </nav>
      </div>
    </header>
  );
}
