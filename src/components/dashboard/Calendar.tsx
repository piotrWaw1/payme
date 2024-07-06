// const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
import {Calendar as BigCalendar, dateFnsLocalizer} from 'react-big-calendar'
import {eu} from "date-fns/locale";
import {format, parse, startOfWeek, getDay, parseISO, startOfMonth, endOfMonth, getMonth} from "date-fns";
import {useCallback, useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";

const locales = {
  'en-US': eu,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarData {
  start: Date;
  end: Date;
  title: string
}

export default function Calendar() {

  const [date, setDate] = useState(new Date())
  const [paymentData, setPaymentData] = useState<CalendarData[] | undefined>([])

  useEffect(() => {
    const getPayments = async (date: Date) => {
      const startDate = format(startOfMonth(date), "yyyy-MM-dd")
      const endDate = format(endOfMonth(date), "yyyy-MM-dd")

      const query = supabaseClient.from('payments_history')
          .select('id, price, date, payers (payer_name)')
          .gte('date', startDate)
          .lte('date', endDate)

      const {data} = await query

      if (data) {
        setPaymentData(data.map(e => {
          const date = format(new Date(e.date), "yyyy-MM-dd")
          return (
              {
                start: parseISO(date),
                end: parseISO(date),
                title: `${e.payers?.payer_name}: ${e.price}PLN`
              }
          )
        }))
      } else {
        setPaymentData([])
      }
    }
    getPayments(date).then()
  }, [date]);


  const onNavigate = useCallback((newDate: Date) => {
    if (getMonth(date) !== getMonth(newDate)) {
      setDate(newDate)
    }
  }, [date])

  // console.log(paymentData)

  return (
      <BigCalendar
          min={parse('1:00am', 'h:mma', new Date())}
          max={parse('2:00am', 'h:mma', new Date())}
          className="dark:text-slate-600 dark:bg-slate-100 p-1 rounded"
          views={["month", "week", "day"]}
          localizer={localizer}
          events={paymentData}
          onNavigate={onNavigate}
          style={{height: 500}}
      />
  )
}
