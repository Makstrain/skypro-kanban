// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
import AppRoutes from "./components/AppRoutes";

function App() {
  // ===== ЗАГРУЗКА =====
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // ===== АВТОРИЗАЦИЯ =====
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
  };

  // ===== МОДАЛЬНЫЕ ОКНА =====
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const handleCardClick = (card) => {
    console.log("Открыта карточка:", card);
    setIsBrowseOpen(true);
  };

  // ===== РЕНДЕР =====
  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Данные загружаются...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        {/* Модальные окна (отображаются поверх всего) */}
        {isNewCardOpen && (
          <PopNewCard onClose={() => setIsNewCardOpen(false)} />
        )}
        {isBrowseOpen && <PopBrowse onClose={() => setIsBrowseOpen(false)} />}

        {/* Хедер (только для авторизованных) */}
        {isAuth && (
          <Header
            onNewCardClick={() => setIsNewCardOpen(true)}
            onUserClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
            isUserPopupOpen={isUserPopupOpen}
          />
        )}

        {/* Роутинг */}
        <AppRoutes
          isAuth={isAuth}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onCardClick={handleCardClick}
        />

        {/* Элементы подвала (только для авторизованных) */}
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
