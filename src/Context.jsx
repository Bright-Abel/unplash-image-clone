import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme');
  if (storedDarkMode === null) {
    return prefersDarkMode;
  }
  return storedDarkMode === 'true';
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchValue, setSearchValue] = useState('nature');

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('darkTheme', !isDarkTheme);
    //     const body = document.querySelector('body');
    //     if (!isDarkTheme) {
    //       body.classList.add('dark-theme');
    //     } else {
    //       body.classList.remove('dark-theme');
    //     }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!isDarkTheme) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }

    // ============ OR ===============
    // document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, setSearchValue, searchValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
