import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {

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
