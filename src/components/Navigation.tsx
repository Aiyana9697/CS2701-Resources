/* 
React componenent that renders a responsive navigation bar with: 
- logo and navigation links
- theme toggle button to switch between light / dark mode
- Get Started button directing users to the login / registration page
- animated navbar that changes opens and closes when scrolled 
*/
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Waves, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/* 
defines an array of navigation link objects
each item has a label and href link the user is directed to when clicked (currently placeholder # values)
*/
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Map', href: '#map' },
  { label: 'Learn', href: '#learn' },
  { label: 'Research', href: '#research' },
  { label: 'Impact', href: '#impact' },
];

/* 
defines the structure of the props the navigation component can recieve 
a single optional prop named onGetStarted is defined  
function has no arguments and is void as it has no return values 
*/
interface NavigationProps {
  onGetStarted?: () => void;
}

/* 
recieves the onGetStarted function so it can be used

State 1: 
- boolean state where isScrolled tracks whether the user has scrolled more than 50px down 
- setIsScrolled function is used to update the isScrolled state
- default value = false as when page first loads, it starts at the top

State 2: 
- boolean state  where isMobileMenuOpen shows or hides the navbar 
- setIsMobileMenuOpen function is used to update the isMobileMenuOpen state
- default value = false as mavbar is initially closed

calls useTheme() function from ThemeProvider component to access the current theme and toggleTheme function
*/
export function Navigation({ onGetStarted }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false); // State 1
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State 2 
  const { theme, toggleTheme } = useTheme(); // State 3

  /* 
  creates a handleScroll function that runs every time the user scrolls 
  setIsScrolled checks how far the page has been scrolled vertically: 
  - if greater than 50px, isScrolled = true
  - else isScrolled = false

  event listener is added to ensure handleScroll function is run everytime the user scrolls
  cleanup removeEventListener function is returned to prevent memory leaks (unused memory being used up unnecessarily)
  */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* 
  defines an animated navbar that stays fixed at the top of the page and changes appearance based on scroll position
  animation - starts above page and slides down into view when its loaded

  When isScrolled = true (user has scrolled down more than 50px):
  - navbar background changes to a semi-transparent dark slate with a cyan border at the bottom, backdrop blur and shadow
  When isScrolled = false (user is at top of page):
  - navbar background is transparent
  */
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
        {/* 
        defines the layout / spacing of the navbar content with max width, horizontal / vertical padding 
        organises the navbars content (logo, links, buttons) into a single row and spreads them to the navbar's edges
        
        a icon container is created with a cyan background, rounded corners and centers the lucide-react Waves icon inside in a cyan colour
        the logo text 'OceanIQ' is placed beside the icon in white
        */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cyan-400/20">
                <Waves className="w-6 h-6 text-cyan-300" />
              </div>
              <span className="text-white">OceanIQ</span>
            </div>

            {/* 
            renders the navigation links in a horizontal row with gaps between them
            hidden on small screens, visible on medium and larger screens
            each link is white and changes to cyan on hover with a smooth transition
            */}
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

            {/* 
            defines the theme toggle button, Get Started button and mobile menu button in a row with gaps between them

            Theme Toggle button: 
            - when clicked, calls the toggleTheme function to switch between light / dark mode
            - uses a tenerary operator to render the appropriate icon based on the current theme
            - displays a sun icon if current theme is dark, moon icon if current theme is light

            Get Started button:
            - when clicked, calls the onGetStarted function passed as a prop
            - button is hidden on small screens but visible on medium / larger screens

            mobile menu button:
            - when clicked, toggles the isMobileMenuOpen state to show / hide the mobile menu
            - hidden on medium / larger screens but visible on small screens
            - uses a tenerary operator to render the appropriate icon based on isMobileMenuOpen state
            - displays an X icon if mobile menu is open and Menu icon if mobile menu is closed
            */}

            {/* Theme Toggle button */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-white hover:text-cyan-400 hover:bg-cyan-500/10"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
               
              {/* Get Started Button */}
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
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 
      renders the mobile dropdown menu when isMobileMenuOpen = true
      when rendered: 
      - animation - dropdown menu by fading in and slides it down slightly 
      - menu is in a fixed position below the navbar, spans full width of the screen with a semi-transparent dark slate background, cyan border and backdrop blur
      - is only visible on small screens (hidden on medium / larger screens)
      - contains the navigation links stacked vertically with gaps between them by mapping through the navLinks array
      - each link is light slate colour and changes to cyan on hover with a smooth transition
      - includes a Get Started button that spans the full width of the menu and calls the onGetStarted function when clicked
      */}
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
                  className="text-white hover:text-cyan-400 transition-colors py-2"
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
