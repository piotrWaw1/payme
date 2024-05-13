import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {
  // const test = async () => {
  //
  //   const {error} = await supabaseClient.from('payers')
  //       .insert({
  //         payer_name: "B",
  //       })
  //   console.log(error)
  //
  //   // const {data,error} = await supabaseClient.from('payers').select()
  //   // console.log(data)
  //   // console.log(error)
  // }

  return (
      <>
        <Header/>
        <div className="container mt-10">
          <Outlet/>
        </div>
        <Toaster/>
      </>
  )
}

export default App
