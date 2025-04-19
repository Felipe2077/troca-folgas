// apps/frontend/src/components/ui/datepicker.tsx (ou onde estiver definido)
'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react'; // Importa useState

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  // ADICIONADO: Estado para controlar se o popover está aberto
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Passa o estado e o setter para o Popover
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn(/* ... classes ... */)}>
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
          selected={date}
          // Modifica o onSelect
          onSelect={(selectedDay, _activeModifiers, _e) => {
            setDate(selectedDay); // Atualiza a data no componente pai
            setIsOpen(false); // FECHA o popover
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
