// src/services/api.js
import { ERROR_MESSAGES, getErrorMessage } from "../constants/errorMessages";

export const BASE_URL = "https://wedev-api.sky.pro/api/kanban";
export const USER_URL = "https://wedev-api.sky.pro/api/user";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const request = async (
  url,
  method = "GET",
  body = null,
  needAuth = true,
) => {
  if (method === "GET" && url.includes("/kanban")) {
    await delay(1000);
  }

  const token = getToken();

  const headers = {};

  if (needAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);
    // Ошибка сервера (500+)
    if (response.status >= 500) {
      throw {
        status: response.status,
        isServerError: true,
      };
    }

    // Ошибка клиента (400-499)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.error || errorData.message,
      };
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    // Сетевая ошибка
    if (error.name === "TypeError" || error.message === "Failed to fetch") {
      throw {
        status: 0,
        isNetworkError: true,
      };
    }

    // Таймаут
    if (error.name === "AbortError") {
      throw {
        status: 504,
        isTimeoutError: true,
      };
    }

    throw error;
  }
};
