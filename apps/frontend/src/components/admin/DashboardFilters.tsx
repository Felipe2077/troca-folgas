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

interface DashboardFiltersProps {
  /* ... (Props inalteradas) ... */ statusFilter: SwapStatus | 'ALL';
  setStatusFilter: (value: SwapStatus | 'ALL') => void;
  dateRange: DateRange | undefined;
  setDateRange: (value: DateRange | undefined) => void;
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
  /* ... (recebe todas as props) ... */ statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
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
    /* ... (lógica inalterada) ... */
    setStatusFilter('ALL');
    setDateRange(undefined);
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
      {/* Filtro Crachá Saída */}
      <div className="grid gap-1.5">
        <Label htmlFor="idOut-filter" className="text-xs">
          Crachá Sai:
        </Label>
        <Input
          id="idOut-filter"
          placeholder="Crachá..."
          value={employeeIdOutFilter}
          onChange={(e) => setEmployeeIdOutFilter(e.target.value)}
          className="h-8 w-[100px]"
        />
        {/* Altura e Largura Fixas */}
      </div>
      {/* Filtro Crachá Entrada */}
      <div className="grid gap-1.5">
        <Label htmlFor="idIn-filter" className="text-xs">
          Crachá Entra:
        </Label>
        <Input
          id="idIn-filter"
          placeholder="Crachá..."
          value={employeeIdInFilter}
          onChange={(e) => setEmployeeIdInFilter(e.target.value)}
          className="h-8 w-[100px]"
        />
        {/* Altura e Largura Fixas */}
      </div>
      {/* Filtro Função */}
      <div className="grid gap-1.5">
        <Label htmlFor="function-filter" className="text-xs">
          Função:
        </Label>
        <Select
          value={employeeFunctionFilter}
          onValueChange={(v) =>
            setEmployeeFunctionFilter(
              v === 'ALL' ? 'ALL' : (v as EmployeeFunction)
            )
          }
        >
          <SelectTrigger id="function-filter" className="h-8 w-[140px]">
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todas</SelectItem>
            {employeeFunctionOptions.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Filtro Grupo Saída */}
      <div className="grid gap-1.5">
        <Label htmlFor="groupOut-filter" className="text-xs">
          Grupo Sai:
        </Label>
        <Select
          value={groupOutFilter}
          onValueChange={(v) =>
            setGroupOutFilter(v === 'ALL' ? 'ALL' : (v as ReliefGroup))
          }
        >
          <SelectTrigger id="groupOut-filter" className="h-8 w-[150px]">
            <SelectValue placeholder="Grupo Saída" />
          </SelectTrigger>
          <SelectContent>
            {/*...*/}
            <SelectItem value="ALL">Todos</SelectItem>
            {reliefGroupOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Filtro Grupo Entrada */}
      <div className="grid gap-1.5">
        <Label htmlFor="groupIn-filter" className="text-xs">
          Grupo Entra:
        </Label>
        <Select
          value={groupInFilter}
          onValueChange={(v) =>
            setGroupInFilter(v === 'ALL' ? 'ALL' : (v as ReliefGroup))
          }
        >
          <SelectTrigger id="groupIn-filter" className="h-8 w-[150px]">
            <SelectValue placeholder="Grupo Entrada" />
          </SelectTrigger>
          <SelectContent>
            {/*...*/}
            <SelectItem value="ALL">Todos</SelectItem>
            {reliefGroupOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="eventType-filter" className="text-xs">
          Tipo:
        </Label>
        <Select
          value={eventTypeFilter}
          onValueChange={(v) =>
            setEventTypeFilter(v === 'ALL' ? 'ALL' : (v as SwapEventType))
          }
        >
          <SelectTrigger id="eventType-filter" className="h-8 w-[150px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            {swapEventTypeOptions.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* gap-y menor */}
      {/* Filtro Status */}
      <div className="grid gap-1.5">
        {/* Usar grid interno para label + input */}
        <Label htmlFor="status-filter" className="text-xs">
          Status:
        </Label>
        {/* Label menor */}
        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v === 'ALL' ? 'ALL' : (v as SwapStatus))
          }
        >
          <SelectTrigger id="status-filter" className="h-8 w-[140px]">
            {/* Altura e Largura Fixas */}
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            {swapStatusOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Filtro Período Criação */}
      <div className="grid gap-1.5">
        <Label htmlFor="date-filter" className="text-xs">
          Período Criação:
        </Label>
        <DateRangePicker
          id="date-filter"
          date={dateRange}
          setDate={setDateRange}
        />
        {/* DatePicker ajustará sua própria largura */}
      </div>
      {/* Botão Limpar Filtros */}
      {/* 'ml-auto' no flex container pai pode ajudar a empurrar pra direita se houver espaço */}
      <Button
        variant="outline"
        onClick={clearFilters}
        title="Limpar todos os filtros"
        size="sm"
        className="h-8 self-end"
      >
        {/* size sm e self-end */}
        <X className="h-4 w-4 mr-1" /> Limpar
      </Button>
    </div>
  );
}
