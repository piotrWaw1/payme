import {LogInData} from "@/components/auth/formSchema/logInSchema.ts";
import {useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {useNavigate} from "react-router-dom";

export default function useLogIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()
  const logIn = async (formValues: LogInData) => {
    try {
      setIsLoading(true)
      const {error} = await supabaseClient.auth.signInWithPassword(formValues)
      if (error) {
        setError(error.message)
      } else {
        const lastLink = localStorage.getItem("logoutURL")
        if (lastLink) {
          localStorage.removeItem("logoutURL")
          nav(lastLink)
        }
      }
    } catch (err) {
      setError("Check your internet connection and try again later")
    } finally {
      setIsLoading(false)
    }
  }

  return {logIn, isLoading, error}
}