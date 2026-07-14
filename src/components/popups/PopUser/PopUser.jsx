// src/components/popups/PopUser/PopUser.jsx
import { useContext } from "react";
import { useTheme } from "../../../context/ThemeContext";
import {
  PopUserContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  Checkbox,
  LogoutButton,
} from "./PopUser.styled";

function PopUser({ onLogoutClick }) {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <PopUserContainer>
      <PopUserName>Ivan Ivanov</PopUserName>
      <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>
      <PopUserTheme>
        <p>Темная тема</p>
        <Checkbox
          type="checkbox"
          className="checkbox"
          name="checkbox"
          checked={themeMode === "dark"}
          onChange={toggleTheme}
        />
      </PopUserTheme>
      <LogoutButton type="button" onClick={onLogoutClick}>
        Выйти
      </LogoutButton>
    </PopUserContainer>
  );
}

export default PopUser;
