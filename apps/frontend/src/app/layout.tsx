// apps/frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// Importe os componentes (ajuste o caminho se não usar alias '@/')
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Troca de Folgas',
  description: 'Gerenciamento de trocas e substituições de folgas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`${inter.className} flex flex-col min-h-full bg-gray-50`}
      >
        <Header /> {/* Renderiza o Cabeçalho */}
        {/* Área principal que ocupa o espaço restante */}
        <main className="flex-grow container mx-auto p-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
