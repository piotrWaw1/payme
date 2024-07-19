import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function ErrorPage() {
  const nav = useNavigate()
  useEffect(() => {
    nav("/error404", {replace: true})
  }, [nav]);

  return null
}