import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {cn} from "@/lib/utils.ts";
import useDarkMode from "@/hooks/useDarkMode.tsx";

function App() {
  const {darkMode} = useDarkMode()
  return (
      <>
        <div className={cn(darkMode && "dark")}>
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
