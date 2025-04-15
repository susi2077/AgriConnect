import React, { createContext, useState, useEffect, useContext } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser,
  getMe,
  hasRole,
  hasPermission,
} from "../services/authService";

// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = getCurrentUser();

        if (storedUser) {
          // Fetch fresh user data if we have a token
          try {
            const userData = await getMe();
            setUser(userData);
          } catch (e) {
            // If token is expired or invalid, clear storage
            logoutService();
          }
        }
      } catch (e) {
        console.error("Auth initialization error:", e);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login method
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const data = await loginService(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register method
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const data = await registerService(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout method
  const logout = () => {
    logoutService();
    setUser(null);
  };

  // Check if user has a specific role
  const checkRole = (role) => {
    return hasRole(role);
  };

  // Check if user has a specific permission
  const checkPermission = (permission) => {
    return hasPermission(permission);
  };

  // Value to be provided to consumers
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    hasRole: checkRole,
    hasPermission: checkPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
