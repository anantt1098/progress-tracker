import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await api.get("/auth/me");
      setUser(response.data);

    } catch (error) {
      console.log("Auth check failed:", error.response?.data?.message);
      localStorage.removeItem("token");
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
    await checkAuth();
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Logout error:", error.response?.data);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);