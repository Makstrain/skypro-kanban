// src/App.jsx
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRoutes from "./components/AppRoutes";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
  };

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
