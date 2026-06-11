import { useState } from "react";
import PopUser from "./popups/PopUser";

function Header({ onNewCardClick, onLogout }) {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const toggleUserPopup = (e) => {
    e.preventDefault();
    setIsUserPopupOpen(!isUserPopupOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo _show _light">
            <a href="" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </div>
          <div className="header__logo _dark">
            <a href="" target="_self">
              <img src="images/logo_dark.png" alt="logo" />
            </a>
          </div>
          <nav className="header__nav">
            <button
              className="header__btn-main-new _hover01"
              onClick={onNewCardClick}
            >
              <a href="#popNewCard">Создать новую задачу</a>
            </button>

            <a
              href="#user-set-target"
              className="header__user _hover02"
              onClick={toggleUserPopup}
            >
              Ivan Ivanov
            </a>

            {isUserPopupOpen && <PopUser onLogout={onLogout} />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
