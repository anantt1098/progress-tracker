import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data);

    } catch (error) {

      console.log(
        "Auth check failed:",
        error.response?.data?.message
      );

      setUser(null);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    checkAuth();

  }, []);



  const login = async (userData) => {

    // set temporary user
    setUser(userData);

    // verify cookie session
    await checkAuth();

  };



  const logout = async () => {

    try {

      await api.post("/auth/logout");

    } catch (error) {

      console.log(
        "Logout error:",
        error.response?.data
      );

    } finally {

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