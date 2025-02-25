import { FC, useState } from "react";
import { Sun, Moon, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { UserMenuOption } from "../../types";
import { BrandLink } from "./BrandLink";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const userMenuOptions: UserMenuOption[] = [
  {
    id: "profile",
    label: "Profile",
    icon: "User",
    action: () => console.log("Profile clicked"),
  },
  {
    id: "logout",
    label: "Logout",
    icon: "LogOut",
    action: () => console.log("Logout clicked"),
  },
];

export const NavbarDash: FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* <h1 className="text-xl font-semibold text-green-600 dark:text-green-400 hidden lg:block">
            Vet App
          </h1> */}
          <div className="hidden lg:block">
            <BrandLink isDarkMode={isDarkMode} />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-700 flex items-center justify-center">
                <User className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 dark:text-white py-1">
                {userMenuOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      option.action();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {option.icon === "User" && <User className="h-4 w-4" />}
                    {option.icon === "Settings" && (
                      <Settings className="h-4 w-4" />
                    )}
                    {option.icon === "LogOut" && <LogOut className="h-4 w-4" />}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
