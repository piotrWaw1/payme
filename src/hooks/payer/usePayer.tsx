import {useCallback, useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Tables} from "../../../supabase.ts";
import {useNavigate, useParams} from "react-router-dom";

export default function usePayer() {
  const {id} = useParams<{ id: string }>()

  const [payerData, setPayerData] = useState<Tables<"payers">>()
  const [payerLoading, setPayerLoading] = useState(false)
  const nav = useNavigate()

  const getPayerData = useCallback(async () => {
    if (!id) {
      return
    }

    setPayerLoading(true)
    const {data, error} = await supabaseClient.from("payers").select().eq('id', id)
    if (error) {
      nav("/error404", {replace: true})
    }

    if (data) {
      if(!data[0]?.id){
        nav("/error404", {replace: true})
      }
      setPayerData({...data[0]})
    }
    setPayerLoading(false)
  }, [id, nav])

  useEffect(() => {
    getPayerData().then()
  }, [getPayerData]);

  return {getPayerData, payerData, payerLoading}
}