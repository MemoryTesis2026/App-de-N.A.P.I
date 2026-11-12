import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Tema: 'light' (blanco) | 'dark' (negro)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('napi_theme') || 'light';
  });

  // Daltonismo: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  const [colorBlindness, setColorBlindness] = useState(() => {
    return localStorage.getItem('napi_colorblindness') || 'none';
  });

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('napi_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('napi_colorblindness', colorBlindness);
  }, [colorBlindness]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const openAccessibilityModal = () => setIsAccessibilityModalOpen(true);
  const closeAccessibilityModal = () => setIsAccessibilityModalOpen(false);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      colorBlindness,
      setColorBlindness,
      isAccessibilityModalOpen,
      openAccessibilityModal,
      closeAccessibilityModal
    }}>
      <div 
        data-theme={theme} 
        className={`w-full h-full ${theme === 'dark' ? 'dark' : ''} ${
          colorBlindness === 'protanopia' ? 'filter-protanopia' :
          colorBlindness === 'deuteranopia' ? 'filter-deuteranopia' :
          colorBlindness === 'tritanopia' ? 'filter-tritanopia' : ''
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
