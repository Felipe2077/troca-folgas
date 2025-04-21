// apps/frontend/src/app/layout.tsx
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} flex flex-col min-h-full flex-1 text-foreground bg-[#131313]`}
      >
        <Providers>
          <main>{children}</main>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}

// bg-gradient-to-br from-[#111] via-[#252525] to-[#111]
