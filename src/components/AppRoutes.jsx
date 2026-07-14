// src/components/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import CardPage from "../pages/CardPage";
import AddCardPage from "../pages/AddCardPage";
import EditCardPage from "../pages/EditCardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes({ onLogin, onLogout, onCardClick }) {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage onLogin={onLogin} />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div />
          </ProtectedRoute>
        }
      />

      <Route
        path="/card/:id"
        element={
          <ProtectedRoute>
            <CardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-card/:id"
        element={
          <ProtectedRoute>
            <EditCardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-card"
        element={
          <ProtectedRoute>
            <AddCardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/exit"
        element={
          <ProtectedRoute>
            <ExitPage onLogout={onLogout} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
