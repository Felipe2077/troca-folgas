// apps/frontend/src/components/admin/ModernDashboardFilters.tsx
'use client';

import { Button } from '@/components/ui/button';
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
import {
  Calendar,
  RefreshCw,
  Settings,
  Tag,
  User,
  Users,
  X,
} from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface ModernDashboardFiltersProps {
  statusFilter: SwapStatus | 'ALL';
  setStatusFilter: (status: SwapStatus | 'ALL') => void;
  swapDateRange: DateRange | undefined;
  setSwapDateRange: (range: DateRange | undefined) => void;
  paybackDateRange: DateRange | undefined;
  setPaybackDateRange: (range: DateRange | undefined) => void;
  employeeIdOutFilter: string;
  setEmployeeIdOutFilter: (id: string) => void;
  employeeIdInFilter: string;
  setEmployeeIdInFilter: (id: string) => void;
  employeeFunctionFilter: EmployeeFunction | 'ALL';
  setEmployeeFunctionFilter: (func: EmployeeFunction | 'ALL') => void;
  groupOutFilter: ReliefGroup | 'ALL';
  setGroupOutFilter: (group: ReliefGroup | 'ALL') => void;
  groupInFilter: ReliefGroup | 'ALL';
  setGroupInFilter: (group: ReliefGroup | 'ALL') => void;
  eventTypeFilter: SwapEventType | 'ALL';
  setEventTypeFilter: (type: SwapEventType | 'ALL') => void;
}

export function ModernDashboardFilters({
  statusFilter,
  setStatusFilter,
  swapDateRange,
  setSwapDateRange,
  paybackDateRange,
  setPaybackDateRange,
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
}: ModernDashboardFiltersProps) {
  const clearFilters = () => {
    setStatusFilter('ALL');
    setSwapDateRange(undefined);
    setPaybackDateRange(undefined);
    setEmployeeIdOutFilter('');
    setEmployeeIdInFilter('');
    setEmployeeFunctionFilter('ALL');
    setGroupOutFilter('ALL');
    setGroupInFilter('ALL');
    setEventTypeFilter('ALL');
  };

  const hasActiveFilters =
    statusFilter !== 'ALL' ||
    swapDateRange !== undefined ||
    paybackDateRange !== undefined ||
    employeeIdOutFilter !== '' ||
    employeeIdInFilter !== '' ||
    employeeFunctionFilter !== 'ALL' ||
    groupOutFilter !== 'ALL' ||
    groupInFilter !== 'ALL' ||
    eventTypeFilter !== 'ALL';

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-yellow-400" />
          <h4 className="text-lg font-semibold text-white">
            Filtros Avançados
          </h4>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="outline"
            size="sm"
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 hover:border-red-500/50 transition-all duration-200"
          >
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="status-filter" className="text-sm text-gray-300">
              Status:
            </Label>
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value === 'ALL' ? 'ALL' : (value as SwapStatus))
            }
          >
            <SelectTrigger
              id="status-filter"
              className="bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(SwapStatus).map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className="text-white hover:bg-gray-700"
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employee ID Out Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="idOut-filter" className="text-sm text-gray-300">
              Crachá Sai:
            </Label>
          </div>
          <Input
            id="idOut-filter"
            placeholder="Crachá..."
            value={employeeIdOutFilter}
            onChange={(e) => setEmployeeIdOutFilter(e.target.value)}
            className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
          />
        </div>

        {/* Employee ID In Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="idIn-filter" className="text-sm text-gray-300">
              Crachá Entra:
            </Label>
          </div>
          <Input
            id="idIn-filter"
            placeholder="Crachá..."
            value={employeeIdInFilter}
            onChange={(e) => setEmployeeIdInFilter(e.target.value)}
            className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
          />
        </div>

        {/* Function Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="function-filter" className="text-sm text-gray-300">
              Função:
            </Label>
          </div>
          <Select
            value={employeeFunctionFilter}
            onValueChange={(value) =>
              setEmployeeFunctionFilter(
                value === 'ALL' ? 'ALL' : (value as EmployeeFunction)
              )
            }
          >
            <SelectTrigger
              id="function-filter"
              className="bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
            >
              <SelectValue placeholder="Função" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todas
              </SelectItem>
              {Object.values(EmployeeFunction).map((func) => (
                <SelectItem
                  key={func}
                  value={func}
                  className="text-white hover:bg-gray-700"
                >
                  {func}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Group Out Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="groupOut-filter" className="text-sm text-gray-300">
              Grupo Sai:
            </Label>
          </div>
          <Select
            value={groupOutFilter}
            onValueChange={(value) =>
              setGroupOutFilter(
                value === 'ALL' ? 'ALL' : (value as ReliefGroup)
              )
            }
          >
            <SelectTrigger
              id="groupOut-filter"
              className="bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
            >
              <SelectValue placeholder="Grupo" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(ReliefGroup).map((group) => (
                <SelectItem
                  key={group}
                  value={group}
                  className="text-white hover:bg-gray-700"
                >
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Group In Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="groupIn-filter" className="text-sm text-gray-300">
              Grupo Entra:
            </Label>
          </div>
          <Select
            value={groupInFilter}
            onValueChange={(value) =>
              setGroupInFilter(value === 'ALL' ? 'ALL' : (value as ReliefGroup))
            }
          >
            <SelectTrigger
              id="groupIn-filter"
              className="bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
            >
              <SelectValue placeholder="Grupo" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(ReliefGroup).map((group) => (
                <SelectItem
                  key={group}
                  value={group}
                  className="text-white hover:bg-gray-700"
                >
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Event Type Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 text-yellow-400" />
            <Label htmlFor="eventType-filter" className="text-sm text-gray-300">
              Tipo:
            </Label>
          </div>
          <Select
            value={eventTypeFilter}
            onValueChange={(value) =>
              setEventTypeFilter(
                value === 'ALL' ? 'ALL' : (value as SwapEventType)
              )
            }
          >
            <SelectTrigger
              id="eventType-filter"
              className="bg-gray-800/50 border-gray-600/50 text-white focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
            >
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(SwapEventType).map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-white hover:bg-gray-700"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filters - Placeholder for now */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-yellow-400" />
            <Label className="text-sm text-gray-300">Data Troca:</Label>
          </div>
          <div className="text-xs text-gray-500 p-2 bg-gray-800/30 rounded border border-gray-700/50">
            Filtro de data em desenvolvimento
          </div>
        </div>
      </div>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center space-x-2 text-sm text-yellow-300">
            <Tag className="h-4 w-4" />
            <span>Filtros ativos aplicados</span>
          </div>
        </div>
      )}
    </div>
  );
}
