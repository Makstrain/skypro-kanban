// src/services/auth.js
import { USER_URL, request, setToken, removeToken } from "./api";

// ============ ВХОД ============
export const login = async (login, password) => {
  console.log("📤 Отправляем login:", { login, password });

  const data = await request(
    `${USER_URL}/login`,
    "POST",
    { login, password },
    false,
  );

  console.log("📥 Ответ login:", data);

  if (data.user?.token) {
    setToken(data.user.token);
  }

  return data;
};

// ============ РЕГИСТРАЦИЯ ============
export const register = async (login, name, password) => {
  console.log("📤 Отправляем register:", { login, name, password });

  const data = await request(
    `${USER_URL}`,
    "POST",
    { login, name, password },
    false,
  );

  console.log("📥 Ответ register:", data);

  return data;
};

// ============ ВЫХОД ============
export const logout = () => {
  removeToken();
};
