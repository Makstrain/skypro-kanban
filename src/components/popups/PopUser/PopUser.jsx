// src/components/popups/PopUser/PopUser.jsx
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

export default PopUser;
