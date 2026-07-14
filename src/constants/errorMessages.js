// src/constants/errorMessages.js

export const ERROR_MESSAGES = {
  // ===== СЕТЕВЫЕ ОШИБКИ =====
  NETWORK_ERROR: {
    code: "NETWORK_ERROR",
    message: "Нет соединения с сервером. Проверьте интернет-соединение.",
  },
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    message: "Сервер временно недоступен. Попробуйте позже.",
  },
  TIMEOUT_ERROR: {
    code: "TIMEOUT_ERROR",
    message: "Превышено время ожидания ответа от сервера. Попробуйте позже.",
  },

  // ===== HTTP СТАТУСЫ =====
  400: {
    code: 400,
    message: "Некорректный запрос. Проверьте введенные данные.",
  },

  401: {
    code: 401,
    message:
      "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.",
  },
  403: {
    code: 403,
    message:
      "Доступ запрещен. У вас недостаточно прав для выполнения этого действия.",
  },
  404: {
    code: 404,
    message: "Запрашиваемый ресурс не найден.",
  },
  409: {
    code: 409,
    message: "Пользователь с таким логином уже существует.",
  },
  422: {
    code: 422,
    message:
      "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.",
  },
  429: {
    code: 429,
    message: "Слишком много запросов. Подождите немного и повторите попытку.",
  },
  500: {
    code: 500,
    message: "Сервер временно недоступен. Попробуйте позже.",
  },
  502: {
    code: 502,
    message: "Сервер временно недоступен. Попробуйте позже.",
  },
  503: {
    code: 503,
    message: "Сервер временно недоступен. Попробуйте позже.",
  },
  504: {
    code: 504,
    message: "Превышено время ожидания ответа от сервера. Попробуйте позже.",
  },

  // ===== КАСТОМНЫЕ ОШИБКИ =====
  EMPTY_FIELDS: {
    code: "EMPTY_FIELDS",
    message:
      "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.",
  },
  EMPTY_TITLE: {
    code: "EMPTY_TITLE",
    message: "Название задачи не может быть пустым",
  },
  TASK_NOT_FOUND: {
    code: "TASK_NOT_FOUND",
    message: "Задача не найдена",
  },
  DELETE_CONFIRM: {
    code: "DELETE_CONFIRM",
    message: "Вы уверены, что хотите удалить задачу?",
  },
  UNKNOWN_ERROR: {
    code: "UNKNOWN_ERROR",
    message: "Произошла неизвестная ошибка. Попробуйте позже.",
  },
};

// ===== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ =====
export const getErrorMessage = (error) => {
  // Если ошибка уже содержит message и code — возвращаем её
  if (error?.message && error?.code) {
    return error;
  }

  // Если error — это число (HTTP статус)
  if (typeof error === "number") {
    return ERROR_MESSAGES[error] || ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  // Если error — объект
  if (error && typeof error === "object") {
    // 🔥 СЕТЕВАЯ ОШИБКА
    if (error.isNetworkError === true) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // Если есть status
    if (error.status) {
      // ⚠️ ОСОБЫЕ СЛУЧАИ ДЛЯ 400
      if (error.status === 400) {
        if (error.message?.includes("уже существует")) {
          return ERROR_MESSAGES[409];
        }
        if (
          error.message?.includes("логин") ||
          error.message?.includes("пароль") ||
          error.message?.includes("неверный")
        ) {
          return ERROR_MESSAGES[401];
        }
        return ERROR_MESSAGES[400];
      }

      // Ошибка сервера (500+)
      if (error.isServerError || error.status >= 500) {
        return ERROR_MESSAGES[error.status] || ERROR_MESSAGES.SERVER_ERROR;
      }

      // HTTP статус
      return ERROR_MESSAGES[error.status] || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  // Если error — строка
  if (typeof error === "string") {
    return { code: "CUSTOM", message: error };
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
};
