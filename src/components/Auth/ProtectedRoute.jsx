import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ToCheck from "./TokenExn";

export default function ProtectedRoute({ admin }) {
  const location = useLocation()
  const { user } = useAuth()
  
  if (!user) {
    if (location.pathname === "/login") {
      return <Outlet />
    }
    return <Navigate to={"/login"} replace />
  }
  
  ToCheck()
  
  if (location.pathname === "/login") {
      if (user.adm) {
        return <Navigate to={"/monitoramento"} state={{mensagem:"Bem-vindo(a) de volta!"}} replace />
      } else {
        return <Navigate to={"/home"} state={{mensagem:"Bem-vindo(a) de volta!"}} replace />
      }
  }

  if (admin != user.adm) {
    if (user.adm) {
      return <Navigate to={"/monitoramento"} replace />
    } else {
      return <Navigate to={"/home"} replace />
    }
  }

  return <Outlet />
}
