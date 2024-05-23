import {createContext, ReactNode, useEffect, useState} from "react";
import {supabaseClient} from "@/clientDef.ts";
import {Session} from "@supabase/supabase-js";


export const SessionContext = createContext<null | Session>(null)

export const SessionProvider = ({children}: { children: ReactNode }) => {
  const [session, setSession] = useState<null | Session>(() => checkSession())
  useEffect(() => {
    const {data} = supabaseClient.auth.onAuthStateChange(
        (event, session) => {
          // console.log(event)
          // console.log(session)
          if (event === 'SIGNED_OUT') {
            setSession(null)
          } else if (session) {
            setSession(session)
          }
        })

    return () => {
      data.subscription.unsubscribe()
    }
  }, []);


  return (
      <SessionContext.Provider value={session}>
        {children}
      </SessionContext.Provider>
  )
}

function checkSession() {
  const session = localStorage.getItem('sb-urlsypnpyiqmnsmmysrk-auth-token')
  return JSON.parse(session || 'null')
}