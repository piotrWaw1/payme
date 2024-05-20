import {useCallback, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Tables} from "../../supabase.ts";
import {EditPayerData} from "@/components/payer/edit/editPayerFormSchema.ts";
import {ToastAction} from "@/components/ui/toast.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

export default function usePayer() {
  const [payerData, setPayerData] = useState<Tables<"payers">>()
  const [payerLoading, setPayerLoading] = useState(false)
  const {toast} = useToast()

  const getPayerData = useCallback(async (id: string) => {
    setPayerLoading(true)
    const {data} = await supabaseClient.from("payers").select().eq('id', id)
    if (data) {
      setPayerData({...data[0]})
    }
    setPayerLoading(false)
  }, [])

  const updatePayerData = async (formData: EditPayerData, id: string) => {
    const toSend = {...formData, payment_time: parseInt(formData.payment_time)}
    const {error} = await supabaseClient.from('payers').update(toSend).eq('id', id)
    if (!error)
      toast(
          {
            variant: "default",
            title: "Success",
            description: "Payer edited successfully.",
            action: <ToastAction altText="Try again">Close</ToastAction>,
          }
      )
    void getPayerData(id)
  }

  return {getPayerData, updatePayerData, payerData, payerLoading}
}