// src/services/auth.js
import { USER_URL, request, setToken, removeToken } from "./api";

// ============ ВХОД ============
export const login = async (login, password) => {
  const data = await request(
    `${USER_URL}/login`,
    "POST",
    { login, password },
    false,
  );

  if (data.user?.token) {
    setToken(data.user.token);
  }

  return data;
};

// ============ РЕГИСТРАЦИЯ ============
export const register = async (login, name, password) => {
  const data = await request(
    `${USER_URL}`,
    "POST",
    { login, name, password },
    false,
  );
  return data;
};

// ============ ВЫХОД ============
export const logout = () => {
  removeToken();
};
