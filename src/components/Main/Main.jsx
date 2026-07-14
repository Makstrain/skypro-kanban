// src/components/Main/Main.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { getTasks, updateTask } from "/src/services/tasks";
import { removeToken } from "/src/services/api";
import { ERROR_MESSAGES, getErrorMessage } from "/src/constants/errorMessages";
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
    setError("");

    try {
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      if (err.status === 401) {
        removeToken();
        navigate("/signin");
        return;
      }

      const errorInfo = getErrorMessage(err);
      setError(errorInfo.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const draggedTask = tasks.find((task) => task._id === draggableId);
    if (!draggedTask) return;

    const newStatus = destination.droppableId;

    const updatedTasks = tasks.map((task) =>
      task._id === draggableId ? { ...task, status: newStatus } : task,
    );
    setTasks(updatedTasks);

    try {
      await updateTask(draggableId, {
        ...draggedTask,
        status: newStatus,
      });
    } catch (err) {
      fetchTasks();
      if (err.status === 401) {
        removeToken();
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchTasks();
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
    <DragDropContext onDragEnd={onDragEnd}>
      <MainContainer>
        <div className="container">
          <MainBlock>
            <MainContent>
              {tasks.length === 0 && !isLoading ? (
                <div className="empty-tasks">
                  <p className="empty-tasks__text">Новых задач нет</p>
                </div>
              ) : (
                statuses.map((status) => (
                  <Column
                    key={status.id}
                    title={status.title}
                    columnId={status.status}
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
                    isLoading={isLoading}
                    onCardClick={onCardClick}
                  />
                ))
              )}
            </MainContent>
          </MainBlock>
        </div>
      </MainContainer>
    </DragDropContext>
  );
}

export default Main;
