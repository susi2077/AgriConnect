import axios from "axios";

const API_URL = "http://localhost:5000";

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear localStorage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  return JSON.parse(userStr);
};

export const updateProfile = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

// Check if user has specific role
export const hasRole = (role) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  return currentUser.role === role;
};

// Check if user has specific permission
export const hasPermission = (permission) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;

  // This is a simplified approach. In a real app, you might want to
  // fetch the permissions for the user's role from the server.
  const rolePermissions = {
    admin: [
      "manage_users",
      "manage_products",
      "manage_orders",
      "view_analytics",
      "manage_settings",
    ],
    farmer: ["manage_own_products", "view_own_orders", "update_profile"],
    retailer: [
      "place_orders",
      "manage_inventory",
      "view_farmers",
      "update_profile",
    ],
    customer: [
      "browse_products",
      "place_orders",
      "view_own_orders",
      "update_profile",
    ],
  };

  return rolePermissions[currentUser.role]?.includes(permission) || false;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  getMe,
  hasRole,
  hasPermission,
};
