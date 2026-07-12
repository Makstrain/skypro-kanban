// src/components/Exit/Exit.jsx
import { useNavigate } from "react-router-dom";
import {
  Container,
  ModalBlock,
  Title,
  ButtonGroup,
  ButtonYes,
  ButtonNo,
} from "./Exit.styled";

function Exit({ onLogout }) {
  const navigate = useNavigate();

  const handleExit = () => {
    onLogout();
    navigate("/signin");
  };

  return (
    <Container>
      <ModalBlock>
        <Title>Выйти из аккаунта?</Title>
        <ButtonGroup>
          <ButtonYes onClick={handleExit}>Да, выйти</ButtonYes>
          <ButtonNo onClick={() => navigate("/")}>Нет, остаться</ButtonNo>
        </ButtonGroup>
      </ModalBlock>
    </Container>
  );
}

export default Exit;
