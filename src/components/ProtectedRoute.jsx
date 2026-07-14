// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
