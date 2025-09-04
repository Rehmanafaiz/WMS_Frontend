import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => localStorage.getItem('wms_theme') === 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
    localStorage.setItem('wms_theme', dark ? 'dark' : 'light');
  }, [dark]);

  return <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
