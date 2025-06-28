// apps/frontend/src/app/(app)/encarregado/dashboard/page.tsx
'use client';

import { Button } from '@/components/ui/button'; // Importar Button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'; // Importar Dialog
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Importar Select
import { NewRequestModal } from '@/components/user/NewRequestModal';
import { UserDashboardSummaryCards } from '@/components/user/UserDashboardSummaryCards';
import { UserRequestsTable } from '@/components/user/UserRequestsTable';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@repo/shared-types';
import { useQuery } from '@tanstack/react-query';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Função para buscar os meses ativos
async function fetchActiveMonths(token: string | null): Promise<string[]> {
  if (!token) return [];
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests/vigencias`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Falha ao buscar vigências.');
  }
  return response.json();
}

export default function EncarregadoDashboardPage() {
  const { user, isAuthenticated, isLoading: isAuthLoading, token } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query para buscar os meses com dados
  const { data: activeMonths, isLoading: isLoadingMonths } = useQuery<string[], Error>({
    queryKey: ['activeMonths', user?.id],
    queryFn: () => fetchActiveMonths(token),
    enabled: !!token && !!user,
  });

  const [currentMonthIndex, setCurrentMonthIndex] = useState<number | null>(null);

  // Efeito para definir o mês inicial quando os dados chegam
  useEffect(() => {
    if (activeMonths && activeMonths.length > 0 && currentMonthIndex === null) {
      setCurrentMonthIndex(0); // Começa no mês mais recente
    }
  }, [activeMonths, currentMonthIndex]);

  // Lógica de navegação
  const handleMonthChange = (increment: number) => {
    if (currentMonthIndex === null) return;
    const newIndex = currentMonthIndex + increment;
    if (activeMonths && newIndex >= 0 && newIndex < activeMonths.length) {
      setCurrentMonthIndex(newIndex);
    }
  };

  // Deriva o mês selecionado a partir do índice
  const selectedMonth = 
    currentMonthIndex !== null && activeMonths ? activeMonths[currentMonthIndex] : null;

  const canGoBack = currentMonthIndex !== null && activeMonths ? currentMonthIndex < activeMonths.length - 1 : false;
  const canGoForward = currentMonthIndex !== null ? currentMonthIndex > 0 : false;

  // Proteção de rota
  useEffect(() => {
    if (!isAuthLoading && (!isAuthenticated || user?.role !== Role.ENCARREGADO)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, user, router]);

  // Estado de Carregamento Geral
  if (isAuthLoading || isLoadingMonths) {
    return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!isAuthenticated || user?.role !== Role.ENCARREGADO) {
    return null; // ou um loader, já que o redirect está no useEffect
  }
  
  // Se não houver meses ativos, mostra uma mensagem
  if (!activeMonths || activeMonths.length === 0) {
      return (
        <div className="container mx-auto py-10 text-center">
            <h1 className="text-4xl font-extrabold mb-2 text-primary-foreground drop-shadow-lg">
                Dashboard do Encarregado
            </h1>
            <p className="text-lg text-muted-foreground mt-8">Nenhuma solicitação encontrada para o seu usuário.</p>
        </div>
      )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-extrabold mb-2 text-center text-primary-foreground drop-shadow-lg">
        Dashboard do Encarregado
      </h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Bem-vindo, <span className="font-semibold text-primary-foreground">{user?.name}</span>!
      </p>
      
      {/* Navegação de Vigências */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-foreground">Visão Geral</h2>
        {selectedMonth && (
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => handleMonthChange(1)} disabled={!canGoBack}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
            </Button>
            <div className="text-lg font-semibold text-center min-w-[200px]">
              {format(parse(selectedMonth, 'yyyy-MM', new Date()), 'MMMM yyyy', { locale: ptBR })}
            </div>
            <Button variant="outline" onClick={() => handleMonthChange(-1)} disabled={!canGoForward}>
              Seguinte <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Renderiza os componentes filhos apenas se um mês for selecionado */}
      {selectedMonth && (
        <>
          <UserDashboardSummaryCards selectedMonth={selectedMonth} />
          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-2xl font-bold text-primary-foreground">Minhas Solicitações</h2>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>Nova Solicitação</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Criar Nova Solicitação</DialogTitle>
                </DialogHeader>
                <NewRequestModal onOpenChange={setIsModalOpen} />
              </DialogContent>
            </Dialog>
          </div>
          <UserRequestsTable submittedById={user.id} selectedMonth={selectedMonth} />
        </>
      )}
    </div>
  );
