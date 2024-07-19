import {Outlet, useNavigate} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useEffect} from "react";

function App() {
// ,darkMode && "dark bg-slate-900"
  const nav = useNavigate()

  useEffect(() => {
    const logoutURL = localStorage.getItem("logoutURL")
    if (logoutURL) {
      nav(logoutURL)
    }
    console.log("App loop")
  }, [nav]);

  return (
      <>
        <div className="min-h-screen dark:bg-slate-900">
          <Header/>
          <div className="container mt-10">
            <Outlet/>
          </div>
          <Toaster/>
        </div>
      </>
  )
}

export default App
