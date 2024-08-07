import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

import profileImg from "/profile_img.png"
import {supabaseClient} from "@/clientDef.ts";
import {useLocation, useNavigate} from "react-router-dom";

const BADPATH = ['/error404', '/payments/not-found', '/payers/not-found']

export default function AvatarComponent() {
  const nav = useNavigate()
  const location = useLocation()


  const handleLogout = async () => {
    if (!BADPATH.includes(location.pathname)) {
      localStorage.setItem("logoutURL", location.pathname + location.search)
    }
    await supabaseClient.auth.signOut()
    nav('/login')
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="bg-white">
            <AvatarImage src={profileImg} alt="profile img"/>
            <AvatarFallback className="text-black">IMG</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}