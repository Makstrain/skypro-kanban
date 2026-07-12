// src/App.jsx
import { useState, useEffect, useRef, useContext } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRoutes from "./components/AppRoutes";
import Main from "./components/Main/Main";
import { AuthContext } from "./context/AuthContext";
import { useTasks } from "./context/TasksContext";

function AppContent() {
  const location = useLocation();
  const { isAuth, login, logout } = useContext(AuthContext);
  const { isLoading: isTasksLoading } = useTasks();

  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const hasShownLoading = useRef(false);

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  const handleLogin = () => {
    login();
    if (!hasShownLoading.current) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        hasShownLoading.current = true;
      }, 1000);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLoading(false);
    hasShownLoading.current = false;
  };

  if (showLoading || isTasksLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          background: "#EAEEF6",
        }}
      >
        <p style={{ fontSize: "18px", color: "#666" }}>
          {isTasksLoading ? "Загрузка задач..." : "Загрузка данных..."}
        </p>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #4A67FF",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginTop: "16px",
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {isAuth && (
        <Header
          onUserClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
          isUserPopupOpen={isUserPopupOpen}
        />
      )}

      {/* ===== ДОСКА ВСЕГДА ВИДНА ===== */}
      {isAuth && !isAuthPage && <Main />}

      {/* ===== СТРАНИЦЫ ПОВЕРХ ДОСКИ ===== */}
      <AppRoutes
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onCardClick={() => {}}
      />

      {isAuth && (
        <>
          <div className="ticks"></div>
          <div className="ticks"></div>
          <section id="spacer"></section>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
