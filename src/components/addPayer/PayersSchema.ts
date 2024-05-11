import {z} from "zod";

export const payersSchema = z.object({
  payer_name: z.string().min(1,"This field is required"),
  payment_time: z.string().min(1, "This field is required"),
  description: z.string()
})

export type AddPayerData = z.infer<typeof payersSchema>