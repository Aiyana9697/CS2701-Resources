import "./index.css";
import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { InteractiveMap } from "./components/InteractiveMap";
import { EducationalPortal } from "./components/EducationalPortal";
import { ResearchHub } from "./components/ResearchHub";
import { ImpactTracker } from "./components/ImpactTracker";
import { Footer } from "./components/Footer";

import { AuthPage } from "./components/AuthenticationPage";
import { HomePage } from "./components/HomePage";

export default function App() {
  // Combined routing: public → auth → dashboard
  const [currentView, setCurrentView] = useState<
    "public" | "auth" | "dashboard"
  >("public");

  // Keep your authentication logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("public");
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* AUTH PAGE */}
        {currentView === "auth" && (
          <AuthPage
            onBack={() => setCurrentView("public")}
            onLoginSuccess={handleLogin}
          />
        )}

        {/* DASHBOARD (AUTHENTICATED HOME PAGE) */}
        {currentView === "dashboard" && isAuthenticated && (
          <HomePage onLogout={handleLogout} />
        )}

        {/* PUBLIC LANDING PAGE */}
        {currentView === "public" && (
          <>
            <Navigation onGetStarted={() => setCurrentView("auth")} />

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
