import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import Header from "./components/Header";
import Main from "./components/Main";
import PopNewCard from "./components/popups/PopNewCard";
import PopBrowse from "./components/popups/PopBrowse";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [count, setCount] = useState(0);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  // const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  return (
    <div className="wrapper">
      {/* Поп-апы (только модальные окна, не PopUser) */}
      {isNewCardOpen && <PopNewCard onClose={() => setIsNewCardOpen(false)} />}
      {isBrowseOpen && <PopBrowse onClose={() => setIsBrowseOpen(false)} />}

      <Header
        onNewCardClick={() => setIsNewCardOpen(true)}
        //  onUserClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
        //  isUserPopupOpen={isUserPopupOpen}
        onLogout={() => console.log("Выход")}
      />
      {/* ТЕРНАРНЫЙ ОПЕРАТОР - показываем загрузку или карточки */}
      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Данные загружаются...</p>
        </div>
      ) : (
        <Main />
      )}

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  );
}

export default App;
