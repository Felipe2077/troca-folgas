// apps/frontend/src/components/Footer.tsx

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 text-gray-600 p-4 mt-auto text-center text-sm">
      {/* mt-auto garante que ele seja empurrado para baixo em layouts flex-col */}
      <p>
        &copy; {currentYear} Seu Nome/Empresa Aqui. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
