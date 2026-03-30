import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { type LucideIcon, ChevronLeft, ChevronRight, Settings, User, LogOut, Sun, Moon } from 'lucide-react';

interface NavItem {
  label: string;
  icon: LucideIcon;
  view: string;
}

interface SidebarNavigationProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  logo: ReactNode;
  navItems: NavItem[];
  activeView: string;
  onNavClick: (view: string) => void;
  onLogout: () => void;
}

export function SidebarNavigation({ 
  isCollapsed, 
  setIsCollapsed, 
  logo,
  navItems, 
  activeView, 
  onNavClick,
  onLogout
}: SidebarNavigationProps) {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{x: 0, opacity: 1, width: isCollapsed ? 80 : 256}}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="fixed left-0 top-0 h-screen bg-[#071821]/95 backdrop-blur-xl border-r border-cyan-500/20 shadow-2xl flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-4.5 border-b border-cyan-500/20">
        <div className="flex items-center justify-between gap-3">
          {logo}
          
          {/* Collapse Toggle Button */}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl p-2 absolute left-12"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.view;
          
          return (
            <motion.button
              key={item.label}
              onClick={() => onNavClick(item.view)}
              whileHover={{ x: isCollapsed ? 0 : 10, scale: isCollapsed ? 1.1 : 1 }}
              whileTap={{ scale: 0.98 }}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-cyan-500/20 space-y-2">
        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          title={isCollapsed ? 'Settings' : undefined}
          className={`w-full gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </Button>

        {/* User Profile */}
        <Button
          variant="ghost"
          size="sm"
          title={isCollapsed ? 'Profile' : undefined}
          className={`w-full gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <User className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Profile</span>}
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          title={isCollapsed ? 'Logout' : undefined}
          className={`w-full gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </motion.aside>
  );
}
