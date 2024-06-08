import {NavLink} from "react-router-dom";
import AvatarComponent from "@/components/header/AvatarComponent.tsx";
import {cn} from "@/lib/utils.ts";

// text-lg ease-in-out duration-200 hover:text-xl hover:underline hover:font-semibold
export default function Header() {

  const active = 'underline font-semibold text-xl'
  const def = "text-lg ease-in-out duration-200 hover:text-xl hover:underline hover:font-semibold"

  return (
      <div className="bg-gradient-to-l from-cyan-400 via-sky-400 to-blue-500">
        <nav className="container text-white py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NavLink to='/'>
              <h1 className="font-bold text-2xl mr-5">PayMe</h1>
            </NavLink>
            <NavLink
                className={({isActive}) => cn(def, isActive && active)}
                to='/'
            >
              Home
            </NavLink>
            <NavLink
                className={({isActive}) => cn(def, isActive && active)}
                to='/payments'>
              Payments
            </NavLink>
            <NavLink
                className={({isActive}) => cn(def, isActive && active)}
                to='/payers'>
              Payers
            </NavLink>
          </div>
          <AvatarComponent/>
        </nav>
      </div>
  )
}