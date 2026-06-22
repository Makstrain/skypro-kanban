// src/components/popups/PopUser/PopUser.jsx
import {
  PopUserContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  Checkbox,
  LogoutButton,
} from "./PopUser.styled";

function PopUser({ onLogout }) {
  return (
    <PopUserContainer>
      <PopUserName>Ivan Ivanov</PopUserName>
      <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>
      <PopUserTheme>
        <p>Темная тема</p>
        <Checkbox type="checkbox" className="checkbox" name="checkbox" />
      </PopUserTheme>
      <LogoutButton type="button" onClick={onLogout}>
        <a href="#popExit">Выйти</a>
      </LogoutButton>
    </PopUserContainer>
  );
}

export default PopUser;
