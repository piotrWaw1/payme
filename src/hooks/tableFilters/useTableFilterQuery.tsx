import {useCallback, useContext, useState} from "react";
import {Tables} from "../../../supabase.ts";
import {ParamContext} from "@/context/ParamContext.tsx";
import {useNavigate} from "react-router-dom";
import {supabaseClient} from "@/clientDef.ts";
import {useTableParams} from "@/hooks/tableFilters/useTableParams.tsx";

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

export default function useTableFilterQuery() {
  const [tableData, setTableData] = useState<TableData>(DEFAULT_DATA)
  const [loading, setLoading] = useState(false)
  const {page, maxData} = useContext(ParamContext)
  const {returnParam} = useTableParams()
  const nav = useNavigate()

  const calcStartEndData = useCallback(() => {
    const startData = Number(maxData) * (Number(page) - 1)
    const endData = (Number(maxData) * Number(page)) - 1
    return {startData, endData}
  }, [maxData, page])

  const clearNull = (data: PaymentsData[] | null) => (
      data?.filter(e => e.payers?.payer_name) || null
  )

  const getData = useCallback(async (table: 'payers' | 'payments_history', filters: string[], columnsName = '*') => {
    setLoading(true);

    const {startData, endData} = calcStartEndData();

    let query = supabaseClient.from(table)
        .select(columnsName, {count: 'exact'})
        .range(startData, endData);

    filters.forEach((filter) => {
      const paramValue = returnParam(filter)

      if (paramValue && paramValue !== 'all') {
        switch (filter) {
          case 'order':
            query = query.order('date', {ascending: false})
            break;
          case 'time':
            query = query.eq('payment_time', paramValue)
            break;
          case 'active':
            query = query.eq('active', paramValue)
            break;
          case 'name':
            query = query.filter(table === 'payers' ? 'payer_name' : 'payers.payer_name', 'ilike', `%${paramValue}%`)
            break;
          case 'dateRange':
            query = query
                .gte('date', paramValue.split('_')[0])
                .lte('date', paramValue.split('_')[1])
            break;
        }
      }
    })

    const {data, count, error} = await query
    if (error) {
      nav("/error404", {replace: true})
    }
    // const finalData = data as unknown as (PaymentsData | Tables<'payers'>)[] | null

    if (table === "payments_history") {
      const finalData = data as unknown as PaymentsData[] | null
      setTableData({data: clearNull(finalData), count: count || 0})
    } else {
      const finalData = data as unknown as Tables<'payers'>[] | null
      setTableData({data: finalData, count: count || 0})
    }


    setLoading(false);
  }, [calcStartEndData, nav, returnParam])

  return {loading, tableData, getData}
}