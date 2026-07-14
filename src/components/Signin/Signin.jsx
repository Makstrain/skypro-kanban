// src/components/Signin/Signin.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login as loginApi } from "../../services/auth";
import { ERROR_MESSAGES, getErrorMessage } from "../../constants/errorMessages";
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
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedLogin = loginValue.trim();
    const trimmedPassword = password.trim();

    if (!trimmedLogin || !trimmedPassword) {
      setError(ERROR_MESSAGES[401].message);
      return;
    }

    setIsLoading(true);

    try {
      await loginApi(trimmedLogin, trimmedPassword);
      login();
      navigate("/");
    } catch (err) {
      const errorInfo = getErrorMessage(err);
      setError(errorInfo.message);
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
            type="text"
            placeholder="Логин"
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
            <p
              style={{
                color: "red",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
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
