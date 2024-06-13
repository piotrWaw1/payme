import {useCallback, useContext, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {PostgrestError} from "@supabase/supabase-js";
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

interface Payments {
  count: number;
  data: PaymentsData[] | null;
}


const useHistory = () => {
  const [historyData, setHistoryData] = useState<Payments>({count: 0, data: []})
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState<PostgrestError | null>(null)
  const {page, maxData} = useContext(ParamContext)

  const getHistory = useCallback(async () => {
    setHistoryLoading(true)

    const startData = Number(maxData) * (Number(page) - 1)
    const endData = Number(maxData) * Number(page)

    const {data, count, error} = await supabaseClient
        .from('payments_history')
        .select('id, user_id, price, date, payers (payer_name)', {count: 'exact'})
        .range(startData, endData)

    setHistoryData({count: count ? count : 0, data})
    setHistoryError(error)
    setHistoryLoading(false)
  }, [maxData, page])

  const getNewest = useCallback(async () => {
    const {data, error} = await supabaseClient.from('payments_history')
        .select('id, user_id, price, date, payers (payer_name)')
        .order('date', {ascending: false})
        .limit(10)
    setHistoryError(error)
    setHistoryData({count: 0, data})
  }, [])

  return {getHistory, getNewest, historyLoading, historyData, historyError}
}

export default useHistory