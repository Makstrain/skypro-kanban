// src/services/tasks.js
import { BASE_URL, request } from "./api";

// Получить все задачи
export const getTasks = async () => {
  const data = await request(BASE_URL);
  return data.tasks;
};

// Получить задачу по id
export const getTaskById = async (id) => {
  const data = await request(`${BASE_URL}/${id}`);
  return data.task;
};

// Создать задачу
export const createTask = async (taskData) => {
  const data = await request(BASE_URL, "POST", taskData);
  return data.tasks;
};

// Обновить задачу
export const updateTask = async (id, taskData) => {
  const data = await request(`${BASE_URL}/${id}`, "PUT", taskData);
  return data.tasks;
};

// Удалить задачу
export const deleteTask = async (id) => {
  const data = await request(`${BASE_URL}/${id}`, "DELETE");
  return data.tasks;
};
