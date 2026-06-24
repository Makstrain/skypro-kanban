// src/components/Signup/Signup.jsx
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
} from "../Signin/Signin.styled";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <Container>
      <ModalBlock>
        <Title>Регистрация</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button type="submit">Зарегистрироваться</Button>
          <FormGroup>
            <p>
              Уже есть аккаунт?{" "}
              <a onClick={() => navigate("/signin")}>Войдите здесь</a>
            </p>
          </FormGroup>
        </Form>
      </ModalBlock>
    </Container>
  );
}

export default Signup;
