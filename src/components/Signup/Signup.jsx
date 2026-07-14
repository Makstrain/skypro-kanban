// src/components/Signup/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import { ERROR_MESSAGES, getErrorMessage } from "../../constants/errorMessages";
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
  const [loginValue, setLoginValue] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedLogin = loginValue.trim();
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedLogin || !trimmedName || !trimmedPassword) {
      setError(ERROR_MESSAGES.EMPTY_FIELDS.message);
      return;
    }

    setIsLoading(true);

    try {
      await register(trimmedLogin, trimmedName, trimmedPassword);
      navigate("/signin");
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
        <Title>Регистрация</Title>
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
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
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
