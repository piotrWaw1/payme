import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {supabaseClient} from "@/clientDef.ts";

function App() {
  const nav = useNavigate()

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    nav('/login')
  }

  return (
      <div>
        <Button className="bg-amber-400" onClick={handleLogout}>logout</Button>
      </div>
  )
}

export default App
