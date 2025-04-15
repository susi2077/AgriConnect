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
import RetailerSidebar from "../../components/RetailerSidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Mock data for dashboard metrics
  const metrics = {
    daily: {
      sales: 1245.75,
      orders: 18,
      customers: 15,
      avgOrder: 69.21,
      percentChange: 12.4,
    },
    weekly: {
      sales: 8752.32,
      orders: 127,
      customers: 84,
      avgOrder: 68.92,
      percentChange: 8.7,
    },
    monthly: {
      sales: 34689.15,
      orders: 512,
      customers: 246,
      avgOrder: 67.75,
      percentChange: 15.2,
    },
  };

  // Mock data for inventory
  const inventoryItems = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      stock: 145,
      price: 3.99,
      supplier: "Green Valley Farms",
      storage: "Room Temp",
      status: "in-stock",
    },
    {
      id: 2,
      name: "Fresh Apples",
      category: "Fruits",
      stock: 92,
      price: 2.49,
      supplier: "Hillside Orchards",
      storage: "Cold Storage A",
      status: "in-stock",
    },
    {
      id: 3,
      name: "Lettuce",
      category: "Vegetables",
      stock: 28,
      price: 1.99,
      supplier: "Green Valley Farms",
      storage: "Cold Storage B",
      status: "low-stock",
    },
    {
      id: 4,
      name: "Organic Carrots",
      category: "Vegetables",
      stock: 67,
      price: 2.29,
      supplier: "Sunshine Farms",
      storage: "Cold Storage A",
      status: "in-stock",
    },
    {
      id: 5,
      name: "Free-Range Eggs",
      category: "Dairy",
      stock: 15,
      price: 4.99,
      supplier: "Happy Hen Farm",
      storage: "Cold Storage B",
      status: "low-stock",
    },
    {
      id: 6,
      name: "Blueberries",
      category: "Fruits",
      stock: 0,
      price: 4.99,
      supplier: "Berry Good Farm",
      storage: "Cold Storage A",
      status: "out-of-stock",
    },
    {
      id: 7,
      name: "Raw Honey",
      category: "Specialty",
      stock: 42,
      price: 8.5,
      supplier: "Busy Bee Apiaries",
      storage: "Room Temp",
      status: "in-stock",
    },
    {
      id: 8,
      name: "Grass-Fed Milk",
      category: "Dairy",
      stock: 23,
      price: 5.29,
      supplier: "Green Pastures Dairy",
      storage: "Cold Storage B",
      status: "in-stock",
    },
    {
      id: 9,
      name: "Kale",
      category: "Vegetables",
      stock: 8,
      price: 2.79,
      supplier: "Green Valley Farms",
      storage: "Cold Storage A",
      status: "low-stock",
    },
    {
      id: 10,
      name: "Asparagus",
      category: "Vegetables",
      stock: 0,
      price: 4.25,
      supplier: "River Farm",
      storage: "Cold Storage B",
      status: "out-of-stock",
    },
  ];

  // Mock data for recent sales
  const recentSales = [
    {
      id: 1,
      date: "Apr 16, 2025",
      time: "10:23 AM",
      customer: "Jane Smith",
      items: 3,
      total: 35.97,
      status: "Completed",
    },
    {
      id: 2,
      date: "Apr 16, 2025",
      time: "09:15 AM",
      customer: "Michael Johnson",
      items: 5,
      total: 49.45,
      status: "Completed",
    },
    {
      id: 3,
      date: "Apr 15, 2025",
      time: "03:45 PM",
      customer: "Lisa Brown",
      items: 2,
      total: 14.98,
      status: "Completed",
    },
    {
      id: 4,
      date: "Apr 15, 2025",
      time: "12:30 PM",
      customer: "Robert Wilson",
      items: 7,
      total: 87.92,
      status: "Processing",
    },
    {
      id: 5,
      date: "Apr 14, 2025",
      time: "04:12 PM",
      customer: "Sarah Johnson",
      items: 4,
      total: 52.36,
      status: "Completed",
    },
  ];

  // Mock data for orders awaiting pickup
  const awaitingPickup = [
    {
      id: "ORD-7234",
      customer: "Emily Davis",
      items: 4,
      total: 42.96,
      readyBy: "Today, 2:00 PM",
    },
    {
      id: "ORD-7231",
      customer: "Thomas Johnson",
      items: 3,
      total: 36.75,
      readyBy: "Today, 3:30 PM",
    },
    {
      id: "ORD-7227",
      customer: "Sophia Martinez",
      items: 6,
      total: 73.5,
      readyBy: "Tomorrow, 10:00 AM",
    },
  ];

  // Mock data for cold storage
  const coldStorageData = [
    {
      id: "CS-A",
      name: "Cold Storage A",
      temperature: 34.2,
      humidity: 85,
      capacity: 75,
      status: "optimal",
      items: 4,
      lastInspected: "Apr 15, 2025",
      alertLevel: "normal",
    },
    {
      id: "CS-B",
      name: "Cold Storage B",
      temperature: 38.6,
      humidity: 82,
      capacity: 90,
      status: "attention",
      items: 5,
      lastInspected: "Apr 14, 2025",
      alertLevel: "warning",
    },
    {
      id: "CS-C",
      name: "Freezer Storage",
      temperature: 2.1,
      humidity: 60,
      capacity: 45,
      status: "optimal",
      items: 2,
      lastInspected: "Apr 12, 2025",
      alertLevel: "normal",
    },
  ];

  // Function to render status badge for inventory
  const renderStockStatus = (status) => {
    const statusStyles = {
      "in-stock": "bg-green-100 text-green-800",
      "low-stock": "bg-yellow-100 text-yellow-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
      >
        {status === "in-stock"
          ? "In Stock"
          : status === "low-stock"
          ? "Low Stock"
          : "Out of Stock"}
      </span>
    );
  };

  // Function to render cold storage status
  const renderStorageStatus = (storage) => {
    const storageInfo = coldStorageData.find((item) => item.name === storage);
    if (!storageInfo) return null;

    const statusColors = {
      optimal: "text-green-500",
      attention: "text-yellow-500",
      critical: "text-red-500",
    };

    return (
      <div className="flex items-center">
        <Thermometer
          className={`w-4 h-4 mr-1 ${statusColors[storageInfo.status]}`}
        />
        <span className="text-xs">
          {storage} ({storageInfo.temperature}°F)
        </span>
      </div>
    );
  };

  // Filter inventory based on search query and selected tab
  const filteredInventory = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "low")
      return matchesSearch && item.status === "low-stock";
    if (selectedTab === "out")
      return matchesSearch && item.status === "out-of-stock";
    if (selectedTab === "cold")
      return matchesSearch && item.storage.includes("Cold");

    return false;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-green-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">AgriConnect</h1>
          <p className="text-green-200 text-sm">Retailer Dashboard</p>
        </div>

        <RetailerSidebar />
        
        <div className="absolute bottom-0 p-4 w-64">
        <div className="px-4 bottom-0 py-3 flex items-center space-x-3 ">
        <LogOut className="w-5 h-5" />
        <Link to='/login' className="font-medium">Log out</Link>
      </div>
          <div className="flex items-center space-x-3 py-3">
         
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Sarah Miller</p>
              <p className="text-xs text-green-200">Store Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <p className="ml-4 text-sm text-gray-500">Welcome back, Sarah</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></div>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Period Selection */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Store Overview</h1>
            <div className="flex space-x-2">
              {["daily", "weekly", "monthly"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    selectedPeriod === period
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Sales Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Total Sales
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${metrics[selectedPeriod].sales.toFixed(2)}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium flex items-center ${
                        metrics[selectedPeriod].percentChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metrics[selectedPeriod].percentChange > 0 ? (
                        <ArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(metrics[selectedPeriod].percentChange)}% from
                      last {selectedPeriod.slice(0, -2)}
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Total Orders
                  </p>
                  <h3 className="text-2xl font-bold">
                    {metrics[selectedPeriod].orders}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs font-medium flex items-center text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      8.3% from last {selectedPeriod.slice(0, -2)}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Customers Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Customers
                  </p>
                  <h3 className="text-2xl font-bold">
                    {metrics[selectedPeriod].customers}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs font-medium flex items-center text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      5.2% from last {selectedPeriod.slice(0, -2)}
                    </span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Average Order Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Average Order
                  </p>
                  <h3 className="text-2xl font-bold">
                    ${metrics[selectedPeriod].avgOrder.toFixed(2)}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs font-medium flex items-center text-red-600">
                      <ArrowDown className="w-3 h-3 mr-1" />
                      1.8% from last {selectedPeriod.slice(0, -2)}
                    </span>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <CircleDollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Cold Storage Status */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Cold Storage Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {coldStorageData.map((storage) => (
              <div
                key={storage.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div
                  className={`h-2 ${
                    storage.alertLevel === "warning"
                      ? "bg-yellow-500"
                      : storage.alertLevel === "critical"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg flex items-center">
                        <Refrigerator className="w-5 h-5 mr-2 text-blue-600" />
                        {storage.name}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {storage.items} items stored
                      </div>
                    </div>
                    {storage.alertLevel === "warning" && (
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Temperature</p>
                      <p
                        className={`text-lg font-bold ${
                          storage.status === "attention"
                            ? "text-yellow-600"
                            : storage.status === "critical"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {storage.temperature}°F
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Humidity</p>
                      <p className="text-lg font-bold text-blue-600">
                        {storage.humidity}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Capacity Used</p>
                      <p className="text-lg font-bold text-blue-600">
                        {storage.capacity}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Inspected</p>
                      <p className="text-lg font-bold text-gray-700">
                        {storage.lastInspected}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inventory Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Inventory</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Inventory Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {["all", "low", "out", "cold"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 mr-4 text-sm font-medium border-b-2 ${
                  selectedTab === tab
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab === "all"
                  ? "All Items"
                  : tab === "low"
                  ? "Low Stock"
                  : tab === "out"
                  ? "Out of Stock"
                  : "Cold Storage"}
              </button>
            ))}
          </div>

          {/* Inventory Table */}
          <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Storage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.supplier}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.storage.includes("Cold")
                        ? renderStorageStatus(item.storage)
                        : item.storage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStockStatus(item.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredInventory.length === 0 && (
              <div className="py-12 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No items found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Grid: Recent Sales and Orders Awaiting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Sales */}
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Sales
                </h3>
                <button className="text-sm text-green-600 hover:text-green-700">
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">
                          {sale.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {sale.date} • {sale.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          ${sale.total.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {sale.items} items
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          sale.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders Awaiting Pickup */}
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Orders Awaiting Pickup
                </h3>
                <button className="text-sm text-green-600 hover:text-green-700">
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {awaitingPickup.map((order) => (
                  <div key={order.id} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.id} • {order.items} items
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </div>
                        <div className="text-sm text-green-600 flex items-center justify-end">
                          <Clock className="w-3 h-3 mr-1" />
                          {order.readyBy}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        Ready for Pickup
                      </span>
                      <button className="text-xs text-green-600 hover:text-green-700 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Mark as Picked Up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
