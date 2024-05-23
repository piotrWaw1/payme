import {useCallback, useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Tables} from "../../../supabase.ts";
import {useParams} from "react-router-dom";

export default function usePayer() {
  const {id} = useParams<{ id: string }>()

  const [payerData, setPayerData] = useState<Tables<"payers">>()
  const [payerLoading, setPayerLoading] = useState(false)

  const getPayerData = useCallback(async () => {
    if (!id) {
      return
    }

    setPayerLoading(true)
    const {data} = await supabaseClient.from("payers").select().eq('id', id)
    if (data) {
      setPayerData({...data[0]})
    }
    setPayerLoading(false)
  }, [id])

  useEffect(() => {
    getPayerData().then()
  }, [getPayerData]);

  return {getPayerData, payerData, payerLoading}
}