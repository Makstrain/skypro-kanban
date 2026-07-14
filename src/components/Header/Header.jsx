// src/components/Header/Header.jsx
import { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import PopUser from "../popups/PopUser/PopUser";
import {
  HeaderContainer,
  HeaderBlock,
  Logo,
  Nav,
  CreateButton,
  UserLink,
} from "./Header.styled";

function Header({ onUserClick, isUserPopupOpen, onLogoutClick }) {
  const popupRef = useRef(null);
  const userLinkRef = useRef(null);
  const { themeMode } = useContext(ThemeContext);

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
              <img
                src={
                  themeMode === "dark"
                    ? "/images/logo_dark.png"
                    : "/images/logo.png"
                }
                alt="logo"
              />
            </Link>
          </Logo>
          <Nav>
            <CreateButton>
              <Link to="/add-card">Создать новую задачу</Link>
            </CreateButton>
            <UserLink ref={userLinkRef} onClick={onUserClick}>
              Ivan Ivanov
            </UserLink>
            <div ref={popupRef}>
              {isUserPopupOpen && <PopUser onLogoutClick={onLogoutClick} />}
            </div>
          </Nav>
        </HeaderBlock>
      </div>
    </HeaderContainer>
  );
}

export default Header;
