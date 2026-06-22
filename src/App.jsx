// src/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
//import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const handleCardClick = (card) => {
    console.log("Открыта карточка:", card);
    setIsBrowseOpen(true);
  };

  return (
    <div className="wrapper">
      {isNewCardOpen && <PopNewCard onClose={() => setIsNewCardOpen(false)} />}
      {isBrowseOpen && <PopBrowse onClose={() => setIsBrowseOpen(false)} />}

      <Header
        onNewCardClick={() => setIsNewCardOpen(true)}
        onUserClick={() => setIsUserPopupOpen(!isUserPopupOpen)} // ← ДОБАВИТЬ
        isUserPopupOpen={isUserPopupOpen} // ← ДОБАВИТЬ
        onLogout={() => console.log("Выход")}
      />

      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Данные загружаются...</p>
        </div>
      ) : (
        <Main onCardClick={handleCardClick} />
      )}

      <div className="ticks"></div>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  );
}

export default App;
