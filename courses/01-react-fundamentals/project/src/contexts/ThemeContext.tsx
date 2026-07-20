import { createContext, useState,useEffect,useContext, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext =
  createContext<ThemeContextValue>({
    theme: "light",
    setTheme: () => {},
    toggleTheme: () => {},
  });
  
  const STORAGE_KEY = "task-app-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(()=>{
     const saved =localStorage.getItem(STORAGE_KEY);
     return saved === 'dark' ? 'dark' : 'light';
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);


const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }



  
  return <ThemeContext.Provider value={{theme,setTheme,toggleTheme}}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext);
}
