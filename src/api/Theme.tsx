// ThemeProvider.tsx
import React, { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export const ThemeProvider = ({ children }: {children:ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    console.log("theme" + theme);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
