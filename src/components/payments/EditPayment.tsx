import {useParams} from "react-router-dom";
import usePayment from "@/hooks/payment/usePayment.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon, Loader2} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import usePayers from "@/hooks/payer/usePayers.tsx";
import {useForm} from "react-hook-form";
import {paymentSchema, PaymentSchema} from "@/components/payments/PaymentSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export default function EditPayment() {
  const {id} = useParams()
  const {payersData} = usePayers("active")
  const {paymentLoad, paymentData, updatePayment} = usePayment(id)

  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      date: new Date(),
      price: "",
      payer_id: ""
    },
    mode: "onChange",
    values: {
      date: paymentData[0]?.date ? new Date(paymentData[0]?.date) : new Date(),
      price: paymentData[0]?.price ? `${paymentData[0]?.price}` : "",
      payer_id: `${paymentData[0]?.payer_id}`
    }
  })
  const resetValues = () => {
    form.reset()
  }

  return (
      <div className="flex justify-center">
        <div className="w-96">
          <h2 className="text-3xl font-bold mb-3">Edit payment</h2>
          {paymentData.length !== 0 &&
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(updatePayment)}>
                      <FormField
                          control={form.control}
                          name="price"
                          render={({field}) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input disabled={paymentLoad} type="number" placeholder="0.00" {...field} />
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
                                <Select disabled={paymentLoad} value={`${field.value}`} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select payer"/>
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {payersData?.map(element => (
                                        <SelectItem value={`${element.id}`} key={element.id}>
                                          {element.payer_name}
                                        </SelectItem>
                                    ))}
                                    {payersData?.length === 0 &&
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
                                          disabled={paymentLoad}
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
                      <Button disabled={paymentLoad} type="submit" className="mr-3 mt-3">
                        {paymentLoad && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                          Submit
                      </Button>
                      <Button disabled={paymentLoad} type="reset" onClick={resetValues}>
                          Reset
                      </Button>
                  </form>
              </Form>
          }
          {!paymentData?.length && <p className="font-bold text-lg">No data</p>}
        </div>
      </div>
  )
}