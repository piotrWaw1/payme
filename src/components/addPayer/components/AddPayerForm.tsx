import {useForm} from "react-hook-form";
import {AddPayerData, payersSchema} from "@/components/addPayer/PayersSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import usePayersForm from "@/hooks/usePayersForm.tsx";

export default function AddPayerForm() {
  const {sendForm} = usePayersForm()

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
          <h2 className="text-3xl font-bold mb-3">Add new payer</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendForm)}>
              <FormField
                  control={form.control}
                  name="payer_name"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Payer name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  name="payment_time"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Payment type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
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
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Some info" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <Button type="submit" className="mr-3 mt-3">
                Submit
              </Button>
              <Button type="reset" onClick={resetValues}>
                Reset
              </Button>
            </form>
          </Form>
        </div>
      </div>
  )
}