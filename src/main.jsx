// src/main.jsx
import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import App from "./App.jsx";

function AppWithTheme() {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </StyledThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TasksProvider>
          <AppWithTheme />
        </TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
