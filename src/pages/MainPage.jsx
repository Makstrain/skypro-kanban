// src/pages/MainPage.jsx

import { useState, useEffect } from "react";
import Main from "../components/Main/Main";

function MainPage({ onCardClick }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Данные загружаются...</p>
      </div>
    );
  }

  return <Main onCardClick={onCardClick} />;
}

export default MainPage;
