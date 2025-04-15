import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Leaf,
  Tractor,
  Warehouse,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const FarmerSidebar = ({ user }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/farmer",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },

    {
      name: "Crops",
      path: "/manageProducts",
      icon: Leaf,
    },
  ];

  return (
    <div
      className={`
        bg-gradient-to-b from-emerald-900 to-green-900 
        text-white 
        h-screen 
        fixed 
        left-0 
        top-0 
        z-50 
        shadow-2xl 
        transition-all 
        duration-300 
        ${expanded ? "w-64" : "w-20"}
      `}
    >
      {/* Header */}
      <div className="bg-black/10 p-4 flex items-center justify-between border-b border-white/10">
        {expanded ? (
          <div className="flex items-center">
            <Leaf className="w-8 h-8 text-green-400 mr-2" />
            <span className="text-xl font-bold text-green-300">
              AgriConnect
            </span>
          </div>
        ) : (
          <Leaf className="w-8 h-8 text-green-400 mx-auto" />
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:bg-white/10 p-2 rounded-full transition-colors"
        >
          {expanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* User Profile */}
      {expanded && (
        <div className="p-4 border-b border-white/10 flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user?.name?.charAt(0) || "F"}
          </div>
          <div>
            <p className="font-semibold text-green-100">
              {user?.name || "Farmer"}
            </p>
            <p className="text-sm text-green-300">
              {user?.farmName || "Your Farm"}
            </p>
          </div>
        </div>
      )}

      {/* Farm Status */}
      {expanded && (
        <div className="p-4 border-b border-white/10">
          <h3 className="text-xs uppercase text-green-300 font-bold mb-3">
            Farm Overview
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-100">Active Crops</span>
              </div>
              <span className="font-bold text-green-200">5</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-100">Pending Orders</span>
              </div>
              <span className="font-bold text-green-200">3</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-100">Farm Rating</span>
              </div>
              <span className="font-bold text-green-200">4.8/5.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`
                    flex 
                    items-center 
                    ${expanded ? "px-4" : "justify-center"}
                    py-2 
                    rounded-lg 
                    transition-all 
                    duration-200 
                    group
                    ${
                      location.pathname === item.path
                        ? "bg-green-600 text-white"
                        : "text-green-200 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <IconComponent
                    className={`
                      w-5 h-5 
                      ${expanded ? "mr-3" : ""}
                      ${
                        location.pathname === item.path
                          ? "text-white"
                          : "text-green-400 group-hover:text-white"
                      }
                    `}
                  />
                  {expanded && <span className="text-sm">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
        <button
          className={`
            flex 
            items-center 
            ${expanded ? "justify-start w-full" : "justify-center"}
            text-red-400 
            hover:text-red-300 
            transition-colors 
            group
          `}
        >
          <LogOut
            className={`
              w-5 h-5 
              ${expanded ? "mr-3" : ""} 
              group-hover:animate-pulse
            `}
          />
          {expanded && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default FarmerSidebar;
