/*
Central dashboard for admin users 
tracks which admin tab is currently active 
renderActiveView function returns the appropriate view component based on the value of activeTab
*/

import { useState } from 'react';
import { AdminLayout } from '../admin/AdminLayout';
import { AnalyticsView } from '../admin/AnalyticsView';
import { UsersView } from '../admin/UsersView';
import { DatasetsView } from '../admin/DatasetsView';
import { EIAView } from '../admin/EIAView';
import { AlertsView } from '../admin/AlertsView';

// defines pops for AdminDashboard component (expects onLogout function to be passed in as a prop)
interface AdminDashboardProps {
  onLogout: () => void;
}
// state variable 'activeTab' keeps track of which admin tab is currently active, default is 'analytics'
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'users' | 'datasets' | 'eia' | 'analytics' | 'alerts'>('analytics');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsView />;
      case 'users':
        return <UsersView />;
      case 'datasets':
        return <DatasetsView />;
      case 'eia':
        return <EIAView />;
      case 'alerts':
        return <AlertsView />;
      default:
        return <AnalyticsView />;
    }
  };

/*
AdminLayout component wraps the entire dashboard to provide consistent layout and styling across all admin views
props passed to AdminLayout include: 
- onLogout function - handles user logout
- activeTab state - indicates which tab is currently active 
- setActiveTab function - allows AdminLayout can handle changing tabs when admin clicks on different sections in the sidebar navigation
renderActiveView function is called to render correct page inside the layout
*/
return (
  <AdminLayout 
    onLogout={onLogout}
    activeTab={activeTab}
    setActiveTab={setActiveTab}
  >
    {renderActiveView()}
  </AdminLayout>
);
}
