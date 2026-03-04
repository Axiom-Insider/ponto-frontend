import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function ToCheck() {
    const {logout} = useAuth()

    try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
            logout()
            return <Navigate to="/login" state={{erro:"As credenciais expiraram"}} replace />;
        }
    } catch {
         logout()
         return <Navigate to="/login" state={{erro:"As credenciais expiraram"}} replace />;
    }
}

