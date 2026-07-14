// src/components/Exit/Exit.jsx
import {
  Container,
  ModalBlock,
  Title,
  ButtonGroup,
  ButtonYes,
  ButtonNo,
} from "./Exit.styled";

function Exit({ onConfirm, onCancel }) {
  return (
    <Container>
      <ModalBlock>
        <Title>Выйти из аккаунта?</Title>
        <ButtonGroup>
          <ButtonYes onClick={onConfirm}>Да, выйти</ButtonYes>
          <ButtonNo onClick={onCancel}>Нет, остаться</ButtonNo>
        </ButtonGroup>
      </ModalBlock>
    </Container>
  );
}

export default Exit;
