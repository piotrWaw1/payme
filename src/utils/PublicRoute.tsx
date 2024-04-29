import {Navigate} from "react-router-dom";
import {FC, ReactNode} from "react";
import {checkSession} from "@/utils/checkSession.ts";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: FC<PublicRouteProps> = ({children}) => {
  return checkSession() ? <Navigate to={"/"}/> : children
}

export default PublicRoute