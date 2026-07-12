// src/components/popups/PopUser/PopUser.jsx
/*
import { Link } from "react-router-dom";
import {
  PopUserContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  Checkbox,
  LogoutButton,
} from "./PopUser.styled";

function PopUser({ onClose }) {
  return (
    <PopUserContainer>
      <PopUserName>Ivan Ivanov</PopUserName>
      <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>
      <PopUserTheme>
        <p>Темная тема</p>
        <Checkbox type="checkbox" className="checkbox" name="checkbox" />
      </PopUserTheme>
      <LogoutButton type="button">
        <Link to="/exit" onClick={onClose}>
          Выйти
        </Link>
      </LogoutButton>
    </PopUserContainer>
  );
}

export default PopUser; */
// src/components/popups/PopUser/PopUser.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import {
  PopUserContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  Checkbox,
  LogoutButton,
} from "./PopUser.styled";

function PopUser() {
  // ← убрали onLogout из пропсов
  const { logout } = useContext(AuthContext); // ← из контекста

  return (
    <PopUserContainer>
      <PopUserName>Ivan Ivanov</PopUserName>
      <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>
      <PopUserTheme>
        <p>Темная тема</p>
        <Checkbox type="checkbox" className="checkbox" name="checkbox" />
      </PopUserTheme>
      <LogoutButton type="button">
        <Link to="/exit" onClick={logout}>
          Выйти
        </Link>
      </LogoutButton>
    </PopUserContainer>
  );
}

export default PopUser;
