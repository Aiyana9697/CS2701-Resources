import './App.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { InteractiveMap } from './components/InteractiveMap';
import { EducationalPortal } from './components/EducationalPortal';
import { ResearchHub } from './components/ResearchHub';
import { ImpactTracker } from './components/ImpactTracker';
import { Footer } from './components/Footer';



export default function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Navigation />


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
      </div>
    </ThemeProvider>
  );
}
