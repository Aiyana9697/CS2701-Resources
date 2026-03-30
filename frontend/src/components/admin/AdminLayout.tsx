import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Database, 
  FileText, 
  BarChart3, 
  AlertTriangle,
  Shield
} from 'lucide-react';
import { DashboardLayout } from '../shared/DashboardLayout';
import { SidebarNavigation } from '../shared/SidebarNavigation';
import { TopBar } from '../shared/TopBar';

interface AdminLayoutProps {
  onLogout: () => void;
  children: ReactNode;
  activeTab: 'users' | 'datasets' | 'eia' | 'analytics' | 'alerts';
  setActiveTab: (tab: 'users' | 'datasets' | 'eia' | 'analytics' | 'alerts') => void;
}

const navItems = [
  { label: 'Analytics', icon: BarChart3, view: 'analytics' },
  { label: 'Users', icon: Users, view: 'users' },
  { label: 'Datasets', icon: Database, view: 'datasets' },
  { label: 'EIA Entries', icon: FileText, view: 'eia' },
  { label: 'Alerts', icon: AlertTriangle, view: 'alerts' },
];

export function AdminLayout({ onLogout, children, activeTab, setActiveTab }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const logo = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
        <Shield className="w-6 h-6 text-cyan-400" />
      </div>
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-white font-semibold">Admin Panel</p>
          <p className="text-cyan-400 text-xs">System Control</p>
        </motion.div>
      )}
    </div>
  );

  return (
    <DashboardLayout
      isCollapsed={isCollapsed}
      activeView={activeTab}
      sidebar={
        <SidebarNavigation
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          logo={logo}
          navItems={navItems}
          activeView={activeTab}
          onNavClick={(view) => setActiveTab(view as any)}
          onLogout={onLogout}
        />
      }
      topBar={
        <TopBar
          title="Admin Dashboard"
          subtitle="Manage system settings and monitor platform activity"
          userName="Admin User"
          userEmail="admin@oceansdg.org"
          icon={Shield}
        />
      }
    >
      <div className="px-8 py-8">
        {children}
      </div>
    </DashboardLayout>
  );
}