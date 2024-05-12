import {useCallback, useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Tables} from "../../supabase.ts";
import {PostgrestError} from "@supabase/supabase-js";

export default function usePayers() {
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

  useEffect(() => {
    void getPayers()
  }, [getPayers]);

  return {getPayers, payersLoading, payersData, payersError}
}