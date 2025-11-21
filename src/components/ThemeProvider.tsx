/*
React component that sets up a theme context (light / dark mode) for the application, this includes: 
- storing the current theme (light and dark)
- providing a function to toggle between themes
- applying the selected theme to the document root element
*/
import React, { createContext, useContext, useEffect, useState } from 'react';

/*
defines the theme types as 'light' or 'dark'
defines the structure of the values stored in the theme context which includes current theme and toggleTheme function which switches themes
*/
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/*
creates a context for the theme which is initalised as undefined to be set later in the ThemeProvider component
ThemeProvider function recieved children prop which represents the components that will be wrapped by the provider
state variable 'theme' is created to store the current theme with the default value set to 'dark'
*/
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  /*
  useEffect hook runs whenever the theme state changes: 
  - accesses the root HTML element and removes any existing theme classes ('light' or 'dark')
  - adds the current theme class to the root element to apply the selected theme style 
  */
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  /*
  toggleTheme function switches the theme between 'light' and 'dark'
  tenary operator is used to check the current theme and set it to its opposite value 
  if current theme is 'light', it changes to 'dark' etc 
  */
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  /* 
  wraps children components in the context provider 
  passes down the current theme and toggleTheme function to any component using useTheme() 
  */
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/*
defines a useTheme() hook that calls upon react's useContext function to access the current value of ThemeContext
if contect is underfined (if useTheme() is used outside of ThemeProvider) an error is thrown to warn the developer of inccorect use of hook (prevents silent failures)
the context value (theme and toggleTheme) is returned for use in other components which call useTheme()
*/
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
