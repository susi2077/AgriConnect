import React, { useState } from "react";
import {
  BarChart3,
  PieChart,
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Calendar,
  Truck,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  User,
  Bell,
  Thermometer,
  Refrigerator,
  AlertTriangle,
  Clock,
  ChevronDown,
  CheckCircle2,
  Menu,
  Home,
  BarChart,
  CircleDollarSign,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
const RetailerSidebar = () => {
  return (
    <nav className="mt-4 flex flex-col">
      <div className="px-4 py-3 flex items-center space-x-3 bg-green-700 border-l-4 border-white">
        <Home className="w-5 h-5" />
        <span className="font-medium">Dashboard</span>
      </div>
   
    </nav>
  );
};

export default RetailerSidebar;
