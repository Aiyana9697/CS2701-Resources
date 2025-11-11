import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Waves, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Map', href: '#map' },
  { label: 'Learn', href: '#learn' },
  { label: 'Research', href: '#research' },
  { label: 'Impact', href: '#impact' },
];

interface NavigationProps {
  onGetStarted?: () => void;
}

export function Navigation({ onGetStarted }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/20 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-500/70 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
                <Waves className="w-6 h-6 text-cyan-300" />
              </div>
              <span className="text-white">OceanIQ</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white hover:text-cyan-400 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-white hover:text-cyan-400 hover:bg-cyan-500/10"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              
              <Button
                size="sm"
                onClick={onGetStarted}
                className="hidden md:inline-flex bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Get Started
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
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
          className="fixed top-[73px] left-0 right-0 z-40 bg-slate-950/98 backdrop-blur-lg border-b border-cyan-500/20 md:hidden"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onGetStarted?.();
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
