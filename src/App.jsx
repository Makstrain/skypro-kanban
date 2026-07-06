// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRoutes from "./components/AppRoutes";
import { getToken, removeToken } from "./services/api";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleLogin = () => {
    setIsAuth(true);
  };
  /*
  const handleLogout = () => {
    setIsAuth(false);
  };*/

  const handleLogout = () => {
    removeToken(); // ← ДОБАВИЛИ: удаляем токен
    setIsAuth(false);
  };

  useEffect(() => {
    const token = getToken(); // ← проверяем, есть ли токен
    if (token) {
      setIsAuth(true); // ← если есть — авторизуем
    }
    setIsLoading(false); // ← загрузка закончена
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper">
        {isAuth && (
          <Header
            onUserClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
            isUserPopupOpen={isUserPopupOpen}
          />
        )}

        <AppRoutes
          isAuth={isAuth}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {isAuth && (
          <>
            <div className="ticks"></div>
            <div className="ticks"></div>
            <section id="spacer"></section>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
