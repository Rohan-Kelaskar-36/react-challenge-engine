import { createContext,useContext, type ReactNode } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";

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
  const [theme, setTheme] = useLocalStorage<Theme>(
      "task-app-theme",
      "light"
    );


const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }



  
  return <ThemeContext.Provider value={{theme,setTheme,toggleTheme}}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext);
}
