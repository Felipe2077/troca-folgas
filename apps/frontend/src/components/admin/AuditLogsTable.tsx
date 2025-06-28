// apps/frontend/src/components/admin/AuditLogsTable.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { AuditLogListQuery } from '@repo/shared-types';
import { Loader2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Importar Input
import { Label } from '@/components/ui/label'; // Importar Label
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Importar Select
import { DateRangePicker } from '@/components/ui/daterangepicker'; // Importar DateRangePicker
import { formatDate } from '@/lib/utils';
import { DateRange } from 'react-day-picker'; // Importar DateRange
import { format, parseISO } from 'date-fns'; // Importar funções de data

interface AuditLog {
  id: number;
  timestamp: string;
  action: string;
  details: string | null;
  userId: number;
  userLoginIdentifier: string;
  targetResourceId: number | null;
  targetResourceType: string | null;
  performedBy: {
    name: string;
    loginIdentifier: string;
    role: string;
  };
}

// Função auxiliar para formatar os detalhes do log
function formatAuditDetails(log: AuditLog): string {
  const userName = log.performedBy.name || log.performedBy.loginIdentifier;
  const targetId = log.targetResourceId ? `ID: ${log.targetResourceId}` : '';
  const targetType = log.targetResourceType || '';

  switch (log.action) {
    case 'USER_LOGIN':
      return `Usuário ${userName} (${log.performedBy.loginIdentifier}) fez login.`;
    case 'ADMIN_CREATE_USER':
      // Assumindo que log.details contém algo como "Admin created user 'Nome' (ID: X) with role Y." ou similar
      // Podemos tentar extrair mais, mas por enquanto, uma versão mais genérica.
      return `Admin ${userName} (${log.performedBy.loginIdentifier}) criou o usuário ${log.details?.split('')[1] || '[Nome Desconhecido]'}.`;
    case 'CREATE_SWAP_REQUEST':
      // Ex: "User created swap request 3 (TROCA) from 12345 to 543211."
      const partsCreate = log.details?.match(/User created swap request (\d+) \(([^)]+)\) from (\d+) to (\d+)/);
      if (partsCreate) {
        return `Solicitação de Troca ${partsCreate[2]} (ID: ${partsCreate[1]}) de ${partsCreate[3]} para ${partsCreate[4]} criada por ${userName}.`;
      }
      return `Solicitação de Troca criada por ${userName}.`;
    case 'UPDATE_REQUEST_STATUS':
      // Ex: "Status set to AGENDADO."
      const statusMatch = log.details?.match(/Status set to (\w+)/);
      const newStatus = statusMatch ? statusMatch[1] : '[Status Desconhecido]';
      return `Status da solicitação ${targetId} (${targetType}) atualizado para ${newStatus} por ${userName}.`;
    case 'UPDATE_REQUEST_OBSERVATION':
      return `Observação da solicitação ${targetId} (${targetType}) atualizada por ${userName}.`;
    case 'DELETE_SWAP_REQUEST':
      return `Solicitação de Troca ${targetId} (${targetType}) deletada por ${userName}.`;
    case 'ADMIN_UPDATE_USER':
      // Ex: "Admin updated user Nome (ID: X). Changes: {"role":"ENCARREGADO"}"
      const userUpdateMatch = log.details?.match(/Admin updated user ([^\.]+)\. Changes: (.+)/);
      if (userUpdateMatch) {
        const updatedUserName = userUpdateMatch[1];
        const changes = userUpdateMatch[2];
        return `Admin ${userName} atualizou o usuário ${updatedUserName}. Alterações: ${changes}.`;
      }
      return `Admin ${userName} atualizou um usuário.`;
    default:
      return log.details || '-'; // Retorna o original se não houver mapeamento
  }
}

const actionMap: Record<string, string> = {
  USER_LOGIN: 'Login de Usuário',
  ADMIN_CREATE_USER: 'Admin Criou Usuário',
  CREATE_SWAP_REQUEST: 'Criou Solicitação de Troca',
  UPDATE_REQUEST_STATUS: 'Atualizou Status da Solicitação',
  UPDATE_REQUEST_OBSERVATION: 'Atualizou Observação da Solicitação',
  DELETE_SWAP_REQUEST: 'Deletou Solicitação de Troca',
  // Adicione mais mapeamentos conforme necessário
};

export function AuditLogsTable() {
  const { token } = useAuth();
  const [queryParams, setQueryParams] = useState<AuditLogListQuery>({
    limit: 10,
    offset: 0,
    sortBy: 'timestamp',
    sortOrder: 'desc',
  });

  // Novos estados para os filtros
  const [actionFilter, setActionFilter] = useState<string | undefined>(undefined);
  const [userLoginIdentifierFilter, setUserLoginIdentifierFilter] = useState<string | undefined>(undefined);
  const [timestampRange, setTimestampRange] = useState<DateRange | undefined>(undefined);

  const { data, isLoading, isError, error } = useQuery<{
    auditLogs: AuditLog[];
    totalCount: number;
  }, Error>({
    queryKey: ['auditLogs', queryParams, actionFilter, userLoginIdentifierFilter, timestampRange], // Query key inclui novos filtros
    queryFn: async () => {
      const params = new URLSearchParams();
      // Adicionar parâmetros de paginação e ordenação
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });

      // Adicionar novos parâmetros de filtro
      if (actionFilter) {
        params.append('action', actionFilter);
      }
      if (userLoginIdentifierFilter) {
        params.append('userLoginIdentifier', userLoginIdentifierFilter);
      }
      if (timestampRange?.from) {
        params.append('timestampStart', format(timestampRange.from, 'yyyy-MM-dd'));
      }
      if (timestampRange?.to) {
        params.append('timestampEnd', format(timestampRange.to, 'yyyy-MM-dd'));
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/audit?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar logs de auditoria.');
      }
      return response.json();
    },
  });

  const handleSort = (column: AuditLogListQuery['sortBy']) => {
    setQueryParams((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  const renderSortIcon = (column: AuditLogListQuery['sortBy']) => {
    if (queryParams.sortBy !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return queryParams.sortOrder === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" /> Carregando logs...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-destructive">
        Erro ao carregar logs: {error?.message}
      </div>
    );
  }

  const auditLogs = data?.auditLogs || [];
  const totalCount = data?.totalCount || 0;

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setActionFilter(undefined);
    setUserLoginIdentifierFilter(undefined);
    setTimestampRange(undefined);
    setQueryParams({
      limit: 10,
      offset: 0,
      sortBy: 'timestamp',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4 mb-4 p-4 border rounded-lg bg-card">
        {/* Filtro de Ação */}
        <div className="grid gap-1.5">
          <Label htmlFor="action-filter" className="text-xs">Ação:</Label>
          <Select
            value={actionFilter || ''}
            onValueChange={(value) => setActionFilter(value === '' ? undefined : value)}
          >
            <SelectTrigger id="action-filter" className="h-8 w-[180px]">
              <SelectValue placeholder="Todas as Ações" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={undefined}>Todas as Ações</SelectItem>
              {Object.entries(actionMap).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Usuário */}
        <div className="grid gap-1.5">
          <Label htmlFor="user-filter" className="text-xs">Crachá Usuário:</Label>
          <Input
            id="user-filter"
            placeholder="Crachá..."
            value={userLoginIdentifierFilter || ''}
            onChange={(e) => setUserLoginIdentifierFilter(e.target.value === '' ? undefined : e.target.value)}
            className="h-8 w-[180px]"
          />
        </div>

        {/* Filtro de Período */}
        <div className="grid gap-1.5">
          <Label htmlFor="timestamp-filter" className="text-xs">Período:</Label>
          <DateRangePicker
            id="timestamp-filter"
            date={timestampRange}
            setDate={setTimestampRange}
          />
        </div>

        {/* Botão Limpar Filtros */}
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={clearFilters}
            title="Limpar todos os filtros"
            size="sm"
            className="h-8"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('timestamp')} className="px-0 justify-start">
                Timestamp {renderSortIcon('timestamp')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('action')} className="px-0 justify-start">
                Ação {renderSortIcon('action')}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('userLoginIdentifier')} className="px-0 justify-start">
                Usuário {renderSortIcon('userLoginIdentifier')}
              </Button>
            </TableHead>
            <TableHead>Detalhes</TableHead>
            <TableHead>Recurso Alvo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.length > 0 ? (
            auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{formatDate(log.timestamp)}</TableCell>
                <TableCell>{actionMap[log.action] || log.action}</TableCell>
                <TableCell>
                  {log.performedBy.name} ({log.performedBy.loginIdentifier})
                </TableCell>
                <TableCell>{formatAuditDetails(log)}</TableCell>
                <TableCell>
                  {log.targetResourceType && log.targetResourceId ? `${log.targetResourceType} (ID: ${log.targetResourceId})` : log.targetResourceType || '-'}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                Nenhum log de auditoria encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação (simplificada por enquanto) */}
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setQueryParams(prev => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }))}
          disabled={queryParams.offset === 0}
        >
          Anterior
        </Button>
        <span>
          Mostrando {queryParams.offset + 1} - {Math.min(queryParams.offset + queryParams.limit, totalCount)} de {totalCount}
        </span>
        <Button
          onClick={() => setQueryParams(prev => ({ ...prev, offset: prev.offset + prev.limit }))}
          disabled={queryParams.offset + queryParams.limit >= totalCount}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
