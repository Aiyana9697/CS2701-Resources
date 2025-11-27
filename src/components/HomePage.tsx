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
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { FloatingParticles } from './ui/FloatingParticles';

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
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen flex relative ${
        theme === 'dark'
          ? 'bg-slate-950'
          : 'bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950'
      }`}
    >
      {/* Floating particles */}
      {theme === 'light' && <FloatingParticles />}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed left-0 top-0 h-screen w-64 flex flex-col z-50 backdrop-blur-md shadow-2xl border-r ${
          theme === 'dark'
            ? 'bg-slate-950/95 border-cyan-500/20'
            : 'bg-white/10 border-white/20'
        }`}
      >
        {/* Logo */}
        <div className="p-4.5 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
              <Waves className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-white">OceanSDG</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;

            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setActiveNav(item.label);
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </motion.a>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-cyan-500/20 space-y-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-sm">Toggle Theme</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10"
          >
            <User className="w-5 h-5" />
            <span className="text-sm">Profile</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 ml-64 relative z-10">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`sticky top-0 z-40 backdrop-blur-md px-8 py-4 border-b ${
            theme === 'dark'
              ? 'bg-slate-950/95 border-cyan-500/20'
              : 'bg-white/0 border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="t ext-white">Welcome Back!</h1>
              <p className="text-slate-400 text-sm">
                Explore ocean conservation insights and data
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white">Ocean Explorer</p>
                <p className="text-xs text-slate-400">explorer@oceansdg.org</p>
              </div>
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                <User className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Page sections */}
        <main className="px-6 py-12 space-y-12">
          <section className="text-center">
            <h1 className="text-4xl font-bold text-cyan-300 mb-4">Hero Section</h1>
            <p className="text-gray-300">
              This is where the main headline and welcome message go.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Map Preview</h2>
            <div className="w-full h-64 bg-black/30 rounded-xl border border-cyan-500/20"></div>
          </section>

          <section>
            <h2 className="text-2xl text-cyan-300 font-semibold mb-4">My Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">Stat 1</div>
              <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">Stat 2</div>
              <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">Stat 3</div>
              <div className="p-6 bg-black/30 rounded-xl border border-cyan-500/20">Stat 4</div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-cyan-300 font-semibold mb-4">Impact Metrics</h2>
            <div className="w-full h-40 bg-black/30 rounded-xl border border-cyan-500/20"></div>
          </section>

          <section>
            <h2 className="text-2xl text-cyan-300 font-semibold mb-4">Learning Modules</h2>
            <div className="w-full h-40 bg-black/30 rounded-xl border border-cyan-500/20"></div>
          </section>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 mt-16 border-t border-cyan-500/20 text-center text-gray-500">
          <p className="mb-2">OceanIQ - Exploring the depths, preserving the future</p>
          <p className="text-sm">© 2025 OceanIQ. Marine conservation through education.</p>
        </footer>
      </div>
    </div>
  );
}
