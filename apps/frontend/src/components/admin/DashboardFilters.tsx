// src/components/admin/DashboardFilters.tsx
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
import {
  BarChart3,
  Calendar,
  Filter,
  Settings,
  Tag,
  Users,
  X,
} from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface DashboardFiltersProps {
  statusFilter: SwapStatus | 'ALL';
  setStatusFilter: (value: SwapStatus | 'ALL') => void;
  employeeIdOutFilter: string;
  setEmployeeIdOutFilter: (value: string) => void;
  employeeIdInFilter: string;
  setEmployeeIdInFilter: (value: string) => void;
  employeeFunctionFilter: EmployeeFunction | 'ALL';
  setEmployeeFunctionFilter: (value: EmployeeFunction | 'ALL') => void;
  eventTypeFilter: SwapEventType | 'ALL';
  setEventTypeFilter: (value: SwapEventType | 'ALL') => void;
  groupOutFilter: ReliefGroup | 'ALL';
  setGroupOutFilter: (value: ReliefGroup | 'ALL') => void;
  groupInFilter: ReliefGroup | 'ALL';
  setGroupInFilter: (value: ReliefGroup | 'ALL') => void;
  swapDateRange: DateRange | undefined;
  setSwapDateRange: (value: DateRange | undefined) => void;
  paybackDateRange: DateRange | undefined;
  setPaybackDateRange: (value: DateRange | undefined) => void;
  clearFilters: () => void;
}

export const DashboardFilters = ({
  statusFilter,
  setStatusFilter,
  employeeIdOutFilter,
  setEmployeeIdOutFilter,
  employeeIdInFilter,
  setEmployeeIdInFilter,
  employeeFunctionFilter,
  setEmployeeFunctionFilter,
  eventTypeFilter,
  setEventTypeFilter,
  groupOutFilter,
  setGroupOutFilter,
  groupInFilter,
  setGroupInFilter,
  swapDateRange,
  setSwapDateRange,
  paybackDateRange,
  setPaybackDateRange,
  clearFilters,
}: DashboardFiltersProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Filtros</h3>
      </div>

      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        {/* Status Filter */}
        <div className="space-y-1 w-32">
          <Label
            htmlFor="status-filter"
            className="text-xs text-gray-400 flex items-center"
          >
            <Tag className="h-3 w-3 mr-1" />
            Status:
          </Label>
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as SwapStatus | 'ALL')
            }
          >
            <SelectTrigger
              id="status-filter"
              className="h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm w-full"
            >
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(SwapStatus).map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className="text-white hover:bg-gray-700 text-sm"
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Crachá Sai */}
        <div className="space-y-1 w-40">
          <Label
            htmlFor="cracha-sai"
            className="text-xs text-gray-400 flex items-center"
          >
            <Users className="h-3 w-3 mr-1" />
            Crachá Sai:
          </Label>
          <Input
            id="cracha-sai"
            placeholder="Crachá..."
            value={employeeIdOutFilter}
            onChange={(e) => setEmployeeIdOutFilter(e.target.value)}
            className="h-9 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 text-sm w-full"
          />
        </div>

        {/* Crachá Entra */}
        <div className="space-y-1 w-40">
          <Label
            htmlFor="cracha-entra"
            className="text-xs text-gray-400 flex items-center"
          >
            <Users className="h-3 w-3 mr-1" />
            Crachá Entra:
          </Label>
          <Input
            id="cracha-entra"
            placeholder="Crachá..."
            value={employeeIdInFilter}
            onChange={(e) => setEmployeeIdInFilter(e.target.value)}
            className="h-9 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 text-sm w-full"
          />
        </div>

        {/* Função */}
        <div className="space-y-1 w-32">
          <Label
            htmlFor="funcao-filter"
            className="text-xs text-gray-400 flex items-center"
          >
            <Settings className="h-3 w-3 mr-1" />
            Função:
          </Label>
          <Select
            value={employeeFunctionFilter}
            onValueChange={(value) =>
              setEmployeeFunctionFilter(value as EmployeeFunction | 'ALL')
            }
          >
            <SelectTrigger
              id="funcao-filter"
              className="h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm w-full"
            >
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(EmployeeFunction).map((func) => (
                <SelectItem
                  key={func}
                  value={func}
                  className="text-white hover:bg-gray-700 text-sm"
                >
                  {func}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tipo */}
        <div className="space-y-1 w-32">
          <Label
            htmlFor="tipo-filter"
            className="text-xs text-gray-400 flex items-center"
          >
            <BarChart3 className="h-3 w-3 mr-1" />
            Tipo:
          </Label>
          <Select
            value={eventTypeFilter}
            onValueChange={(value) =>
              setEventTypeFilter(value as SwapEventType | 'ALL')
            }
          >
            <SelectTrigger
              id="tipo-filter"
              className="h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm w-full"
            >
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(SwapEventType).map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-white hover:bg-gray-700 text-sm"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grupo Sai */}
        <div className="space-y-1 w-32">
          <Label
            htmlFor="grupo-sai"
            className="text-xs text-gray-400 flex items-center"
          >
            <Users className="h-3 w-3 mr-1" />
            Grupo Sai:
          </Label>
          <Select
            value={groupOutFilter}
            onValueChange={(value) =>
              setGroupOutFilter(value as ReliefGroup | 'ALL')
            }
          >
            <SelectTrigger
              id="grupo-sai"
              className="h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm w-full"
            >
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(ReliefGroup).map((group) => (
                <SelectItem
                  key={group}
                  value={group}
                  className="text-white hover:bg-gray-700 text-sm"
                >
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grupo Entra */}
        <div className="space-y-1 w-32">
          <Label
            htmlFor="grupo-entra"
            className="text-xs text-gray-400 flex items-center"
          >
            <Users className="h-3 w-3 mr-1" />
            Grupo Entra:
          </Label>
          <Select
            value={groupInFilter}
            onValueChange={(value) =>
              setGroupInFilter(value as ReliefGroup | 'ALL')
            }
          >
            <SelectTrigger
              id="grupo-entra"
              className="h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm w-full"
            >
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="ALL" className="text-white hover:bg-gray-700">
                Todos
              </SelectItem>
              {Object.values(ReliefGroup).map((group) => (
                <SelectItem
                  key={group}
                  value={group}
                  className="text-white hover:bg-gray-700 text-sm"
                >
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Período Data Troca - REMOVIDA A CONDIÇÃO {selectedVigencia === 'ALL' && ...} */}
        <div className="space-y-1 w-56">
          <Label className="text-xs text-gray-400 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Período Data Troca:
          </Label>
          <DateRangePicker
            date={swapDateRange}
            onDateChange={setSwapDateRange}
            placeholder="Selecione o período"
            className="h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm w-full"
          />
        </div>

        {/* Período Data Pagamento - REMOVIDA A CONDIÇÃO {selectedVigencia === 'ALL' && ...} */}
        <div className="space-y-1 w-56">
          <Label className="text-xs text-gray-400 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Período Data Pagamento:
          </Label>
          <DateRangePicker
            date={paybackDateRange}
            onDateChange={setPaybackDateRange}
            placeholder="Selecione o período"
            className="h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm w-full"
          />
        </div>

        {/* Botão Limpar */}
        <div className="w-24">
          <Label className="text-xs text-transparent">.</Label>
          <Button
            onClick={clearFilters}
            variant="outline"
            size="sm"
            className="h-9 text-gray-300 border-gray-600 hover:bg-gray-700/30 text-sm w-full"
          >
            <X className="h-3 w-3 mr-2" />
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
};
