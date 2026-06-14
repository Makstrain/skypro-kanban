import { useState, useEffect } from "react";
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

  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);

  return (
    <div className="wrapper">
      {isNewCardOpen && <PopNewCard onClose={() => setIsNewCardOpen(false)} />}
      {isBrowseOpen && <PopBrowse onClose={() => setIsBrowseOpen(false)} />}

      <Header
        onNewCardClick={() => setIsNewCardOpen(true)}
        onLogout={() => console.log("Выход")}
      />

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
