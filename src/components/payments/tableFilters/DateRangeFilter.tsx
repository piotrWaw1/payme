import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, {useContext, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

export default function DateRangeFilter({className,}: React.HTMLAttributes<HTMLDivElement>) {
  const {setDateRange} = useContext(ParamContext)
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const formatDate = (date: Date | undefined) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : ''
  }

  const select = (values: DateRange | undefined) => {
    setDateRange(formatDate(values?.from), formatDate(values?.to))
    setDate(values)
  }

  return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                    "w-[300px] justify-start text-left font-normal dark:text-slate-400",
                    !date && "text-muted-foreground"
                )}
            >
              <CalendarIcon className="mr-2 h-4 w-4"/>
              {date?.from ? (
                  date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                  ) : (
                      format(date.from, "LLL dd, y")
                  )
              ) : (
                  <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={select}
                numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
  )
}