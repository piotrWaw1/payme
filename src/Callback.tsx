import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSession} from "@/hooks/useSession.tsx";

export default function Callback() {
  const session = useSession()
  const nav = useNavigate()

  useEffect(() => {
    if (session) {
      nav('/')
    }
  }, [nav, session]);

  return null
}