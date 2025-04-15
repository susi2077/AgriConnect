import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },

    {
      name: "Affiliate Retailer",
      path: "/affiliate",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
        expanded ? "w-64" : "w-20"
      } fixed left-0 top-0 z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div
          className={`flex items-center ${
            expanded ? "justify-between w-full" : "justify-center"
          }`}
        >
          {expanded && (
            <span className="text-xl font-bold text-green-400">
              AgriConnect
            </span>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {expanded ? (
                <path
                  fillRule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        {expanded && (
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-700">
            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg font-semibold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="text-sm font-medium">
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.role || "Administrator"}
              </p>
            </div>
          </div>
        )}
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center ${
                    expanded ? "px-4" : "justify-center px-2"
                  } py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {expanded && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button
          className={`flex items-center ${
            expanded ? "justify-start w-full" : "justify-center"
          } text-red-400 hover:text-red-300 transition-colors`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
