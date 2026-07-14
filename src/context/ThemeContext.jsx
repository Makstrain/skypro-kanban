// src/context/ThemeContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/themes"; // ← добавили
export const ThemeContext = createContext();
//const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // ← theme → themeMode
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  // ← НОВОЕ: выбираем объект с цветами
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // ← value изменился
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
