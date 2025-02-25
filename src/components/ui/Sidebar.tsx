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

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const navItems: NavItem[] = [
  {
    id: "clinical",
    title: "Clinical History",
    icon: "ClipboardList",
    href: "/clinical",
  },
  { id: "vets", title: "Veterinarians", icon: "Users", href: "/vets" },
  {
    id: "appointments",
    title: "Appointments",
    icon: "Calendar",
    href: "/appointments",
  },
  { id: "patients", title: "Patients", icon: "UserRound", href: "/patients" },
];

export const Sidebar: FC<SidebarProps> = ({
  isCollapsed,
  toggleCollapse,
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    ClipboardList: <ClipboardList className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Calendar: <Calendar className="h-5 w-5" />,
    UserRound: <UserRound className="h-5 w-5" />,
    BarChart3: <BarChart3 className="h-5 w-5" />,
  };

  const getIcon = (iconName: string) => iconMap[iconName] || null;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-5 left-4 z-30 lg:hidden"
        aria-label="Toggle mobile menu"
      >
        <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10 
          ${isCollapsed ? "w-16" : "w-64"} 
          lg:translate-x-0 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-16">
          {/* Collapse Button (Desktop only) */}
          <button
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
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
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg mb-1
                  text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20
                  hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors`}
              >
                <span className="flex-shrink-0">{getIcon(item.icon)}</span>
                {!isCollapsed && <span>{item.title}</span>}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
