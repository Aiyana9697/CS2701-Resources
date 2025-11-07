import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Waves, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import './Navigation.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Map', href: '#map' },
  { label: 'Learn', href: '#learn' },
  { label: 'Research', href: '#research' },
  { label: 'Impact', href: '#impact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}
      >
        <div className="nav-container">
          <div className="nav-inner">
            {/* Logo */}
            <div className="nav-logo">
              <div className="nav-logo-icon">
                <Waves className="nav-logo-svg" />
              </div>
              <span className="nav-title">OceanSDG</span>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-links">
              {navLinks.map((link, index) => (
                <a key={index} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="nav-actions">
              <Button onClick={toggleTheme} className="theme-button">
                {theme === 'dark' ? (
                  <Sun className="theme-icon" />
                ) : (
                  <Moon className="theme-icon" />
                )}
              </Button>

              <Button className="cta-button">Get Started</Button>

              {/* Mobile Menu Toggle */}
              <Button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mobile-menu"
        >
          <div className="mobile-menu-container">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-link"
              >
                {link.label}
              </a>
            ))}
            <Button className="mobile-cta">Get Started</Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
