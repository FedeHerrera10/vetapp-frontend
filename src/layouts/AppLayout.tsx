import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/UseAuth";
import { Spinner } from "@/components/ui/Spinner";

export const AppLayout = () => {
  const [isDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const { data, isError, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="h-screen flex flex-col justify-center items-center w-full">
        <h1 className="text-center text-xl text-gray-700 font-medium">
          Cargando
        </h1>
        <Spinner />
      </div>
    );

  if (isError) {
    localStorage.removeItem("vetapp");
    return <Navigate to="/auth/login" />;
  }

  if (data.password_expired) {
    localStorage.removeItem("vetapp");
    return <Navigate to="/auth/reset-password" />;
  }

  return (
    <>
      <div>
        <Outlet />
      </div>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};
