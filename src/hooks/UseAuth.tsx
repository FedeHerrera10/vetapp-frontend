import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
    login:(jwtToken : string )=>void,
    loading:boolean
  };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> =  ({children}) =>{
    
    const [token , setToken ] = useState(localStorage.getItem('vetapp-token'));
    const [loading , setLoading] = useState(true);
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    
    
    const login = (jwtToken:string)=>{
      localStorage.setItem('vetapp-token',jwtToken);
      setIsAuthenticated(true);
      setToken(jwtToken);
    }

    useEffect(() => {
      const jwtls = localStorage.getItem('vetapp-token');
      if (jwtls)  setIsAuthenticated(true); 
      setLoading(false)
    }, [])
    

    return (
        <AuthContext.Provider value = {{ isAuthenticated , token ,setIsAuthenticated  , login , loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
  };