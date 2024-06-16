import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {

  return (
      <>
        <Header/>
        <div className="container mt-10">
          <Outlet/>
          {/*<DataTableDemo/>*/}
        </div>
        <Toaster/>
      </>
  )
}

export default App
