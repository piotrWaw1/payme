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
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import google from "/google_icon.svg"
import {Link} from "react-router-dom";
import useLogIn from "@/hooks/useLogIn.tsx";
import {formSchema, LogInData} from "@/components/auth/formSchema/logInSchema.ts";
import {Loader2} from "lucide-react";
import {supabaseClient} from "@/clientDef.ts";

export default function Login() {
  const {logIn, isLoading, error} = useLogIn()

  const form = useForm<LogInData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const logWithGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://payme-wfdv.onrender.com/callback`,
      },
    })
  }

  return (
      <div className="relative w-96 p-5 border-2 border-gray-300 dark:border-gray-500 bg-white rounded-2xl shadow-2xl dark:bg-slate-900">
        <h2 className="mb-4 text-3xl font-bold">Login</h2>
        <p className="text-red-500 font-bold">{error}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(logIn)} className="space-y-3">
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
                        <Input autoComplete="yes" type={"password"} placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Log in
            </Button>
          </form>
        </Form>
        <div className="relative flex mt-3 items-center">
          <div className="flex-grow border-t border-b border-gray-400"></div>
          <span className="font-bold flex-shrink mx-3 text-gray-700 dark:text-gray-300">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-b border-gray-400"></div>
        </div>
        <Button onClick={logWithGoogle}
                className="bg-transparent text-primary w-full py-3 mt-3 border border-primary font-medium hover:text-secondary">
          <img className='w-7 h-7' src={google} alt="google"/>
          Google
        </Button>
        <div className="text-center mt-3">
          <p>Don't have account <Link
              to="/signup"
              className="transition ease-in-out text-cyan-600 underline font-semibold hover:text-blue-800">
            Sign Up
          </Link>
          </p>
        </div>
      </div>
  )
}