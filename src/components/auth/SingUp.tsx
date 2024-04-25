import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function SingUp() {
  const formSchema = z.object({
    email: z.string().email().min(1, "This field is required"),
    username: z.string().min(4),
    password: z.string().min(1, "This field is required"),
    repeatPassword: z.string().min(1, "This field is required")
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: ""
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
      <div className="container flex justify-center items-center h-screen ">
        <div className="w-96 p-5 border-2 border-gray-300 rounded-2xl shadow-2xl">
          <h1 className="mb-4 text-3xl font-bold">Sign Up</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

              <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@example.com" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="username"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>User name</FormLabel>
                        <FormControl>
                          <Input placeholder="example" {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type={"password"} placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>Repeat password</FormLabel>
                        <FormControl>
                          <Input type={"password"} placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <Button type="submit">SignUp</Button>
            </form>
          </Form>
        </div>
      </div>
  )
}