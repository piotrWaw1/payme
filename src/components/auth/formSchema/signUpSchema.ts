import {z} from "zod";

export const signUpSchema = z.object({
  email: z.string().email().min(1, "This field is required"),
  username: z.string().min(4),
  password: z.string().min(6, "Password must contain at least 6 characters"),
  repeatPassword: z.string().min(1, "Repeat your password")
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"]
})

export type SignUpData = z.infer<typeof signUpSchema>