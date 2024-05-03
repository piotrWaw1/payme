import {Navigate} from "react-router-dom";
import {FC, ReactNode} from "react";
import {useSession} from "@/hooks/useSession.tsx";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: FC<PublicRouteProps> = ({children}) => {
  const session = useSession()
  return session ? <Navigate to={"/"}/> : children
}

export default PublicRoute