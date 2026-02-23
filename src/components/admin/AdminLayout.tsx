/*
renders a collapsible animated sidebar to manage navigation between admin views 
handles theme toggling / displaying user info & logout functionality
animates transitions between different admin views 
provides consistent layout acorss admin views 
renders the active admin view component via children prop passed in from AdminDashboard
*/
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { 
  Shield, 
  LogOut, 
  BarChart3, 
  Users, 
  Database, 
  FileText, 
  AlertTriangle,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon, 
  Waves,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { FloatingParticles } from '../ui/FloatingParticles';

/*
defines the structure of the props the AdminLayout component expects to receive from its parent component (AdminDashboard): 
- onLogout: function called upon when the user clicks the logout button
- children: active admin view component rendered
- activeTab: currently selected tab in sidebar
- setActiveTab: allows changing the active tab when admin  clicks on a different section in sidebar navigation
*/
interface AdminLayoutProps {
  onLogout: () => void;
  children: React.ReactNode;
  activeTab: 'users' | 'datasets' | 'eia' | 'analytics' | 'alerts';
  setActiveTab: (tab: 'users' | 'datasets' | 'eia' | 'analytics' | 'alerts') => void;
}

// defines navigation items for admin sidebar where each item has a label, icon & corresponding view identifier
const navItems = [
  { label: 'Analytics', icon: BarChart3, view: 'analytics' },
  { label: 'Users', icon: Users, view: 'users' },
  { label: 'Datasets', icon: Database, view: 'datasets' },
  { label: 'EIA Entries', icon: FileText, view: 'eia' },
  { label: 'Alerts', icon: AlertTriangle, view: 'alerts' },
];

/* 
state variable 'isCollapsed' track whether sidebar is collapsed or expanded (default is expanded)
state variable 'theme' reads current theme from ThemeProvider & allows toggling between light/dark mode
*/
export function AdminLayout({ onLogout, children, activeTab, setActiveTab }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
        <div className="min-h-screen bg-gradient-to-b from-[#071821] via-slate-950 to-[#071821] flex relative overflow-hidden">
          <FloatingParticles />
    
          {/* Vertical Sidebar Navigation: 
          defines an animation for sidebar to slide in from the left when component first mounts, & adjusts sidebar width based on if it's collapsed or expanded
          */}
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, width: isCollapsed ? 80 : 256 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="fixed left-0 top-0 h-screen w-64 bg-[#071821]/95 backdrop-blur-xl border-r border-cyan-500/20 shadow-2xl flex flex-col z-50"
          >
            {/* Logo + Collapse Button Row: 
            defines top row of the sidebar which contains the OceanIQ logo and the button to collapse/expand the sidebar                 
            */}
            <div className="p-4.5 border-b border-cyan-500/20 flex items-center justify-between">
    
              {/* Logo Section: 
              defines logo section of sidebar including icon & Admin Panel text (hidden when sidebar is collapsed)
              */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl
                  flex items-center justify-center backdrop-blur-sm border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                  <Waves className="w-6 h-6 text-cyan-400" />
                </div>
    
                {!isCollapsed && (
                  <span className={theme === "dark" ? "text-white" : "text-slate-800"}>
                    Admin Panel
                  </span>
                )}
              </div>
    
              {/* Collapse Button: 
              updates 'isCollapsed' state to toggle between collapsed and expanded sidebar when clicked
              changes icon based on whether sidebar is currently collapsed or expanded
              */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-cyan-500/10 rounded-md transition"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-5 h-5 text-cyan-400" />
                ) : (
                  <PanelLeftClose className="w-5 h-5 text-cyan-400" />
                )}
              </button>
            </div>

            {/* Navigation Links:  
            maps over the defined 'navItems' array to render a button for each navigation item in sidebar
            - stores the icon component from the navItems array to local variable to render icon dynamically (as <Icon />)
            - checks if nav item corrsponeds to the currently active tab to determine the active state
            
            clicking on a button updates the 'activeTab' state to render the corresponding admin view
            button shifts slightly to the right on hover / scales down when clicked to create a 'press' effect
            active tab is highlighted with different background, text color, shadow to indicate it's selected
            
            renders the icon / label for each navigation item (hiding label when sidebar is collapsed to save space) 
            */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.view;
    
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => setActiveTab(item.view as any)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ ease: "linear", duration: 0 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </motion.button>
                );
              })}
            </nav>
    
    
            {/* 
            creates a container for bottom section of sidebar including theme toggle, settings, user profile & logout buttons
            uses a resusable Button component from ui folder to create each button with consistent styling
            defines buttons for toggling theme, accessing settings, viewing user profile and logging out
            - theme toggle button used to switch between light/dark mode / change icon based on current theme
            - settings & user profile buttons are placeholders for now (doesn't navigate to corresponding views yet)
            - logout button calls  onLogout function passed in as a prop from AdminDashboard to handle user logout functionality
            */}
            <div className="p-4 border-t border-cyan-500/20 space-y-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                {!isCollapsed && <span className="text-sm">Toggle Theme</span>}
              </Button>
    
              {/* Settings */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span className="text-sm">Settings</span>}
              </Button>
    
              {/* User Profile */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
              >
                <User className="w-5 h-5" />
                {!isCollapsed && <span className="text-sm">Profile</span>}
              </Button>
    
              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && <span className="text-sm">Logout</span>}
              </Button>
            </div>
          </motion.aside>
    
          {/* Main Content Area
          acts as the container for the main content of the admin dashboard, which changes based on the active tab selected in the sidebar 
          adjusts its left margin based on whether the sidebar is collapsed or expanded to ensure content is properly aligned
          contains a top bar with a welcome message and user info, which remains sticky (fixed) at the top of the page when scrolling
          uses AnimatePresence and motion.div to animate transitions between different admin views when activeTab changes
          */}
          <div className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"} relative z-10`}
          >
    
            {/* Top Bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="sticky top-0 z-40 bg-[#071821]/95 backdrop-blur-xl border-b border-cyan-500/20 px-8 py-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-white">Welcome Back!</h1>
                  <p className="text-slate-400 text-sm">Explore ocean conservation insights and data</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-white">Ocean Explorer</p>
                    <p className="text-xs text-slate-400">explorer@oceansdg.org</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                    <User className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </motion.div>
    
            {/* Page Content with all sections
            defines the main content area where different admin views will be rendered based on the active tab selected in the sidebar
            ensures when active tab changes, content smoothly transitions with fade & slide animation 
            renders the active admin view component passed in as children prop from AdminDashboard 
            */}
            <div className="relative">
              <div className="space-y-0">
                
                <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-0"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
    
              </div>
            </div>
          </div>
        </div>
      );
    }
