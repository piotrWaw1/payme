import {Link} from "react-router-dom";
import AvatarComponent from "@/components/header/AvatarComponent.tsx";


export default function Header() {
  return (
      <div className="bg-gradient-to-l from-cyan-400 via-sky-400 to-blue-500">
        <nav className="container text-white py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to='/'>
              <h1 className="font-bold text-2xl mr-5">PayMe</h1>
            </Link>
            <Link to='/'>
              <p className="text-lg ease-in-out duration-200 hover:text-xl hover:underline hover:font-semibold">Home</p>
            </Link>
            <Link to='/payments'>
              <p className="text-lg mx-5 ease-in-out duration-200 hover:text-xl hover:underline hover:font-semibold">Payments</p>
            </Link>
            <Link to='/payers'>
              <p className="text-lg ease-in-out duration-200 hover:text-xl hover:underline hover:font-semibold">Payers</p>
            </Link>
          </div>
          <AvatarComponent/>
        </nav>
      </div>
  )
}