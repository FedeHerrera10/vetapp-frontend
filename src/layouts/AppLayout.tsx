import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { Spinner } from "../components/ui/Spinner";

export const AppLayout = () => {
  const {isError,isLoading} = useAuth();
  if(isLoading )return (
    <div className="container h-screen flex flex-col justify-center items-center">
    <h1 className="text-center text-xl text-gray-700 font-medium">Cargando</h1>
    <Spinner/></div>
  )
  
  if (isError) {
    localStorage.removeItem('vetapp');
    return <Navigate to="/auth/login"/>
  }
   return (
    <>
      <Outlet/>
    </>
  );
};
