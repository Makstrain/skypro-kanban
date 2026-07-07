// src/components/NotFound/NotFound.jsx
import { useNavigate } from "react-router-dom";
import { Container, Title, Text, Button } from "./NotFound.styled";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>404</Title>
      <Text>Страница не найдена</Text>
      <Button onClick={() => navigate("/")}>На главную</Button>
    </Container>
  );
}

export default NotFound;
