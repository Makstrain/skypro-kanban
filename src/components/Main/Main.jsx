// src/components/Main/Main.jsx
import { useState, useEffect } from "react";
import Column from "../Column/Column";
//import { getTasks } from "../services/tasks";
import { getTasks } from "/src/services/tasks";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";

const statuses = [
  { id: 1, title: "Без статуса", status: "Без статуса" },
  { id: 2, title: "Нужно сделать", status: "Нужно сделать" },
  { id: 3, title: "В работе", status: "В работе" },
  { id: 4, title: "Тестирование", status: "Тестирование" },
  { id: 5, title: "Готово", status: "Готово" },
];

const themeClassMap = {
  "Web Design": "_orange",
  Research: "_green",
  Copywriting: "_purple",
};

function Main({ onCardClick }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError(err.message || "Ошибка загрузки задач");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Загрузка задач...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <p className="loading-text" style={{ color: "red" }}>
          {error}
        </p>
        <button onClick={fetchTasks}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <MainContainer>
      <div className="container">
        <MainBlock>
          <MainContent>
            {statuses.map((status) => (
              <Column
                key={status.id}
                title={status.title}
                cards={tasks
                  .filter((task) => task.status === status.status)
                  .map((task) => ({
                    id: task._id,
                    title: task.title,
                    theme: task.topic,
                    date: new Date(task.date).toLocaleDateString("ru-RU"),
                    themeClass: themeClassMap[task.topic] || "_orange",
                    status: task.status,
                    description: task.description,
                  }))}
                onCardClick={onCardClick}
              />
            ))}
          </MainContent>
        </MainBlock>
      </div>
    </MainContainer>
  );
}

export default Main;
