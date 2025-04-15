import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronUp,
  ChevronDown,
  MapPin,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudFog,
} from "lucide-react";
import FarmerSidebar from "../../components/FarmerSidebar";

// Mock data for demonstration
const MOCK_DATA = {
  farmerProfile: {
    id: 1,
    name: "John Farmer",
    email: "john@example.com",
    location: "Green Valley",
    farmName: "Harmony Farms",
    farmSize: "45 acres",
    memberSince: "2023-05-12",
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    avatar: `https://ui-avatars.com/api/?name=John+Farmer&background=4CAF50&color=fff`,
  },
  crops: [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      currentStock: 350,
      unit: "pound",
      currentPrice: 3.99,
      marketAvgPrice: 4.25,
      lastUpdated: "2025-04-15",
      trend: "down",
      image: "/images/tomatoes.jpg",
    },
    {
      id: 2,
      name: "Fresh Lettuce",
      category: "Vegetables",
      currentStock: 200,
      unit: "head",
      currentPrice: 2.49,
      marketAvgPrice: 2.35,
      lastUpdated: "2025-04-15",
      trend: "up",
      image: "/images/lettuce.jpg",
    },
    {
      id: 3,
      name: "Organic Carrots",
      category: "Vegetables",
      currentStock: 450,
      unit: "pound",
      currentPrice: 1.99,
      marketAvgPrice: 1.85,
      lastUpdated: "2025-04-15",
      trend: "up",
      image: "/images/carrots.jpg",
    },
  ],
  recentOrders: [
    {
      id: "ORD-8721",
      buyer: "Fresh Market",
      buyerType: "retailer",
      date: "2025-04-14",
      amount: 349.5,
      status: "delivered",
      items: [
        {
          cropId: 1,
          name: "Organic Tomatoes",
          quantity: 50,
          unit: "pound",
          price: 3.99,
        },
        {
          cropId: 2,
          name: "Fresh Lettuce",
          quantity: 40,
          unit: "head",
          price: 2.49,
        },
      ],
    },
    {
      id: "ORD-8715",
      buyer: "EcoGrocers",
      buyerType: "retailer",
      date: "2025-04-13",
      amount: 289.75,
      status: "shipped",
      items: [
        {
          cropId: 1,
          name: "Organic Tomatoes",
          quantity: 35,
          unit: "pound",
          price: 3.99,
        },
        {
          cropId: 3,
          name: "Organic Carrots",
          quantity: 40,
          unit: "pound",
          price: 1.99,
        },
      ],
    },
  ],
  marketPrices: [
    {
      crop: "Tomatoes (Organic)",
      currentPrice: 4.25,
      lastWeekPrice: 4.15,
      change: "+2.4%",
    },
    {
      crop: "Lettuce",
      currentPrice: 2.35,
      lastWeekPrice: 2.45,
      change: "-4.1%",
    },
    {
      crop: "Carrots (Organic)",
      currentPrice: 1.85,
      lastWeekPrice: 1.75,
      change: "+5.7%",
    },
    { crop: "Corn", currentPrice: 0.79, lastWeekPrice: 0.82, change: "-3.7%" },
    {
      crop: "Apples (Organic)",
      currentPrice: 3.15,
      lastWeekPrice: 3.25,
      change: "-3.1%",
    },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 7500 },
    { month: "Feb", revenue: 8200 },
    { month: "Mar", revenue: 9100 },
    { month: "Apr", revenue: 10500 },
  ],
};

const FarmerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [crops, setCrops] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalStock, setTotalStock] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  // Existing data fetch and utility functions (like WeatherIcon, formatCurrency, etc.)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProfile(MOCK_DATA.farmerProfile);
      setCrops(MOCK_DATA.crops);
      setRecentOrders(MOCK_DATA.recentOrders);
      setMarketPrices(MOCK_DATA.marketPrices);
      setRevenue(MOCK_DATA.monthlyRevenue);

      const stock = MOCK_DATA.crops.reduce(
        (total, crop) => total + crop.currentStock,
        0
      );
      const value = MOCK_DATA.crops.reduce(
        (total, crop) => total + crop.currentStock * crop.currentPrice,
        0
      );

      setTotalStock(stock);
      setTotalValue(value);

      // Mock weather
      setWeather({
        current: {
          temperature: 72,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 8,
          precipitation: 10,
        },
        forecast: [
          { day: "Today", high: 75, low: 62, condition: "Partly Cloudy" },
          { day: "Tomorrow", high: 78, low: 64, condition: "Sunny" },
        ],
      });

      setLoading(false);
    }, 1000);
  }, []);

  // Weather icon component
  const WeatherIcon = ({ condition, className = "w-8 h-8" }) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className={`text-yellow-500 ${className}`} />;
      case "partly cloudy":
        return <Cloud className={`text-gray-400 ${className}`} />;
      case "cloudy":
        return <Cloud className={`text-gray-500 ${className}`} />;
      case "rain":
        return <CloudRain className={`text-blue-500 ${className}`} />;
      case "snow":
        return <Snowflake className={`text-white-500 ${className}`} />;
      case "fog":
        return <CloudFog className={`text-gray-400 ${className}`} />;
      default:
        return <Cloud className={`text-gray-500 ${className}`} />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  // Utility functions for formatting
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const getTrendIcon = (trend) =>
    trend === "up" ? (
      <ChevronUp className="text-green-600 w-5 h-5" />
    ) : (
      <ChevronDown className="text-red-600 w-5 h-5" />
    );

  return (
    <div className="flex bg-green-50 min-h-screen">
      {/* Sidebar */}
      <FarmerSidebar user={profile} />

      {/* Main Content */}
      <main className="flex-1 pl-64 pr-8 py-8 transition-all duration-300">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-green-900 tracking-tight">
              Farmer Dashboard
            </h1>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-lg">{profile.location}</span>
            </div>
          </div>

          {/* Weather & Profile */}
          <div className="flex items-center space-x-6">
            {/* Weather Widget */}
            {weather && (
              <div className="bg-white rounded-2xl shadow-md p-4 flex items-center space-x-4 border-2 border-green-100 hover:shadow-lg transition-all">
                <WeatherIcon
                  condition={weather.current.condition}
                  className="w-12 h-12 transform hover:scale-110 transition-transform"
                />
                <div>
                  <p className="text-3xl font-bold text-green-900">
                    {weather.current.temperature}°F
                  </p>
                  <p className="text-sm text-green-600">
                    {weather.current.condition}
                  </p>
                </div>
              </div>
            )}

            {/* Profile */}
            <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-md p-3 border-2 border-green-100 hover:shadow-lg transition-all">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-14 h-14 rounded-full border-2 border-green-500 hover:scale-105 transition-transform"
              />
              <div>
                <p className="font-bold text-green-900">{profile.name}</p>
                <p className="text-sm text-green-600">{profile.farmName}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Crop Inventory */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-7 border-2 border-green-100 hover:shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">
                Crop Inventory
              </h2>
              <Link
                to="/farmer/inventory"
                className="text-green-600 hover:text-green-800 transition-colors font-semibold"
              >
                View All Crops
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="border-2 rounded-2xl p-5 text-center hover:shadow-xl transition-all group border-green-100"
                >
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-32 h-32 object-cover mx-auto mb-4 rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-bold text-green-900">{crop.name}</h3>
                  <p className="text-sm text-green-600 mb-2">
                    {crop.currentStock} {crop.unit}
                  </p>
                  <div className="flex justify-center items-center">
                    <span className="text-sm mr-2 text-green-800">
                      ${crop.currentPrice}/{crop.unit}
                    </span>
                    {getTrendIcon(crop.trend)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 bg-green-50 rounded-2xl p-5">
              <div>
                <p className="text-green-700 mb-2">Total Stock</p>
                <p className="text-2xl font-bold text-green-900">
                  {totalStock} units
                </p>
              </div>
              <div>
                <p className="text-green-700 mb-2">Total Value</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </div>

          {/* Market Prices */}
          <div className="bg-white rounded-3xl shadow-xl p-7 border-2 border-green-100 hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Market Prices
            </h2>
            <div className="space-y-5">
              {marketPrices.map((price, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-4 border-b border-green-100 last:border-b-0"
                >
                  <div>
                    <p className="font-bold text-green-900">{price.crop}</p>
                    <p className="text-sm text-green-600">
                      ${price.currentPrice}/unit
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      price.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {price.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-7 border-2 border-green-100 hover:shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-900">
                Recent Orders
              </h2>
              <Link
                to="/farmer/orders"
                className="text-green-600 hover:text-green-800 transition-colors font-semibold"
              >
                View All Orders
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    {[
                      "Order ID",
                      "Buyer",
                      "Date",
                      "Items",
                      "Total",
                      "Status",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-green-100 hover:bg-green-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-green-800">
                        {order.id}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-green-900">
                          {order.buyer}
                        </p>
                        <p className="text-xs text-green-600 capitalize">
                          {order.buyerType}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm text-green-800">
                        {order.date}
                      </td>
                      <td className="px-4 py-4">
                        {order.items.map((item) => (
                          <p
                            key={item.cropId}
                            className="text-xs text-green-600"
                          >
                            {item.name}: {item.quantity} {item.unit}
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-4 font-medium text-green-800">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white rounded-3xl shadow-xl p-7 border-2 border-green-100 hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Monthly Revenue
            </h2>
            <div className="h-40 flex items-end space-x-2">
              {revenue.map((month, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-green-500 rounded-t-md hover:bg-green-600 transition-colors"
                    style={{
                      height: `${
                        (month.revenue /
                          Math.max(...revenue.map((r) => r.revenue))) *
                        100
                      }%`,
                    }}
                  />
                  <p className="text-xs text-green-600 mt-2">{month.month}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-green-700">Total Revenue (Apr)</p>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(revenue[revenue.length - 1].revenue)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
