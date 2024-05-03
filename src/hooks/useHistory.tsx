import {useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";

interface HistoryData {
  id: number;
  user_id: string;
  price: number;
  date: string;
  payers: {
    payer_name: string;
  }[];
}

const useHistory = () => {
  const [historyData, setHistoryData] = useState<HistoryData[] | null>()
  const [historyLoading, setHistoryLoading] = useState(false)

  useEffect(() => {
    const getHistory = async () => {
      setHistoryLoading(true)
      const {data, error} = await supabaseClient
          .from('payments_history')
          .select('id, user_id, price, date, payers (payer_name)')
      console.log(data)
      console.log(error)
      setHistoryData(data)
      setHistoryLoading(false)
    }
    void getHistory()
  }, []);

  return {historyLoading, historyData}
}

export default useHistory