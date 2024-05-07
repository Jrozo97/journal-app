import { DarkModeContextProps } from '@/types/components.types';
import React, { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext<DarkModeContextProps>({
  theme: 'light',
  handleChangeTheme: () => {},
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme as 'dark' | 'light';
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <DarkModeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};