// src/context/TasksContext.jsx
import { createContext, useState, useContext } from "react";
import { getTasks } from "../services/tasks";
import { removeToken } from "../services/api";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Ошибка загрузки задач:", err);
      if (err.status === 401) {
        removeToken();
      }
      setError(err.message || "Ошибка загрузки задач");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        loadTasks,
        addTask,
        removeTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
