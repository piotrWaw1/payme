import {Tables} from "../../supabase.ts";
import {useCallback, useContext, useRef, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {ParamContext} from "@/context/ParamContext.tsx";

interface PaymentsData {
  id: number;
  user_id: string;
  price: number;
  date: string;
  payers: {
    payer_name: string;
  } | null;
}

interface TableData {
  count: number;
  data: (PaymentsData | Tables<'payers'>)[] | null;
}


const DEFAULT_DATA = {
  count: 0,
  data: []
}


export const useTableFilters = () => {
  const [tableData, setTableData] = useState<TableData>(DEFAULT_DATA)
  const [loading, setLoading] = useState(false)
  const {page, maxData, active, time, name, dateStart, dateEnd} = useContext(ParamContext)
  const delayTime = useRef<number | null>(null)

  const calcStartEndData = useCallback(() => {
    const startData = Number(maxData) * (Number(page) - 1)
    const endData = (Number(maxData) * Number(page)) - 1
    return {startData, endData}
  }, [maxData, page])

  const getPayersData = useCallback(async () => {
    // console.log("PayerData")
    setLoading(true)

    // const startData = Number(maxData) * (Number(page) - 1)
    // const endData = (Number(maxData) * Number(page)) - 1

    const {startData, endData} = calcStartEndData()


    let query = supabaseClient.from("payers")
        .select('*', {count: 'exact'})
        .range(startData, endData)
    if (active !== 'all') {
      query = query.eq('active', active)
    }
    if (time !== 'all') {
      query = query.eq('payment_time', time)
    }
    if (name != '') {
      query = query.filter('payer_name', 'ilike', `%${name}%`)
      if (delayTime.current) {
        clearTimeout(delayTime.current)
      }
    }
    const {data, count} = await query
    // delayTime.current = window.setTimeout(() => {
    //
    // }, 2000)
    setTableData({data, count: count || 0})
    setLoading(false)
    // setTableData({data, count: count || 0})
  }, [active, calcStartEndData, name, time])

  const clearNull = (data: PaymentsData[]) => (
      data?.filter(e => e.payers?.payer_name)
  )


  const getPaymentData = useCallback(async () => {
    setLoading(true)

    const {startData, endData} = calcStartEndData()

    let query = supabaseClient.from("payments_history")
        .select('id, user_id, price, date, payers (payer_name)', {count: 'exact'})
        .range(startData, endData)

    //startDate, endDate 
    if (name != '') {
      query = query.filter('payers.payer_name', 'ilike', `%${name}%`)
    }
    if (dateStart && dateEnd) {
      query = query
          .gte('date', dateStart)
          .lte('date', dateEnd)
    }
    if(dateStart && !dateEnd){
      query = query.eq('date', dateStart)
    }
    const {data, count} = await query
    const finalData = data ? clearNull(data) : null
    // console.log(finalData)
    setTableData({data: finalData, count: count || 0})
    setLoading(false)
  }, [calcStartEndData, dateEnd, dateStart, name])

  return {getPaymentData, getPayersData, tableData, loading}
}