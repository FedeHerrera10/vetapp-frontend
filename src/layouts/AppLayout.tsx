import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { Spinner } from "../components/ui/Spinner";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { NavbarDash } from "../components/ui/NavbarDash";
import { Sidebar } from "../components/ui/Sidebar";

export const AppLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarDash
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        role={data.roles[0].name}
      />
      <main
        className={`pt-16 min-h-screen transition-all duration-300
          ${isCollapsed ? "lg:pl-16" : "lg:pl-64"}
          ${isMobileMenuOpen ? "pl-64" : "pl-0"}`}
      >
        <Outlet />
      </main>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
};
