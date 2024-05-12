import {useEffect, useState} from "react";
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
  useEffect(() => {
    const getHistory = async () => {
      setHistoryLoading(true)
      const {data, error} = await supabaseClient
          .from('payments_history')
          .select('id, user_id, price, date, payers (payer_name)')
      // console.log(data)
      // console.log(error)
      setHistoryData(data)
      setHistoryError(error)
      setHistoryLoading(false)
    }
    void getHistory()
  }, []);

  return {historyLoading, historyData, historyError}
}

export default useHistory