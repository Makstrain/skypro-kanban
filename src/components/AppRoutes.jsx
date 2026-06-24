// src/components/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import MainPage from "../pages/MainPage";
import CardPage from "../pages/CardPage";
import AddCardPage from "../pages/AddCardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes({ isAuth, onLogin, onLogout, onCardClick }) {
  return (
    <Routes>
      {/* Открытые страницы */}
      <Route path="/signin" element={<SigninPage onLogin={onLogin} />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Защищенные страницы */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <MainPage onCardClick={onCardClick} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CardPage />
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
      <Route
        path="/exit"
        element={<ExitPage onLogout={onLogout} />} // ← исправлено!
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
