import { useState } from 'react';
import { HomePage } from './HomePage';
import { SavedItems } from './SavedItemsSection';
import { InteractiveMap } from './InteractiveMapSection';
import { LearningModules } from './LearningModulesSection';
// import { ResearchHub } from '../ResearchHub';
import { ImpactAnalysis } from './ImpactAnalysisSection';
import { MyStats } from './MyStatsSection';

interface UserDashboardProps {
  onLogout: () => void;
}

export function UserDashboard({ onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'learn' | 'research' | 'impact'>('dashboard');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <MyStats />
            <SavedItems />
          </>
        );
      case 'map':
        return <InteractiveMap/>;
      case 'learn':
        return <LearningModules />;
      case 'research':
        // return < />;
      case 'impact':
        return <ImpactAnalysis />;
      default:
        return <SavedItems />;
    }
  };

return (
  <HomePage
    onLogout={onLogout}
    activeTab={activeTab}
    setActiveTab={setActiveTab}
  >
    {renderActiveView()}
  </HomePage>
);
}
