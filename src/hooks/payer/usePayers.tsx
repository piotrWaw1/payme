import {useCallback, useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Tables} from "../../../supabase.ts";
import {PostgrestError} from "@supabase/supabase-js";

type ActionType = "all"|"active"|"inactive"

export default function usePayers(actionType: ActionType) {
  const [payersLoading, setPayersLoading] = useState(false)
  const [payersData, setPayersData] = useState<Tables<'payers'>[] | null>(null)
  const [payersError, setPayersError] = useState<PostgrestError | null>(null)

  const getPayers = useCallback(async () => {
    setPayersLoading(true)
    const {data, error} = await supabaseClient.from('payers').select()
    setPayersData(data)
    setPayersError(error)
    setPayersLoading(false)
  }, [])

  const getActivePayers = useCallback(async () => {
    setPayersLoading(true)
    const {data, error} = await supabaseClient.from('payers').select().eq("active", true)
    setPayersData(data)
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

  }, [actionType, getActivePayers, getPayers]);

  return {getActivePayers, getPayers, payersLoading, payersData, payersError}
}