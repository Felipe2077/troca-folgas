'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ModernNewRequestModal } from '@/components/user/ModernNewRequestModal';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@repo/shared-types';
import { useQuery } from '@tanstack/react-query';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Filter,
  Loader2,
  LogOut,
  Plus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Componentes de cards e tabela modernizados
import { ModernUserDashboardSummaryCards } from '@/components/user/ModernUserDashboardSummaryCards';
import { ModernUserRequestsTable } from '@/components/user/ModernUserRequestsTable';

// Função para buscar os meses ativos
async function fetchActiveMonths(token: string | null): Promise<string[]> {
  if (!token) return [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/requests/vigencias`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    throw new Error('Falha ao buscar vigências.');
  }
  return response.json();
}

export default function ModernEncarregadoDashboardPage() {
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    token,
    logout,
  } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query para buscar os meses com dados
  const { data: activeMonths, isLoading: isLoadingMonths } = useQuery<
    string[],
    Error
  >({
    queryKey: ['activeMonths', user?.id],
    queryFn: () => fetchActiveMonths(token),
    enabled: !!token && !!user,
  });

  const [currentMonthIndex, setCurrentMonthIndex] = useState<number | null>(
    null
  );

  // Efeito para definir o mês inicial quando os dados chegam
  useEffect(() => {
    if (activeMonths && activeMonths.length > 0 && currentMonthIndex === null) {
      setCurrentMonthIndex(0); // Começa no mês mais recente
    }
  }, [activeMonths, currentMonthIndex]);

  // Proteção de rota
  useEffect(() => {
    if (
      !isAuthLoading &&
      (!isAuthenticated || user?.role !== Role.ENCARREGADO)
    ) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, user, router]);

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
    currentMonthIndex !== null && activeMonths
      ? activeMonths[currentMonthIndex]
      : null;

  const canGoBack =
    currentMonthIndex !== null && activeMonths
      ? currentMonthIndex < activeMonths.length - 1
      : false;
  const canGoForward =
    currentMonthIndex !== null ? currentMonthIndex > 0 : false;

  // Handler para logout
  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
    router.push('/login');
  };

  // Estado de Carregamento Geral
  if (isAuthLoading || isLoadingMonths) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center z-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== Role.ENCARREGADO) {
    return null; // ou um loader, já que o redirect está no useEffect
  }

  // Se não houver meses ativos, mostra uma mensagem
  if (!activeMonths || activeMonths.length === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-50">
        {/* Header */}
        <header className="border-b border-gray-700/30 bg-gray-900/60 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                <h1 className="text-xl font-bold text-white">
                  Troca de Folgas
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-2 hover:bg-gray-700/30 px-3 py-2 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20">
              <Calendar className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Dashboard do Encarregado
              </h2>
              <p className="text-gray-400 mb-4">
                Bem-vindo,{' '}
                <span className="text-yellow-300 font-semibold">
                  {user?.name}
                </span>
                !
              </p>
              <p className="text-gray-500">
                Nenhuma solicitação encontrada para o seu usuário.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-50 overflow-auto">
      {/* Header */}
      <header className="border-b border-gray-700/30 bg-gray-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <h1 className="text-xl font-bold text-white">Troca de Folgas</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-2 hover:bg-gray-700/30 px-3 py-2 rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent mb-2">
            Dashboard do Encarregado
          </h2>
          <p className="text-gray-400 text-lg">
            Bem-vindo,{' '}
            <span className="text-yellow-300 font-semibold">{user?.name}</span>!
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Visão Geral</h3>
          </div>

          {selectedMonth && (
            <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm rounded-2xl p-2 border border-yellow-500/20">
              <button
                onClick={() => handleMonthChange(1)}
                disabled={!canGoBack}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  canGoBack
                    ? 'hover:bg-yellow-500/10 text-gray-400 hover:text-yellow-300 cursor-pointer border border-transparent hover:border-yellow-500/30'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 px-4 py-2">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-semibold min-w-[120px] text-center">
                  {format(
                    parse(selectedMonth, 'yyyy-MM', new Date()),
                    'MMMM yyyy',
                    { locale: ptBR }
                  )}
                </span>
              </div>
              <button
                onClick={() => handleMonthChange(-1)}
                disabled={!canGoForward}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  canGoForward
                    ? 'hover:bg-yellow-500/10 text-gray-400 hover:text-yellow-300 cursor-pointer border border-transparent hover:border-yellow-500/30'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Renderiza os componentes filhos apenas se um mês for selecionado */}
        {selectedMonth && (
          <>
            {/* Summary Cards Modernizados */}
            <ModernUserDashboardSummaryCards selectedMonth={selectedMonth} />

            {/* Actions Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">
                  Minhas Solicitações
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-yellow-500/25 w-full sm:w-auto border-0">
                        <Plus className="h-5 w-5" />
                        <span>Nova Solicitação</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-black/95 backdrop-blur-sm border-yellow-500/30 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">
                          Criar Nova Solicitação
                        </DialogTitle>
                      </DialogHeader>
                      <ModernNewRequestModal onOpenChange={setIsModalOpen} />
                    </DialogContent>
                  </Dialog>

                  <div className="flex space-x-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="bg-black/40 hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-300 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border-yellow-500/30 hover:border-yellow-500/50 flex-1 sm:flex-initial"
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filtros</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-black/40 hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-300 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border-yellow-500/30 hover:border-yellow-500/50 flex-1 sm:flex-initial"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela Modernizada */}
            <ModernUserRequestsTable
              submittedById={user.id}
              selectedMonth={selectedMonth}
            />
          </>
        )}
      </div>
    </div>
  );
}
