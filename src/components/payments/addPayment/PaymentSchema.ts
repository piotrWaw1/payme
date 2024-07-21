import {z} from "zod";

export const paymentSchema = z.object({
  payer_id: z.string({required_error: "This field is required"}),
  price: z.string({required_error: "This field is required"}).refine(n => {
    const spl = n.split('.')[1]
    if (spl && !isNaN(parseFloat(n))) {
      return spl.length <= 2
    }
    return !isNaN(parseFloat(n))
  }, {message: "Max precision is 2 decimal places'"}),
  date: z.date({
    required_error: "Date is required."
  })
})

export type PaymentSchema = z.infer<typeof paymentSchema>