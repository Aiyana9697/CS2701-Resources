import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Home, 
  Map, 
  GraduationCap, 
  Database, 
  TrendingUp, 
  Bookmark 
} from 'lucide-react';
import { DashboardLayout } from '../shared/DashboardLayout';
import { SidebarNavigation } from '../shared/SidebarNavigation';
import { TopBar } from '../shared/TopBar';
import { InteractiveMap } from '../home/InteractiveMapSection';
import { LearningModules } from '../home/LearningModulesSection';
import { ImpactAnalysis} from '../home/ImpactAnalysisSection';
import { ResearchPlatform} from '../home/ResearchPlatformSection';
import { MyStats } from '../home/MyStatsSection';
import { SavedItems } from '../home/SavedItemsSection';

interface HomePageProps {
  onLogout?: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: Home, view: 'dashboard' },
  { label: 'Map', icon: Map, view: 'map' },
  { label: 'Learn', icon: GraduationCap, view: 'learn' },
  { label: 'Research', icon: Database, view: 'research' },
  { label: 'Impact', icon: TrendingUp, view: 'impact' },
];

export function HomePage({ onLogout }: HomePageProps) {
  const [activeView, setActiveView] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavClick = (view: string) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <MyStats />
            <SavedItems />
          </>
        );
      case 'map':
        return <InteractiveMap />;
      case 'learn':
        return (
          <>
            <LearningModules />
          </>
        );
      case 'research':
      return <ResearchPlatform />;
      case 'impact':
        return <ImpactAnalysis/>;
      default:
        return <MyStats />;
    }
  };

  const logo = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
        <Waves className="w-6 h-6 text-cyan-400" />
      </div>
      {!isCollapsed && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-white"
        >
          OceanIQ
        </motion.span>
      )}
    </div>
  );

  return (
    <DashboardLayout
      isCollapsed={isCollapsed}
      activeView={activeView}
      sidebar={
        <SidebarNavigation
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          logo={logo}
          navItems={navItems}
          activeView={activeView}
          onNavClick={handleNavClick}
          onLogout={onLogout || (() => {})}
        />
      }
      topBar={
        <TopBar
          title="Welcome Back!"
          subtitle="Explore ocean conservation insights and data"
          userName="Ocean Explorer"
          userEmail="explorer@oceansdg.org"
          icon={Bookmark}
        />
      }
    >
      {renderActiveView()}
    </DashboardLayout>
  );
}