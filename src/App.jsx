import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/Dashboard";
import AffiliatePartners from "./pages/Admin/AffiliatePartners";
import FarmerDashboard from "./pages/farmer/Dashboard";
import RetailerDashboard from "./pages/Retailer/Dashboard";
import CustomerDashboard from "./pages/customer/Dashboard";
import Products from "./pages/Products";
import LandingPage from "./pages/LandingPage";
import ManageProducts from "./pages/farmer/ManageProducts";
import FarmerOrders from "./pages/farmer/Orders";
import Inventory from "./pages/Retailer/Inventory";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Dashboard routes - no protection */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/affiliate" element={<AffiliatePartners />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/manageProducts" element={<ManageProducts />} />
        <Route path="/orders" element={<FarmerOrders />} />
        <Route path="/retailer" element={<RetailerDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/products" element={<Products />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* Catch all other routes */}
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    </Router>
  );
}

export default App;
