import {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {checkSession} from "@/utils/checkSession.ts";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {

  return (
      !checkSession() ? <Navigate to={'/login'}/> : children
  )
}
export default PrivateRoute