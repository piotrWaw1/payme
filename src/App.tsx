import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header.tsx";

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
        <div className="container mt-5">
          <Outlet/>
        </div>
      </>
  )
}

export default App
