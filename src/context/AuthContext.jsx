import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded)
        }
        setLoading(false)
    }, [])

    const logout = ()=>{
        setUser(null)
        localStorage.removeItem("token")
    }

    if(loading){
       return (  <div id="loading" className="hidden">
            <div className="spinner"></div>
              <p className='text-loading'>Carregando...</p>
          </div>)
    }


    return(
        <AuthContext.Provider value={{user, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>  {return useContext(AuthContext)}