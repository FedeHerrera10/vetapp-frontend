import { useState, useEffect } from "react";
import { NavbarDash } from "../components/ui/NavbarDash";
import { Sidebar } from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
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
      />

      <main
        className={`pt-16 min-h-screen transition-all duration-300
          ${isCollapsed ? "lg:pl-16" : "lg:pl-64"}
          ${isMobileMenuOpen ? "pl-64" : "pl-0"}`}
      >
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Outlet/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
