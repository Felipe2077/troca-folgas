// apps/frontend/src/app/(auth)/layout.tsx
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pode adicionar um wrapper div se quiser aplicar algum estilo específico
  // para todas as páginas de autenticação, ou só renderizar children.
  // Vamos manter simples por enquanto:
  return (
    <div className={`flex flex-col min-h-full bg-gradient-to-br`}>
      <main className="flex-grow container mx-auto p-4 py-6 ">{children}</main>
    </div>
  );
}
