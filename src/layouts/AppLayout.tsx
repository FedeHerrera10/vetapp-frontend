import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

export const AppLayout = () => {
  const { isAuthenticated,loading } = useAuth();
  
  
   if (loading) return <p>Cargando....</p>;
   if (!isAuthenticated) return <Navigate to="/auth/login"/>
  
   return (
    <>
      <Outlet/>
    </>
  );
};
