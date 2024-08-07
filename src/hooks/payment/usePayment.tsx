import {useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Tables} from "../../../supabase.ts";
import {PaymentSchema} from "@/components/payments/addPayment/PaymentSchema.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";


export default function usePayment(id: string | undefined) {
  const [paymentLoad, stePaymentLoad] = useState(false)
  const [paymentData, setPaymentData] = useState<Tables<"payments_history">[]>([
    {
      date: "", id: -1, payer_id: -1, price: 0, user_id: ""
    }
  ])
  const nav = useNavigate()
  const {toast} = useToast()
  const updatePayment = async (data: PaymentSchema) => {

    const toSend = {
      price: parseFloat(data.price),
      payer_id: parseInt(data.payer_id),
      date: format(new Date(data.date), 'yyyy-MM-dd')
    }


    if (id) {
      const {error} = await supabaseClient.from("payments_history").update(toSend).eq('id', id)
      if (error) {
        toast(
            {
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Check your internet connection and try again later.",
              action: <ToastAction altText="Try again">Close</ToastAction>,
            }
        )
      } else {
        toast(
            {
              variant: "default",
              title: "Success",
              description: "Payment edited successfully",
              action: <ToastAction altText="Try again">Close</ToastAction>,
            }
        )
      }
    }
  }

  useEffect(() => {
    const getPayment = async () => {
      stePaymentLoad(true)
      if (id) {
        const {data, error} = await supabaseClient.from("payments_history").select().eq('id', id)
        if(error){
          nav("/payments/not-found", {replace: true})
        }
        if (data) {
          setPaymentData(data)
          // if (data.length === 0) {
          //   toast(
          //       {
          //         variant: "destructive",
          //         title: "Payment not found.",
          //         description: "This payment does not exist.",
          //         action: <ToastAction altText="Try again">Close</ToastAction>,
          //       }
          //   )
          // }
        }
        // console.log(data)
        stePaymentLoad(false)
      }
    }
    void getPayment()

  }, [id, nav, toast]);

  return {paymentLoad, paymentData, updatePayment}
}