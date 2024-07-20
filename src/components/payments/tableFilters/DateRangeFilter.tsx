import {format} from "date-fns"
import {Calendar as CalendarIcon, RotateCw} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, {useContext, useEffect, useState} from "react";
import {ParamContext} from "@/context/ParamContext.tsx";

export default function DateRangeFilter({className,}: React.HTMLAttributes<HTMLDivElement>) {
  const {setDateRange, dateRange} = useContext(ParamContext)
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const [animation, setAnimation] = useState(false)

  const formatDate = (date: Date | undefined) => {
    return date ? format(new Date(date), "yyyy-MM-dd") : ''
  }

  const select = (values: DateRange | undefined) => {
    if (values?.to) {
      const range = `${formatDate(values.from)}_${formatDate(values.to)}`
      console.log(range)
      setDateRange(range)
    }
    setDate(values)
  }

  const reset = () => {
    setDateRange('')
    setDate(undefined)
  }

  useEffect(() => {
    if(dateRange){
      const date = dateRange.split('_')
      setDate({from: new Date(date[0]), to: new Date(date[1])})
      // console.log(date)
    }
    // console.log("date loop")
  }, [dateRange]);

  return (
      <div className={cn("flex gap-1", className)}>
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
        <Button variant="outline" className="border group" onClick={reset}>
          <RotateCw
              className={cn(animation && "animate-spin-once delay-75")}
              onClick={() => setAnimation(true)}
              onAnimationEnd={() => setAnimation(false)}
          />
        </Button>
      </div>
  )
}