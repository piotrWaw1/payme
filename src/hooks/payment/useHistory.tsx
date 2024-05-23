import {useCallback, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {PostgrestError} from "@supabase/supabase-js";

interface HistoryData {
  id: number;
  user_id: string;
  price: number;
  date: string;
  payers: {
    payer_name: string;
  } | null;
}

const useHistory = () => {
  const [historyData, setHistoryData] = useState<HistoryData[] | null>(null)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState<PostgrestError | null>(null)

  const getHistory = useCallback(async () => {
    setHistoryLoading(true)
    const {data, error} = await supabaseClient
        .from('payments_history')
        .select('id, user_id, price, date, payers (payer_name)')
    setHistoryData(data)
    setHistoryError(error)
    setHistoryLoading(false)
  }, [])

  const getNewest = useCallback(async () => {
    const {data, error} = await supabaseClient.from('payments_history')
        .select('id, user_id, price, date, payers (payer_name)')
        .order('date', {ascending: false})
        .limit(10)
    setHistoryError(error)
    setHistoryData(data)
  },[])

  return {getHistory, getNewest, historyLoading, historyData, historyError}
}

export default useHistory