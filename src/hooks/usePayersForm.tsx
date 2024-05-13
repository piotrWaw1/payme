import {useState} from "react";
import {AddPayerData} from "@/components/addPayer/PayersSchema.ts";
import {supabaseClient} from "@/clientDef.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

export default function usePayersForm() {
  const [payersLoading, setPayersLoading] = useState(false)
  const [payersError, setPayersError] = useState<string | null>(null)
  const {toast} = useToast()
  const sendForm = async (values: AddPayerData) => {
    setPayersLoading(true)
    setPayersError(null)
    const toSend = {...values, payment_time: parseInt(values.payment_time)}
    const {error} = await supabaseClient.from('payers').insert(toSend)
    if (error) {
      if (error.code === "23505") {
        toast(
            {
              variant: "destructive",
              title: "Uh oh! Payer name error.",
              description: "Payer with this name already exist.",
              action: <ToastAction altText="Try again">Close</ToastAction>,
            }
        )
        setPayersError(`Payer with name ${values.payer_name} already exist.`)
      }
    }
    else{
      toast(
          {
            variant: "default",
            title: "Success",
            description: "Payer added successfully.",
            action: <ToastAction altText="Try again">Close</ToastAction>,
          }
      )
    }
    // console.log(error)
    setPayersLoading(false)
  }

  return {payersLoading, payersError, sendForm}
}