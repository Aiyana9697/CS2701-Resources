import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingParticles } from './FloatingParticles';

interface DashboardLayoutProps {
  sidebar: ReactNode;
  topBar: ReactNode;
  children: ReactNode;
  isCollapsed: boolean;
  activeView: string;
}

export function DashboardLayout({ 
  sidebar, 
  topBar, 
  children, 
  isCollapsed,
  activeView 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071821] via-slate-950 to-[#071821] flex relative overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Sidebar */}
      {sidebar}

      {/* Main Content Area */}
      <motion.div 
        animate={{ 
          marginLeft: isCollapsed ? '4rem' : '16rem'
        }}
        transition={{ duration: 0.3 }}
        className="flex-1 relative"
      >
        {/* Top Bar */}
        {topBar}

        {/* Page Content with animated view switching */}
        <div className="relative min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
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
      </motion.div>
    </div>
  );
}