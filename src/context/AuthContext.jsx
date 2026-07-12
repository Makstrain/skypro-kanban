// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { getToken, removeToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    removeToken();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
