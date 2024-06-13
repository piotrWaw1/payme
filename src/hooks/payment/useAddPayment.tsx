import {useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {PaymentSchema} from "@/components/payments/PaymentSchema.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {format} from "date-fns";

export default function useAddPayment() {
  const [paymentLoading, setPaymentLoading] = useState(false)
  const {toast} = useToast()

  const sendForm = async (data: PaymentSchema) => {
    setPaymentLoading(true)

    const toSend = {
      price: parseFloat(data.price),
      payer_id: parseInt(data.payer_id),
      date: format(new Date(data.date), 'yyyy-MM-dd')
    }

    const {error} = await supabaseClient.from('payments_history').insert(toSend)
    if(error){
      console.log(error)
      toast(
          {
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Check your internet connection and try again later.",
            action: <ToastAction altText="Try again">Close</ToastAction>,
          }
      )
    }else{
      toast(
          {
            variant: "default",
            title: "Success",
            description: "Payment added successfully",
            action: <ToastAction altText="Try again">Close</ToastAction>,
          }
      )
    }
    setPaymentLoading(false)
  }

  return {paymentLoading, sendForm}
}