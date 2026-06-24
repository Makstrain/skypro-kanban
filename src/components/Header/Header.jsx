// src/components/Header/Header.jsx
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PopUser from "../popups/PopUser/PopUser";
import {
  HeaderContainer,
  HeaderBlock,
  Logo,
  Nav,
  CreateButton,
  UserLink,
} from "./Header.styled";

function Header({ onNewCardClick, onUserClick, isUserPopupOpen }) {
  const popupRef = useRef(null);
  const userLinkRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isUserPopupOpen) return;
      if (userLinkRef.current && userLinkRef.current.contains(event.target)) {
        return;
      }
      if (popupRef.current && popupRef.current.contains(event.target)) {
        return;
      }
      onUserClick();
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
            <Link to="/">
              <img src="images/logo.png" alt="logo" />
            </Link>
          </Logo>
          <Nav>
            <CreateButton onClick={onNewCardClick}>
              Создать новую задачу
            </CreateButton>
            <UserLink ref={userLinkRef} onClick={onUserClick}>
              Ivan Ivanov
            </UserLink>
            <div ref={popupRef}>
              {isUserPopupOpen && <PopUser onClose={onUserClick} />}
            </div>
          </Nav>
        </HeaderBlock>
      </div>
    </HeaderContainer>
  );
}

export default Header;
