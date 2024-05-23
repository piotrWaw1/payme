import {useForm} from "react-hook-form";
import {EditPayerData, editPayerFormSchema} from "@/components/payer/edit/editPayerFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DialogClose, DialogFooter} from "@/components/ui/dialog.tsx";
import {FC} from "react";
import {Tables} from "../../../../supabase.ts";

interface EditPayerFormProps {
  payerData: Tables<"payers">;
  updatePayerData: (formData: EditPayerData, id: string) => void;
  payerLoading: boolean;
}

const EditPayerForm: FC<EditPayerFormProps> = ({payerData, updatePayerData, payerLoading}) => {

  const form = useForm<EditPayerData>({
    resolver: zodResolver(editPayerFormSchema),
    defaultValues: {
      payer_name: "",
      payment_time: "",
      description: "",
      active: false
    },
    mode: "onChange",
    values: {
      payer_name: `${payerData?.payer_name}`,
      payment_time: `${payerData?.payment_time}`,
      description: `${payerData?.description}`,
      active: !!payerData?.active
    }
  })

  return (
      <Form {...form}>
        <form className="grid gap-4 py-4"
              onSubmit={form.handleSubmit((data) => updatePayerData(data, `${payerData.id}`))}>
          <FormField
              control={form.control}
              name="payer_name"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Payer name</FormLabel>
                    <FormControl>
                      <Input disabled={false} placeholder="John Doe" {...field} />
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
                    <Select disabled={false} value={`${field.value}`} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue defaultValue='' placeholder="Select payment type"/>
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input disabled={false} placeholder="Some info" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="active"
              render={({field}) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                      />
                      <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Is payer active?
                      </label>
                    </div>
                  </FormItem>
              )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={payerLoading} type="submit">
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
  )
}

export default EditPayerForm