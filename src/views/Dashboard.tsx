import { useState } from "react";
import { NavbarDash } from "../components/ui/NavbarDash";
import { Sidebar } from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";
import useTheme from "../hooks/UseTheme";

export const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavbarDash isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />

      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <main
        className={`pt-16 min-h-screen transition-all ease-in-out duration-300
          ${isCollapsed ? "pl-16" : "lg:pl-64 "}`}
      >
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
