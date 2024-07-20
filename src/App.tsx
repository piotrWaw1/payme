import {Outlet, useNavigate} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useEffect} from "react";

function App() {
// ,darkMode && "dark bg-slate-900"
  const nav = useNavigate()

  useEffect(() => {
    const lastLink = localStorage.getItem("logoutURL")
    if (lastLink) {
      localStorage.removeItem("logoutURL")
      nav(lastLink)
    }
  }, [nav]);

  return (
      <div className="min-h-screen dark:bg-slate-900 flex flex-col">
        <Header/>
        <div className="container flex-grow flex flex-col mt-10">
          <Outlet/>
        </div>
        <Toaster/>
      </div>
  )
}

export default App
