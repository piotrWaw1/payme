import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

import profileImg from "/profile_img.png"
import {supabaseClient} from "@/clientDef.ts";
import {useNavigate} from "react-router-dom";

export default function AvatarComponent() {
  const nav = useNavigate()
  const handleLogout = async () => {
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
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}