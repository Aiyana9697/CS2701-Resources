import { useEffect, useState } from 'react';
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
import { InteractiveTimeline } from './components/home/InteractiveTimelines';
import { authService } from './services';

export default function App() {
  const currentUser = authService.getCurrentUser();
  const initialAuthenticated = authService.isAuthenticated();
  const initialRole = currentUser?.role === 'ADMIN' ? 'admin' : 'user';

  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'dashboard' | 'timelines'>(
    initialAuthenticated ? 'dashboard' : 'home'
  );
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [userRole, setUserRole] = useState<'admin' | 'user'>(initialRole);

  const handleLogin = (role: 'admin' | 'user') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserRole('user');
    setCurrentView('home');
  };

  useEffect(() => {
    const handleAuthExpired = () => {
      setIsAuthenticated(false);
      setUserRole('user');
      setCurrentView('auth');
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950 text-white">
        {currentView === 'auth' ? (
          <AuthPage 
            onBack={() => setCurrentView('home')} 
            onLogin={handleLogin}
          />
        ) : currentView === 'timelines' ? (
          <InteractiveTimeline onBack={() => setCurrentView(isAuthenticated ? 'dashboard' : 'home')} />
        ) : currentView === 'dashboard' && isAuthenticated ? (
          userRole === 'admin' ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <HomePage
              onLogout={handleLogout}
              onNavigateToTimeline={() => setCurrentView('timelines')}
            />
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
