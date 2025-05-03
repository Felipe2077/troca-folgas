// apps/frontend/src/components/admin/DashboardFilters.tsx - LAYOUT COM FLEXBOX
'use client';

import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/daterangepicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  EmployeeFunction,
  ReliefGroup,
  SwapEventType,
  SwapStatus,
} from '@repo/shared-types';
import { X } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Atualiza Props para os novos filtros de data
interface DashboardFiltersProps {
  statusFilter: SwapStatus | 'ALL';
  setStatusFilter: (value: SwapStatus | 'ALL') => void;
  swapDateRange: DateRange | undefined;
  setSwapDateRange: (value: DateRange | undefined) => void; // <-- Mudou
  paybackDateRange: DateRange | undefined;
  setPaybackDateRange: (value: DateRange | undefined) => void; // <-- Novo
  employeeIdOutFilter: string;
  setEmployeeIdOutFilter: (value: string) => void;
  employeeIdInFilter: string;
  setEmployeeIdInFilter: (value: string) => void;
  employeeFunctionFilter: EmployeeFunction | 'ALL';
  setEmployeeFunctionFilter: (value: EmployeeFunction | 'ALL') => void;
  groupOutFilter: ReliefGroup | 'ALL';
  setGroupOutFilter: (value: ReliefGroup | 'ALL') => void;
  groupInFilter: ReliefGroup | 'ALL';
  setGroupInFilter: (value: ReliefGroup | 'ALL') => void;
  eventTypeFilter: SwapEventType | 'ALL';
  setEventTypeFilter: (value: SwapEventType | 'ALL') => void;
}

// Constantes de opções (inalteradas)
const employeeFunctionOptions = Object.values(EmployeeFunction);
const reliefGroupOptions = Object.values(ReliefGroup);
const swapEventTypeOptions = Object.values(SwapEventType);
const swapStatusOptions = Object.values(SwapStatus);

export function DashboardFilters({
  statusFilter,
  setStatusFilter,
  swapDateRange,
  setSwapDateRange, // <-- Mudou
  paybackDateRange,
  setPaybackDateRange, // <-- Novo
  employeeIdOutFilter,
  setEmployeeIdOutFilter,
  employeeIdInFilter,
  setEmployeeIdInFilter,
  employeeFunctionFilter,
  setEmployeeFunctionFilter,
  groupOutFilter,
  setGroupOutFilter,
  groupInFilter,
  setGroupInFilter,
  eventTypeFilter,
  setEventTypeFilter,
}: DashboardFiltersProps) {
  const clearFilters = () => {
    setStatusFilter('ALL');
    setSwapDateRange(undefined); // <-- Mudou
    setPaybackDateRange(undefined); // <-- Novo
    setEmployeeIdOutFilter('');
    setEmployeeIdInFilter('');
    setEmployeeFunctionFilter('ALL');
    setGroupOutFilter('ALL');
    setGroupInFilter('ALL');
    setEventTypeFilter('ALL');
  };

  return (
    // Container usa flex, wrap e alinha itens na base (items-end)
    <div className="flex flex-wrap justify-between items-end gap-x-4 gap-y-2 mb-4 p-4 border rounded-lg bg-card">
      {/* Filtro Status */}
      <div className="grid gap-1.5">
        {' '}
        <Label htmlFor="status-filter" className="text-xs">
          Status:
        </Label>{' '}
        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v === 'ALL' ? 'ALL' : (v as SwapStatus))
          }
        >
          {' '}
          <SelectTrigger id="status-filter" className="h-8 w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>{' '}
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            {swapStatusOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>{' '}
        </Select>{' '}
      </div>
      {/* Filtro Crachá Saída */}
      <div className="grid gap-1.5">
        {' '}
        <Label htmlFor="idOut-filter" className="text-xs">
          Crachá Sai:
        </Label>{' '}
        <Input
          id="idOut-filter"
          placeholder="Crachá..."
          value={employeeIdOutFilter}
          onChange={(e) => setEmployeeIdOutFilter(e.target.value)}
          className="h-8 w-full"
        />{' '}
      </div>
      {/* Filtro Crachá Entrada */}
      <div className="grid gap-1.5">
        {' '}
        <Label htmlFor="idIn-filter" className="text-xs">
          Crachá Entra:
        </Label>{' '}
        <Input
          id="idIn-filter"
          placeholder="Crachá..."
          value={employeeIdInFilter}
          onChange={(e) => setEmployeeIdInFilter(e.target.value)}
          className="h-8 w-full"
        />{' '}
      </div>
      {/* Filtro Função */}
      <div className="grid gap-1.5">
        {' '}
        <Label htmlFor="function-filter" className="text-xs">
          Função:
        </Label>{' '}
        <Select
          value={employeeFunctionFilter}
          onValueChange={(v) =>
            setEmployeeFunctionFilter(
              v === 'ALL' ? 'ALL' : (v as EmployeeFunction)
            )
          }
        >
          {' '}
          <SelectTrigger id="function-filter" className="h-8 w-full">
            <SelectValue placeholder="Função" />
          </SelectTrigger>{' '}
          <SelectContent>
            {/*...*/}
            <SelectItem value="ALL">Todas</SelectItem>
            {employeeFunctionOptions.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>{' '}
        </Select>{' '}
      </div>
      {/* Filtro Tipo Evento */}
      <div className="grid gap-1.5">
        {' '}
        <Label htmlFor="eventType-filter" className="text-xs">
          Tipo:
        </Label>{' '}
        <Select
          value={eventTypeFilter}
          onValueChange={(v) =>
            setEventTypeFilter(v === 'ALL' ? 'ALL' : (v as SwapEventType))
          }
        >
          {' '}
          <SelectTrigger id="eventType-filter" className="h-8 w-full">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>{' '}
          <SelectContent>
            {/*...*/}
            <SelectItem value="ALL">Todos</SelectItem>
            {swapEventTypeOptions.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>{' '}
        </Select>{' '}
      </div>

      {/* Filtro Grupo Saída */}
      <div className="grid gap-1.5">
        {' '}
        <Label htmlFor="groupOut-filter" className="text-xs">
          Grupo Sai:
        </Label>{' '}
        <Select
          value={groupOutFilter}
          onValueChange={(v) =>
            setGroupOutFilter(v === 'ALL' ? 'ALL' : (v as ReliefGroup))
          }
        >
          {' '}
          <SelectTrigger id="groupOut-filter" className="h-8 w-full">
            <SelectValue placeholder="Grupo Saída" />
          </SelectTrigger>{' '}
          <SelectContent>
            {/*...*/}
            <SelectItem value="ALL">Todos</SelectItem>
            {reliefGroupOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>{' '}
        </Select>{' '}
      </div>
      {/* Filtro Grupo Entrada */}
      <div className="grid gap-1.5">
        {' '}
        <Label htmlFor="groupIn-filter" className="text-xs">
          Grupo Entra:
        </Label>{' '}
        <Select
          value={groupInFilter}
          onValueChange={(v) =>
            setGroupInFilter(v === 'ALL' ? 'ALL' : (v as ReliefGroup))
          }
        >
          {' '}
          <SelectTrigger id="groupIn-filter" className="h-8 w-full">
            <SelectValue placeholder="Grupo Entrada" />
          </SelectTrigger>{' '}
          <SelectContent>
            {/*...*/}
            <SelectItem value="ALL">Todos</SelectItem>
            {reliefGroupOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>{' '}
        </Select>{' '}
      </div>

      {/* *** MODIFICADO/ADICIONADO: Filtros de Data Específicos *** */}
      {/* Filtro Data Troca */}
      <div className="grid gap-1.5 md:col-span-2">
        {' '}
        {/* Ocupa mais espaço */}
        <Label htmlFor="swap-date-filter" className="text-xs">
          Período Data Troca:
        </Label>
        <DateRangePicker
          id="swap-date-filter"
          date={swapDateRange}
          setDate={setSwapDateRange}
        />
      </div>
      {/* Filtro Data Pagamento */}
      <div className="grid gap-1.5 md:col-span-2">
        {' '}
        {/* Ocupa mais espaço */}
        <Label htmlFor="payback-date-filter" className="text-xs">
          Período Data Pagamento:
        </Label>
        <DateRangePicker
          id="payback-date-filter"
          date={paybackDateRange}
          setDate={setPaybackDateRange}
        />
      </div>
      {/* *** FIM DA MODIFICAÇÃO/ADIÇÃO DE DATAS *** */}

      {/* Botão Limpar Filtros */}
      <div className="flex items-end">
        <Button
          variant="outline"
          onClick={clearFilters}
          title="Limpar todos os filtros"
          size="sm"
          className="h-8 w-full"
        >
          {' '}
          <X className="h-4 w-4 mr-1" /> Limpar
        </Button>
      </div>
    </div>
  );
}
