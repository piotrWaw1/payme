import {z} from "zod";

export const editPayerFormSchema = z.object({
  payer_name: z.string().min(1,"This field is required"),
  payment_time: z.string().min(1, "This field is required"),
  description: z.string(),
  active: z.boolean(),
})

export type EditPayerData = z.infer<typeof editPayerFormSchema>