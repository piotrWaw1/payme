import {useState} from "react";
import {PostgrestError} from "@supabase/supabase-js";
import {AddPayerData} from "@/components/addPayer/PayersSchema.ts";
import {supabaseClient} from "@/clientDef.ts";

export default function usePayersForm() {
  const [payersLoading, setPayersLoading] = useState(false)
  const [payersError, setPayersError] = useState<PostgrestError | null>(null)

  const sendForm = async (values: AddPayerData) => {
    setPayersLoading(true)
    const toSend = {...values, payment_time: parseInt(values.payment_time)}
    const {error} = await supabaseClient.from('payers').insert(toSend)
    setPayersError(error)
    setPayersLoading(false)
  }

  return {payersLoading, payersError, sendForm}
}