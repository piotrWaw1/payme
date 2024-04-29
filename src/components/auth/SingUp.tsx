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
import leftArrow from "/left-small-arrow.svg"
import {Link} from "react-router-dom";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {SignUpData, signUpSchema} from "@/components/auth/formSchema/signUpSchema.ts";
import useSignUp from "@/hooks/useSignUp.tsx";
import {Loader2} from "lucide-react";

export default function SingUp() {

  const {signUp, isLoading, error} = useSignUp()

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: ""
    },
  })

  return (
      <div className="relative w-96 p-5 pb-6 border-2 border-gray-300 bg-white rounded-2xl shadow-2xl">
        <div className="flex justify-between">
          <h1 className="mb-4 text-3xl font-bold">Sign Up</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link to="/login">
                  <img src={leftArrow} alt="go back arrow"
                       className="w-12 transition ease-in-out delay-75 hover:scale-125"/>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go back to login</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-red-500 font-bold">{error}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signUp)} className="space-y-3">
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
                        <Input autoComplete="on" type={"password"} placeholder="••••••••" {...field} />
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
                        <Input autoComplete="on" type={"password"} placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              SignUp
            </Button>
          </form>
        </Form>
      </div>
  )
}