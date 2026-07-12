// src/components/Signin/Signin.jsx
/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";  
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

*/
// src/components/Signin/Signin.jsx
// src/components/Signin/Signin.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login as loginApi } from "../../services/auth";
import {
  Container,
  ModalBlock,
  Title,
  Form,
  Input,
  Button,
  FormGroup,
} from "./Signin.styled";

function Signin() {
  // ← убрали onLogin из пропсов
  const { login } = useContext(AuthContext); // ← из контекста
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginApi(loginValue, password); // ← запрос к API
      login(); // ← из контекста — устанавливаем isAuth = true
      navigate("/");
    } catch (err) {
      setError(err.message || "Неверный логин или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ModalBlock>
        <Title>Вход</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text" // ← type="text"
            placeholder="Логин" // ← "Логин"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            required
            disabled={isLoading}
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          {error && (
            <p style={{ color: "red", fontSize: 14, marginBottom: 10 }}>
              {error}
            </p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти"}
          </Button>
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
