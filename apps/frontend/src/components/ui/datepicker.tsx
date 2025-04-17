'use client'; // Se estiver em arquivo separado

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ptBR } from 'date-fns/locale';

// Interface para as props do DatePicker
interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  // Você pode adicionar outras props como placeholder, etc.
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  // ESTE componente NÃO tem mais seu próprio useState para a data
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal', // Modificado para w-full
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP', { locale: ptBR })
          ) : (
            <span>Escolha uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date} // Usa a prop 'date'
          onSelect={setDate} // Usa a prop 'setDate'
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
