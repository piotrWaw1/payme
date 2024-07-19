import {useSession} from "@/hooks/useSession.tsx";
import Header from "@/components/header/Header.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {Undo2} from "lucide-react";

export default function Error404() {
  const session = useSession()
  const nav = useNavigate()

  const handleClick = () => {
    nav(-1)
  }

  return (
      <div className="h-screen flex flex-col">
        {session && <Header/>}
        <div className="flex-grow flex justify-center items-center">
          <div className="border dark:border-none rounded-xl flex flex-col items-center dark:bg-slate-700 px-32 py-20
          shadow-[5px_5px_rgba(255,0,0,_0.4),_10px_10px_rgba(255,0,0,_0.3),_15px_15px_rgba(255,0,0,_0.2),_20px_20px_rgba(255,0,0,_0.1),_25px_25px_rgba(255,0,0,_0.05)] "
          >
            <p className="font-bold text-[#ff3636] text-xl">Oops! Something went wrong.</p>
            <h1 className="font-bold text-9xl text-primary mb-3">404</h1>
            <p className="text-xl text-primary">The page you're looking for doesn't exist.</p>
            <Button
                className="mt-5 text-lg"
                onClick={handleClick}
            >
              Go back
              <Undo2 className="ml-1"/>
            </Button>
          </div>
        </div>
      </div>
  )
}