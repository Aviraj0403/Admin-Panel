import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "../utils/Axios"; // ✅ Custom Axios instance
import Cookies from "js-cookie";

// Create Context
const AuthContext = createContext(null);

// ✅ Custom Hook for easy consumption
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check current session/token
  const fetchUser = useCallback(async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Session fetch failed:", error);
      logout(); // Clear tokens if session is invalid
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ✅ Login Function
  const login = async (credentials) => {
    try {
      const res = await axios.post("/auth/signIn", credentials);
      const { userData, token } = res.data;

      // Save tokens securely
      Cookies.set("accessToken", token.accessToken, { secure: true, sameSite: 'Lax' });
      Cookies.set("refreshToken", token.refreshToken, { secure: true, sameSite: 'Lax' });

      setUser(userData);
      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ Logout Function
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
