import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import google from "../../../public/google_icon.svg"
import {Link} from "react-router-dom";

export default function Login() {
  const formSchema = z.object({
    email: z.string().email().min(1, "This field is required"),
    password: z.string().min(1, "This field is required")
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
      <div className="container flex justify-center items-center h-screen ">
        <div className="w-96 p-5 border-2 border-gray-300 rounded-2xl shadow-2xl">
          <h1 className="mb-4 text-3xl font-bold">Login</h1>
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
              <Button type="submit">Log in</Button>
            </form>
          </Form>
          <div className="relative flex mt-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="font-bold flex-shrink mx-3 text-gray-700">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <Button className="bg-transparent text-black w-full py-3 mt-3 border border-black font-medium hover:text-white">
            <img className='w-7 h-7' src={google} alt="google"/>
            Google
          </Button>
          <div className="text-center mt-2">
            <p>Don't have account <Link to="/sing" className="text-blue-500 underline font-semibold">Sign Up</Link></p>
          </div>
        </div>
      </div>
  )
}