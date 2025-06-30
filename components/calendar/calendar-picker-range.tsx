import { format as formatDate } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface CalendarPickerProps {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}

export function CalendarPicker({ date, setDate }: CalendarPickerProps) {
  const [numberOfMonths, setNumberOfMonths] = useState(2)

  useEffect(() => {
    function updateNumberOfMonths() {
      if (window.innerWidth < 640) {
        setNumberOfMonths(1)
      } else {
        setNumberOfMonths(2)
      }
    }

    window.addEventListener('resize', updateNumberOfMonths)
    updateNumberOfMonths()

    return () => window.removeEventListener('resize', updateNumberOfMonths)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            'w-full lg:w-[300px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {formatDate(date.from, 'dd/MM/yyyy')} à{' '}
                {formatDate(date.to, 'dd/MM/yyyy')}
              </>
            ) : (
              formatDate(date.from, 'dd/MM/yyyy')
            )
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 z-50 bg-white dark:bg-black rounded-md"
        align="start"
      >
        <Calendar    
          mode="range"
          defaultMonth={new Date()}
          selected={date}
          onSelect={setDate}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  )
}
