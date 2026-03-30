import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { InteractiveMap } from './components/InteractiveMap';
import { EducationalPortal } from './components/EducationalPortal';
import { ResearchHub } from './components/ResearchHub';
import { ImpactTracker } from './components/ImpactTracker';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthenticationPage';
import { HomePage } from './components/home/HomePage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserDashboard } from './components/home/UserDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'dashboard'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');

  const handleLogin = (role: 'admin' | 'user') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('user');
    setCurrentView('home');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950 text-white">
        {currentView === 'auth' ? (
          <AuthPage 
            onBack={() => setCurrentView('home')} 
            onLogin={handleLogin}
          />
        ) : currentView === 'dashboard' && isAuthenticated ? (
          userRole === 'admin' ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <UserDashboard onLogout={handleLogout} />
          )
        ) : (
          <>
            <Navigation onGetStarted={() => setCurrentView('auth')} />
            
            <main>
              <section id="home">
                <HeroSection />
              </section>
              
              <section id="map">
                <InteractiveMap />
              </section>
              
              <section id="learn">
                <EducationalPortal />
              </section>
              
              <section id="research">
                <ResearchHub />
              </section>
              
              <section id="impact">
                <ImpactTracker />
              </section>
            </main>
            
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}