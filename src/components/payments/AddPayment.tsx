import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {paymentSchema, PaymentSchema} from "@/components/payments/PaymentSchema.ts";
import usePayers from "@/hooks/payer/usePayers.tsx";

import {Calendar} from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {CalendarIcon, Loader2} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";
import useAddPayment from "@/hooks/payment/useAddPayment.tsx";


export default function AddPayment() {

  const {payersData} = usePayers("active")
  const {sendForm, paymentLoading} = useAddPayment()
  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      price: "",
      payer_id: ""
    }
  })

  const {data} = payersData

  const resetValues = () => {
    form.reset()
  }
  return (
      <div className="flex justify-center">
        <div className="w-96">
          <h2 className="text-3xl font-bold mb-3">Add payment</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendForm)}>
              <FormField
                  control={form.control}
                  name="price"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input disabled={paymentLoading} type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  name="payer_id"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Payer</FormLabel>
                        <Select disabled={paymentLoading} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select payer"/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data?.map(element => (
                                <SelectItem value={`${element.id}`} key={element.id}>{element.payer_name}</SelectItem>
                            ))}
                            {data?.length === 0  &&
                                <SelectItem disabled value="0">No data</SelectItem>
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="date"
                  render={({field}) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                  disabled={paymentLoading}
                                  variant={"outline"}
                                  className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                  )}
                              >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <Button disabled={paymentLoading} type="submit" className="mr-3 mt-3">
                {paymentLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Submit
              </Button>
              <Button disabled={paymentLoading} type="reset" onClick={resetValues}>
                Reset
              </Button>
            </form>
          </Form>
        </div>
      </div>
  )
}