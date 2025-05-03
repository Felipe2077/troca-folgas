// apps/frontend/src/app/(app)/layout.tsx
// Este pode ser Server Component, pois Header é Client Component interno
import { Footer } from '@/components/Footer'; // Ajuste o path se mudou algo
import { Header } from '@/components/Header'; // Ajuste o path se mudou algo
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // Estrutura flex que tínhamos antes no RootLayout
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow w-full max-w-full px-4 sm:px-6 lg:px-16 py-6">
        {/* Exemplo de padding */}
        {children}
      </main>{' '}
      <Footer />
    </div>
  );
}
