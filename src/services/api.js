// src/services/api.js

// src/services/api.js

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

export const request = async (
  url,
  method = "GET",
  body = null,
  needAuth = true,
) => {
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

  console.log("🚀 Запрос:", {
    url,
    method,
    headers,
    body: options.body || "нет тела",
  });

  const response = await fetch(url, options);

  console.log("📥 Статус:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log("❌ Ошибка:", errorData);
    throw {
      status: response.status,
      message: errorData.error || errorData.message || "Произошла ошибка",
    };
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
};
