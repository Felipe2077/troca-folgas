// apps/frontend/src/app/admin/settings/page.tsx - Import CORRIGIDO
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
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
// ***** CORRIGIDO O IMPORT DO SELECT *****
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // <-- CORRIGIDO: Importa do Shadcn UI local
// ***** FIM DA CORREÇÃO *****
import { DayOfWeek, Role, Settings } from '@repo/shared-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react'; // Importa FormEvent e React
import { toast } from 'sonner';
import { z } from 'zod';

const dayOfWeekPortuguese: Record<DayOfWeek, string> = {
  SUNDAY: 'Domingo',
  MONDAY: 'Segunda-feira',
  TUESDAY: 'Terça-feira',
  WEDNESDAY: 'Quarta-feira',
  THURSDAY: 'Quinta-feira',
  FRIDAY: 'Sexta-feira',
  SATURDAY: 'Sábado',
};

// Array com os valores do Enum na ordem desejada para o dropdown
const orderedDaysOfWeek: DayOfWeek[] = [
  DayOfWeek.SUNDAY,
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
];

// --- Funções de API Call ---
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

interface SettingsFormData {
  submissionStartDay: DayOfWeek;
  submissionEndDay: DayOfWeek;
}
type FormattedErrors = z.ZodFormattedError<SettingsFormData> | null;
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
      method: 'PUT',
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
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [startDay, setStartDay] = useState<DayOfWeek | undefined>(undefined);
  const [endDay, setEndDay] = useState<DayOfWeek | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  const [validationErrors, setValidationErrors] =
    useState<FormattedErrors>(null);

  const {
    data: currentSettings,
    isLoading: isLoadingSettings,
    isError: isSettingsError,
    error: settingsError,
  } = useQuery<Settings, Error>({
    queryKey: ['settings'],
    queryFn: () => fetchSettings(token),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (currentSettings) {
      console.log('[useEffect] currentSettings received:', currentSettings); // LOG 1
      setStartDay(currentSettings.submissionStartDay);
      setEndDay(currentSettings.submissionEndDay);
      console.log('[useEffect] Setting state to:', {
        start: currentSettings.submissionStartDay,
        end: currentSettings.submissionEndDay,
      }); // LOG 2
    }
  }, [currentSettings]);

  const updateSettingsMutation = useMutation<Settings, Error, SettingsFormData>(
    {
      mutationFn: (newSettingsData) =>
        updateSettingsApi({ settingsData: newSettingsData, token }),
      onSuccess: (updatedSettings) => {
        console.log('Configurações salvas:', updatedSettings);
        queryClient.setQueryData(['settings'], updatedSettings);
        toast.success('Configurações salvas com sucesso!');
        setFormError(null);
      },
      onError: (error) => {
        toast.error(error.message || 'Erro ao salvar configurações.');
        setFormError(error.message);
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    if (!startDay || !endDay) {
      setFormError('Por favor, selecione os dias de início e fim.');
      return;
    }
    const formData: SettingsFormData = {
      submissionStartDay: startDay,
      submissionEndDay: endDay,
    };
    updateSettingsMutation.mutate(formData);
  };

  return (
    <ProtectedRoute allowedRoles={[Role.ADMINISTRADOR]}>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
          <CardDescription>
            Ajuste os parâmetros de funcionamento da aplicação.
          </CardDescription>
        </CardHeader>
        {!isLoadingSettings && !isSettingsError && currentSettings && (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDay">Dia de Início da Janela</Label>
                  <Select
                    value={startDay}
                    key={startDay ?? 'initial-start'}
                    onValueChange={(value: DayOfWeek) => {
                      setStartDay(value);
                      setValidationErrors(null); // Mantém limpeza de erro
                    }}
                    disabled={updateSettingsMutation.isPending}
                    required
                  >
                    <SelectTrigger id="startDay">
                      <SelectValue placeholder="Selecione o dia inicial" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderedDaysOfWeek.map((dayValue) => (
                        <SelectItem key={dayValue} value={dayValue}>
                          {/* Usa o mapeamento para exibir em Português */}
                          {dayOfWeekPortuguese[dayValue]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors?.submissionStartDay?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.submissionStartDay._errors[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDay">Dia Final da Janela</Label>
                  <Select
                    value={endDay}
                    key={endDay ?? 'initial-end'}
                    onValueChange={(value: DayOfWeek) => {
                      setEndDay(value);
                      setValidationErrors(null); // Mantém limpeza de erro
                    }}
                    disabled={updateSettingsMutation.isPending}
                    required
                  >
                    <SelectTrigger id="endDay">
                      <SelectValue placeholder="Selecione o dia final" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderedDaysOfWeek.map((dayValue) => (
                        <SelectItem key={dayValue} value={dayValue}>
                          {/* Usa o mapeamento para exibir em Português */}
                          {dayOfWeekPortuguese[dayValue]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors?.submissionEndDay?._errors?.[0] && (
                    <p className="text-sm font-medium text-destructive">
                      {validationErrors.submissionEndDay._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground md:col-span-2">
                Período da semana em que os encarregados podem submeter novas
                solicitações.
              </p>
              {formError && (
                <p className="text-sm font-medium text-destructive">
                  {formError}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="mt-5"
                type="submit"
                disabled={updateSettingsMutation.isPending}
              >
                {updateSettingsMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...{' '}
                  </>
                ) : (
                  'Salvar Configurações'
                )}
              </Button>
            </CardFooter>
          </form>
        )}
        {isLoadingSettings && (
          <CardContent>
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        )}
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
