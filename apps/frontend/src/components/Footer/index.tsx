// apps/frontend/src/components/Footer.tsx

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-muted-foreground p-4 mt-auto text-center text-sm">
      <p>
        &copy; {currentYear} Seu Nome/Empresa Aqui. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
