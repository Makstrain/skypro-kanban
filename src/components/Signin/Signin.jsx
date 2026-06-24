// src/components/Signin/Signin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ModalBlock,
  Title,
  Form,
  Input,
  Button,
  FormGroup,
} from "./Signin.styled";

function Signin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    navigate("/");
  };

  return (
    <Container>
      <ModalBlock>
        <Title>Вход</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Эл. почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Войти</Button>
          <FormGroup>
            <p>
              Нет аккаунта?{" "}
              <a onClick={() => navigate("/signup")}>Зарегистрируйся</a>
            </p>
          </FormGroup>
        </Form>
      </ModalBlock>
    </Container>
  );
}

export default Signin;
