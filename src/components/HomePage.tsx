import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import {
  Waves,
  Home,
  Map,
  BookOpen,
  FlaskConical,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { FloatingParticles } from './ui/FloatingParticles';
// import { InteractiveMapSection } from './dashboard/InteractiveMapSection';
// import { EducationalSection } from './dashboard/EducationalSection';
// import { LearningModulesSection } from './dashboard/LearningModulesSection';
// import { ImpactAnalysisSection } from './dashboard/ImpactAnalysisSection';
// import { ResearchPlatformSection } from './dashboard/ResearchPlatformSection';
// import { MyStatsSection } from './dashboard/MyStatsSection';
// import { SavedItemsSection } from './dashboard/SavedItemsSection';

interface HomePageProps {
  onLogout?: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: Home, href: '#dashboard' },
  { label: 'Map', icon: Map, href: '#map' },
  { label: 'Learn', icon: BookOpen, href: '#learn' },
  { label: 'Research', icon: FlaskConical, href: '#research' },
  { label: 'Impact', icon: TrendingUp, href: '#impact' },
];

export function HomePage({ onLogout }: HomePageProps) {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (label: string, href: string) => {
    setActiveNav(label);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071821] via-slate-950 to-[#071821] flex relative overflow-hidden">
      <FloatingParticles />

      {/* Vertical Sidebar Navigation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: collapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="fixed left-0 top-0 h-screen w-64 bg-[#071821]/95 backdrop-blur-xl border-r border-cyan-500/20 shadow-2xl flex flex-col z-50"
      >
        {/* Logo + Collapse Button Row */}
        <div className="p-4.5 border-b border-cyan-500/20 flex items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
              <Waves className="w-6 h-6 text-cyan-400" />
            </div>

            {!collapsed && (
              <span className={theme === "dark" ? "text-white" : "text-slate-800"}>
                OceanIQ
              </span>
            )}
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-cyan-500/10 rounded-md transition"
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-cyan-400" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-cyan-400" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;

            return (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.href)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ ease: "linear", duration: 0 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </motion.button>
            );
          })}
        </nav>


        {/* Bottom Section */}
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
            {!collapsed && <span className="text-sm">Toggle Theme</span>}
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Settings</span>}
          </Button>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
          >
            <User className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Profile</span>}
          </Button>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"} relative z-10`}
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

        {/* Page Content with all sections */}
        <div className="relative">
          <div className="space-y-0">
            {/* <MyStatsSection />
            <InteractiveMapSection />
            <EducationalSection />
            <LearningModulesSection />
            <ImpactAnalysisSection />
            <ResearchPlatformSection />
            <SavedItemsSection /> */}
          </div>
        </div>
      </div>
    </div>
  );
}