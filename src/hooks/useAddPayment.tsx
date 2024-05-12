import {useState} from "react";
import {PostgrestError} from "@supabase/supabase-js";
import {supabaseClient} from "@/clientDef.ts";
import {PaymentSchema} from "@/components/addPayment/PaymentSchema.ts";

export default function useAddPayment() {
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState<PostgrestError | null>(null)

  const sendForm = async (data: PaymentSchema) => {
    setPaymentLoading(true)
    const toSend = {
      price: parseFloat(data.price),
      payer_id: parseInt(data.payer_id),
      date: JSON.stringify(data.date)
    }
    const {error} = await supabaseClient.from('payments_history').insert(toSend)
    setPaymentError(error)
    setPaymentLoading(false)
  }

  return {paymentError, paymentLoading, sendForm}
}