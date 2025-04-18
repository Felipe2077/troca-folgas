// apps/frontend/src/app/admin/settings/page.tsx
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext'; // Para pegar token
import { Role, Settings } from '@repo/shared-types'; // Importa tipos
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react'; // Import FormEvent

// --- Tipo para os dados do formulário ---
interface SettingsFormData {
  submissionDeadlineDays: number;
  // Adicionar outros campos aqui no futuro
}

// --- Função para BUSCAR Settings ---
async function fetchSettings(token: string | null): Promise<Settings> {
  if (!token) {
    throw new Error('Token não encontrado para buscar configurações.');
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(errorData.message || 'Falha ao buscar configurações.');
  }
  const data = await response.json();
  if (!data.settings)
    throw new Error("Resposta da API inválida (sem 'settings')");
  return data.settings;
}

// --- Função para ATUALIZAR Settings ---
interface UpdateSettingsParams {
  settingsData: SettingsFormData;
  token: string | null;
}
async function updateSettingsApi({
  settingsData,
  token,
}: UpdateSettingsParams): Promise<Settings> {
  if (!token) {
    throw new Error('Token não encontrado para atualizar configurações.');
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
    {
      method: 'PUT', // Usando PUT para substituir as configurações
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settingsData),
    }
  );
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Erro ${response.status}` }));
    throw new Error(errorData.message || 'Falha ao atualizar configurações.');
  }
  const data = await response.json();
  if (!data.settings)
    throw new Error("Resposta da API inválida (sem 'settings')");
  return data.settings;
}

// --- Componente da Página ---
export default function SettingsPage() {
  const { token } = useAuth(); // Pega o token do contexto para as chamadas API
  const queryClient = useQueryClient();

  // Estado local para o valor do input (controlado)
  // Iniciamos com string vazia, pois o input type number às vezes lida melhor
  const [deadlineDays, setDeadlineDays] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null); // Para erros de validação local

  // Query para buscar as configurações atuais
  const {
    data: currentSettings,
    isLoading: isLoadingSettings,
    isError: isSettingsError,
    error: settingsError,
  } = useQuery<Settings, Error>({
    queryKey: ['settings'],
    queryFn: () => fetchSettings(token),
    enabled: !!token, // Só roda se tiver token
    staleTime: 5 * 60 * 1000, // Cache por 5 min
  });

  // Efeito para preencher o input quando os dados da query chegarem/mudarem
  useEffect(() => {
    if (currentSettings) {
      setDeadlineDays(String(currentSettings.submissionDeadlineDays)); // Popula o estado local
    }
  }, [currentSettings]);

  // Mutação para salvar as configurações
  const updateSettingsMutation = useMutation<Settings, Error, SettingsFormData>(
    {
      mutationFn: (newSettingsData) =>
        updateSettingsApi({ settingsData: newSettingsData, token }),
      onSuccess: (updatedSettings) => {
        console.log('Configurações salvas:', updatedSettings);
        // Atualiza o cache do useQuery localmente com os dados novos para UI instantânea
        queryClient.setQueryData(['settings'], updatedSettings);
        // OU poderia invalidar para refetch: queryClient.invalidateQueries({ queryKey: ['settings'] });
        alert('Configurações salvas com sucesso!');
        setFormError(null); // Limpa erro anterior
      },
      onError: (error) => {
        console.error('Erro ao salvar configurações:', error);
        setFormError(error.message); // Guarda erro para exibir
        // alert(`Erro ao salvar: ${error.message}`); // Pode remover o alert se exibir o erro
      },
    }
  );

  // Handler para o submit do formulário
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    // Validação local simples antes de enviar
    const days = parseInt(deadlineDays, 10);
    if (isNaN(days) || days < 0 || !Number.isInteger(days)) {
      // Verifica se é inteiro não negativo
      setFormError(
        'Prazo inválido. Por favor, insira um número inteiro igual ou maior que zero.'
      );
      return;
    }

    const formData: SettingsFormData = {
      submissionDeadlineDays: days,
      // Adicione outros campos aqui no futuro
    };

    // Dispara a mutação
    updateSettingsMutation.mutate(formData);
  };

  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card className="w-full max-w-lg mx-auto">
        {' '}
        {/* Centraliza card */}
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
          <CardDescription>
            Ajuste os parâmetros de funcionamento da aplicação.
          </CardDescription>
        </CardHeader>
        {/* Só renderiza o formulário após carregar as configs */}
        {!isLoadingSettings && !isSettingsError && currentSettings && (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="deadlineDays">
                  Prazo Limite para Submissão (dias antes da troca)
                </Label>
                <Input
                  id="deadlineDays"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={deadlineDays} // Controlado pelo estado
                  onChange={(e) => setDeadlineDays(e.target.value)} // Atualiza estado string
                  disabled={updateSettingsMutation.isPending} // Desabilita durante save
                  className="w-24" // Largura menor
                />
                <p className="text-sm text-muted-foreground">
                  Número de dias de antecedência que uma solicitação pode ser
                  feita antes da data da troca. Ex: 7 significa até 7 dias
                  antes.
                </p>
                {/* Exibe erro de validação/submissão do formulário */}
                {formError && (
                  <p className="text-sm font-medium text-destructive">
                    {formError}
                  </p>
                )}
              </div>
              {/* FUTURO: Adicionar outros campos de configuração aqui */}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={updateSettingsMutation.isPending}>
                {updateSettingsMutation.isPending ? (
                  <>
                    {' '}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                    Salvando...{' '}
                  </>
                ) : (
                  'Salvar Configurações'
                )}
              </Button>
            </CardFooter>
          </form>
        )}
        {/* Indicador de Loading enquanto busca configurações iniciais */}
        {isLoadingSettings && (
          <CardContent>
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        )}
        {/* Indicador de Erro ao buscar configurações iniciais */}
        {isSettingsError && !isLoadingSettings && (
          <CardContent>
            <p className="text-sm font-medium text-destructive">
              Erro ao carregar configurações iniciais: {settingsError?.message}
            </p>
          </CardContent>
        )}
      </Card>
    </ProtectedRoute>
  );
}
