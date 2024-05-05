import {useForm} from "react-hook-form";
import {AddPayerData, addPayerSchema} from "@/components/addPayer/addPayerSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function AddPayerForm() {
  const form = useForm<AddPayerData>({
    resolver: zodResolver(addPayerSchema),
    defaultValues: {
      payer_name: "",
      payment_type: "",
      description: ""
    }
  })

  const resetValues = () => {
    form.reset()
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(console.log)}>
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
              name="payment_type"
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
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
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
  )
}