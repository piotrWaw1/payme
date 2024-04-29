import {useState} from "react";

import {supabaseClient} from "@/clientDef.ts";
import {SignUpData} from "@/components/auth/formSchema/signUpSchema.ts";
import {useNavigate} from "react-router-dom";

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()
  const signUp = async (formValues: SignUpData) => {
    try {
      setIsLoading(true)
      const {email, password} = formValues
      const {error} = await supabaseClient.auth.signUp(
          {
            email,
            password,
          }
      )
      if (error) {
        setError(error.message)
      } else {
        nav('/')
      }
    } catch (err) {
      setError("Check your internet connection and try again later")
    } finally {
      setIsLoading(false)
    }
  }

  return {signUp, isLoading, error}
}