// src/components/ui/daterangepicker.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils'; // Assumindo que você usa esta função do shadcn/ui
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

// Definindo a interface de props corretamente
interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void; // A prop correta é 'onDateChange'
  placeholder?: string;
}

export function DateRangePicker({
  className,
  date,
  onDateChange, // Usamos 'onDateChange' aqui
  placeholder = 'Selecione um período',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // A função que causava o erro
  const handleSelect = (range: DateRange | undefined) => {
    // CORREÇÃO: Chamamos a função 'onDateChange' que recebemos via props
    onDateChange(range);

    // Fecha o popover se o intervalo de datas foi completamente selecionado
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal h-9 bg-gray-800/50 border-gray-600/50 text-white text-sm hover:bg-gray-700/50 hover:text-white',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yy', { locale: ptBR })} -{' '}
                  {format(date.to, 'dd/MM/yy', { locale: ptBR })}
                </>
              ) : (
                format(date.from, 'dd/MM/yy', { locale: ptBR })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect} // O 'onSelect' do calendário chama nosso 'handleSelect' corrigido
            numberOfMonths={1}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
