// apps/frontend/src/components/admin/DashboardFilters.tsx
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
  statusFilter: SwapStatus | 'ALL';
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

const employeeFunctionOptions = Object.values(EmployeeFunction);
const reliefGroupOptions = Object.values(ReliefGroup);
const swapEventTypeOptions = Object.values(SwapEventType);
const swapStatusOptions = Object.values(SwapStatus);

export function DashboardFilters({
  statusFilter,
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
    /* ... (lógica para resetar todos os estados) ... */
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
    <div className="flex flex-wrap items-end gap-4 mb-4 p-4 border rounded-lg bg-card">
      {/* Filtro Status */}
      <div className="grid gap-1.5 min-w-[180px]">
        <Label htmlFor="status-filter">Status:</Label>
        <Select
          value={statusFilter}
          onValueChange={(v) =>
            setStatusFilter(v === 'ALL' ? 'ALL' : (v as SwapStatus))
          }
        >
          <SelectTrigger id="status-filter">
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
      <div className="grid gap-1.5 min-w-[280px]">
        <Label htmlFor="date-filter">Período Criação:</Label>
        <DateRangePicker
          id="date-filter"
          date={dateRange}
          setDate={setDateRange}
        />
      </div>
      {/* Filtro Crachá Saída */}
      <div className="grid gap-1.5 max-w-[150px]">
        <Label htmlFor="idOut-filter">Crachá Sai:</Label>
        <Input
          id="idOut-filter"
          placeholder="Crachá..."
          value={employeeIdOutFilter}
          onChange={(e) => setEmployeeIdOutFilter(e.target.value)}
        />
      </div>
      {/* Filtro Crachá Entrada */}
      <div className="grid gap-1.5 max-w-[150px]">
        <Label htmlFor="idIn-filter">Crachá Entra:</Label>
        <Input
          id="idIn-filter"
          placeholder="Crachá..."
          value={employeeIdInFilter}
          onChange={(e) => setEmployeeIdInFilter(e.target.value)}
        />
      </div>
      {/* Filtro Função */}
      <div className="grid gap-1.5 min-w-[180px]">
        <Label htmlFor="function-filter">Função:</Label>
        <Select
          value={employeeFunctionFilter}
          onValueChange={(v) =>
            setEmployeeFunctionFilter(
              v === 'ALL' ? 'ALL' : (v as EmployeeFunction)
            )
          }
        >
          <SelectTrigger id="function-filter">
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
      <div className="grid gap-1.5 min-w-[180px]">
        <Label htmlFor="groupOut-filter">Grupo Sai:</Label>
        <Select
          value={groupOutFilter}
          onValueChange={(v) =>
            setGroupOutFilter(v === 'ALL' ? 'ALL' : (v as ReliefGroup))
          }
        >
          <SelectTrigger id="groupOut-filter">
            <SelectValue placeholder="Grupo Saída" />
          </SelectTrigger>
          <SelectContent>
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
      <div className="grid gap-1.5 min-w-[180px]">
        <Label htmlFor="groupIn-filter">Grupo Entra:</Label>
        <Select
          value={groupInFilter}
          onValueChange={(v) =>
            setGroupInFilter(v === 'ALL' ? 'ALL' : (v as ReliefGroup))
          }
        >
          <SelectTrigger id="groupIn-filter">
            <SelectValue placeholder="Grupo Entrada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            {reliefGroupOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5 min-w-[180px]">
        <Label htmlFor="eventType-filter">Tipo:</Label>
        <Select
          value={eventTypeFilter}
          onValueChange={(v) =>
            setEventTypeFilter(v === 'ALL' ? 'ALL' : (v as SwapEventType))
          }
        >
          <SelectTrigger id="eventType-filter">
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
      <Button
        variant="ghost"
        onClick={clearFilters}
        title="Limpar todos os filtros"
      >
        <X className="h-4 w-4 mr-1" /> Limpar
      </Button>
    </div>
  );
}
