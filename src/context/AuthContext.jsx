import React, { createContext, useContext, useEffect, useState } from "react";
import { authMe, login as loginApi, logout as logoutApi } from "../services/authApi";
// import { useQueryClient } from "@tanstack/react-query";

// Create the context
const AuthContext = createContext(null);

// Hook for easier usage
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const queryClient = useQueryClient();

  // Validate session on mount
  useEffect(() => {
    const validateSession = async () => {
      try {
        const res = await authMe(); // API call using Axios instance with credentials
        setUser(res.data);    // Assuming response shape: { user }
      } catch (err) {
        console.warn("Session invalid or expired", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  // Login
  const login = async (credentials) => {
    try {
      await loginApi(credentials);        // Performs login + sets cookies
      const res = await authMe();          // Get user after login
      setUser(res.data);
      return { success: true };
    } catch (err) {
      console.error("Login failed:", err);
      return {
        success: false,
        message: err?.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutApi(); // Backend clears cookies
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      queryClient.clear(); // Clear all cached queries (optional)
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
