// src/components/ProtectedRoute.jsx
/* import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuth }) {
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute; */

// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
