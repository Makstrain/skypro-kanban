// src/components/Main/Main.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Column from "../Column/Column";
import { getTasks } from "/src/services/tasks";
import { removeToken } from "/src/services/api";
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
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      console.error("❌ Ошибка:", err);
      if (err.status === 401) {
        removeToken();
        navigate("/signin");
        return;
      }
      setError(err.message || "Ошибка загрузки задач");
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем при монтировании
  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Обновляем если пришли с флагом refresh
  useEffect(() => {
    if (location.state?.refresh) {
      fetchTasks();
      // Очищаем state, чтобы при рефреше не было повторного запроса
      navigate("/", { state: null, replace: true });
    }
  }, [location.state]);

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
