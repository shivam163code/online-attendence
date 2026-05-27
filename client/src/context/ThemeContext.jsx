import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('attendance_theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('attendance_theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')) }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
