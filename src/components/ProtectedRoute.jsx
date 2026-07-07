// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuth }) {
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
