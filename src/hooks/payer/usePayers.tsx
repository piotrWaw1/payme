import {useCallback, useContext, useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Tables} from "../../../supabase.ts";
import {PostgrestError} from "@supabase/supabase-js";
import {ParamContext} from "@/context/ParamContext.tsx";

type ActionType = "all" | "active" | "inactive"

interface PayersData {
  count: number;
  data: Tables<'payers'>[] | null;
}

export default function usePayers(actionType: ActionType) {

  const {page, maxData} = useContext(ParamContext)

  const [payersLoading, setPayersLoading] = useState(false)
  const [payersData, setPayersData] = useState<PayersData>({count: 0, data: []})
  const [payersError, setPayersError] = useState<PostgrestError | null>(null)

  const getPayers = useCallback(async () => {
    setPayersLoading(true)

    const startData = Number(maxData) * (Number(page) - 1)
    const endData = Number(maxData) * Number(page)

    const {data, count, error} = await supabaseClient.from('payers')
        .select('*',
            {
              count: 'exact'
            }).range(startData, endData - 1)

    setPayersData({count: count ? count : 0, data})
    setPayersError(error)
    setPayersLoading(false)
  }, [maxData, page])

  const getActivePayers = useCallback(async () => {
    setPayersLoading(true)
    const {data, error} = await supabaseClient.from('payers').select().eq("active", true)
    setPayersData({data, count: 0})
    setPayersError(error)
    setPayersLoading(false)
  }, [])

  useEffect(() => {
    switch (actionType) {
      case "all":
        void getPayers()
        break;
      case "active":
        void getActivePayers()
        break;
      default:
        console.log("bad param")
        break;
    }

  }, [actionType, getActivePayers, getPayers, page]);

  return {getActivePayers, getPayers, payersLoading, payersData, payersError}
}