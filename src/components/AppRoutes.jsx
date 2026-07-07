// src/components/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import CardPage from "../pages/CardPage";
import EditCardPage from "../pages/EditCardPage"; // ← добавить
import AddCardPage from "../pages/AddCardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes({ isAuth, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Открытые страницы */}
      <Route path="/signin" element={<SigninPage onLogin={onLogin} />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Главная страница */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <div />
          </ProtectedRoute>
        }
      />

      {/* Защищенные страницы */}
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-card/:id" // ← новый маршрут
        element={
          <ProtectedRoute isAuth={isAuth}>
            <EditCardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-card"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <AddCardPage />
          </ProtectedRoute>
        }
      />

      <Route path="/exit" element={<ExitPage onLogout={onLogout} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
