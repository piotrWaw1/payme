import {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useSession} from "@/hooks/useSession.tsx";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
  const session = useSession()
  return (
      !session ? <Navigate to={'/login'} replace /> : children
  )
}
export default PrivateRoute