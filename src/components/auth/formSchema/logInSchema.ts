import {z} from "zod";

export const formSchema = z.object({
  email: z.string().email().min(1, "This field is required"),
  password: z.string().min(1, "This field is required")
})

export type LogInData = z.infer<typeof formSchema>
