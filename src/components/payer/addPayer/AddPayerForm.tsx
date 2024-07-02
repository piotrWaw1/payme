import {useForm} from "react-hook-form";
import {AddPayerData, payersSchema} from "@/components/payer/addPayer/PayersSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import usePayersForm from "@/hooks/payer/usePayersForm.tsx";
import {Loader2} from "lucide-react";

export default function AddPayerForm() {
  const {sendForm, payersError, payersLoading} = usePayersForm()


  const form = useForm<AddPayerData>({
    resolver: zodResolver(payersSchema),
    defaultValues: {
      payer_name: "",
      description: ""
    }
  })

  const resetValues = () => {
    form.reset()
  }

  return (
      <div className="flex justify-center">
        <div className="w-96">
          <h2 className="text-3xl font-bold mb-3 dark:text-slate-200">Add new payer</h2>
          <p className="text-red-500 font-bold">{payersError}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendForm)}>
              <FormField
                  control={form.control}
                  name="payer_name"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel className="dark:text-slate-300">Payer name</FormLabel>
                        <FormControl>
                          <Input className="dark:text-slate-200" disabled={payersLoading} placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  name="payment_time"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel className="dark:text-slate-300">Payment type</FormLabel>
                        <Select  disabled={payersLoading} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl className="dark:text-slate-400">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select payment type"/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 moth</SelectItem>
                            <SelectItem value="3">3 months</SelectItem>
                            <SelectItem value="6">6 months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel className="dark:text-slate-300">Description</FormLabel>
                        <FormControl>
                          <Input className="dark:text-slate-200" disabled={payersLoading} placeholder="Some info" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <Button type="submit" disabled={payersLoading} className="mr-3 mt-3">
                {payersLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Submit
              </Button>
              <Button type="reset" disabled={payersLoading} onClick={resetValues}>
                Reset
              </Button>
            </form>
          </Form>
        </div>
      </div>
  )
}