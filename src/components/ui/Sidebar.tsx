import { FC } from "react";
import {
  ClipboardList,
  Users,
  Calendar,
  UserRound,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { NavItem } from "../../types";
import { Link } from "react-router-dom";
import { getMenu } from "../../types/sidebarMenu";

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  role: string;
}

export const Sidebar: FC<SidebarProps> = ({
  isCollapsed,
  toggleCollapse,
  role,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ClipboardList":
        return <ClipboardList className="h-5 w-5" />;
      case "Users":
        return <Users className="h-5 w-5" />;
      case "Calendar":
        return <Calendar className="h-5 w-5" />;
      case "UserRound":
        return <UserRound className="h-5 w-5" />;
      case "BarChart3":
        return <BarChart3 className="h-5 w-5" />;

      default:
        return null;
    }
  };
  const navItems: NavItem[] = getMenu(role);
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleCollapse}
        className="fixed top-5 left-4 z-30 lg:hidden"
        aria-label="Toggle mobile menu"
      >
        <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-[40vh] bg-white  dark:bg-gray-800 border-r border-gray-200 border-b-2 dark:border-gray-700 z-10 
          ${isCollapsed ? "hidden md:block md:w-20 md:h-full" : "w-full md:w-64 md:h-full"} 
          translate-x-0 transition-all duration-100 `}
      >
        <div className="flex flex-col h-full pt-16">
          {/* Collapse Button (Desktop only) */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex absolute right-0 top-20 transform translate-x-1/2 h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-800 items-center justify-center shadow-md"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            )}
          </button>

          {/* Navigation Items */}
          <nav className="flex-1 px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`/app/${item.href}`}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg mb-1 font-medium md:font-normal
                  text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white  dark:hover:bg-indigo-900/20
                   dark:hover:text-indigo-400 transition-colors`}
              >
                <span className=" flex-shrink-0">{getIcon(item.icon)}</span>
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
