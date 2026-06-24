// src/data.js

// Массив статусов (колонок)
export const statuses = [
  { id: 1, title: "Без статуса", status: "no-status" },
  { id: 2, title: "Нужно сделать", status: "to-do" },
  { id: 3, title: "В работе", status: "in-progress" },
  { id: 4, title: "Тестирование", status: "testing" },
  { id: 5, title: "Готово", status: "done" },
];

// Массив карточек (задач)
export const cards = [
  {
    id: 101,
    title: "Название задачи",
    theme: "Web Design",
    date: "30.10.23",
    themeClass: "_orange",
    status: "no-status", // ← статус указывает, в какой колонке карточка
  },
  {
    id: 102,
    title: "Название задачи",
    theme: "Research",
    date: "30.10.23",
    themeClass: "_green",
    status: "no-status",
  },
  {
    id: 103,
    title: "Название задачи",
    theme: "Web Design",
    date: "30.10.23",
    themeClass: "_orange",
    status: "no-status",
  },
  {
    id: 104,
    title: "Название задачи",
    theme: "Copywriting",
    date: "30.10.23",
    themeClass: "_purple",
    status: "no-status",
  },
  {
    id: 105,
    title: "Название задачи",
    theme: "Web Design",
    date: "30.10.23",
    themeClass: "_orange",
    status: "no-status",
  },
  {
    id: 201,
    title: "Название задачи",
    theme: "Research",
    date: "30.10.23",
    themeClass: "_green",
    status: "to-do",
  },
  {
    id: 301,
    title: "Название задачи",
    theme: "Research",
    date: "30.10.23",
    themeClass: "_green",
    status: "in-progress",
  },
  {
    id: 302,
    title: "Название задачи",
    theme: "Copywriting",
    date: "30.10.23",
    themeClass: "_purple",
    status: "in-progress",
  },
  {
    id: 303,
    title: "Название задачи",
    theme: "Web Design",
    date: "30.10.23",
    themeClass: "_orange",
    status: "in-progress",
  },
  {
    id: 401,
    title: "Название задачи",
    theme: "Research",
    date: "30.10.23",
    themeClass: "_green",
    status: "testing",
  },
  {
    id: 501,
    title: "Название задачи",
    theme: "Research",
    date: "30.10.23",
    themeClass: "_green",
    status: "done",
  },
];
