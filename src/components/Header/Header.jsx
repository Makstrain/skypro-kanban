// src/components/Header/Header.jsx
import { useEffect, useRef } from "react";
import PopUser from "../popups/PopUser/PopUser";
import {
  HeaderContainer,
  HeaderBlock,
  Logo,
  Nav,
  CreateButton,
  UserLink,
} from "./Header.styled";

function Header({ onNewCardClick, onUserClick, isUserPopupOpen, onLogout }) {
  const popupRef = useRef(null);

  // Закрытие при клике вне попапа
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Проверяем, что клик не по ссылке "Ivan Ivanov"
        const userLink = event.target.closest(".header__user");
        if (!userLink && isUserPopupOpen) {
          onUserClick(); // Закрываем попап
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserPopupOpen, onUserClick]);

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderBlock>
          <Logo>
            <a href="" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </Logo>
          <Nav>
            <CreateButton onClick={onNewCardClick}>
              <a href="#popNewCard">Создать новую задачу</a>
            </CreateButton>
            <UserLink className="header__user" onClick={onUserClick}>
              Ivan Ivanov
            </UserLink>
            {/* Оборачиваем PopUser в div с ref */}
            <div ref={popupRef}>
              {isUserPopupOpen && <PopUser onLogout={onLogout} />}
            </div>
          </Nav>
        </HeaderBlock>
      </div>
    </HeaderContainer>
  );
}

export default Header;
