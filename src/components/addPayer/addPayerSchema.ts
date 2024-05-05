import {z} from "zod";

export const addPayerSchema = z.object({
  payer_name: z.string().min(1,"This field is required"),
  payment_type: z.string().min(1, "This field is required"),
  description: z.string()
})

export type AddPayerData = z.infer<typeof addPayerSchema>