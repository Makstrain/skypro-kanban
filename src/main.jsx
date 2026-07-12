import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <AuthProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </AuthProvider>
  </ThemeProvider>,
  // </StrictMode>,
);
