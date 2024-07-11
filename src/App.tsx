import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {
// ,darkMode && "dark bg-slate-900"
  return (
      <>
        <div className={"min-h-screen dark:bg-slate-900"}>
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
