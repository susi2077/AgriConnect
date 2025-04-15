import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

function MainLayout() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-green-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">🌐 AgriConnect</span>
              </Link>

              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Dashboard
                </Link>
                <Link
                  to="/marketplace"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Marketplace
                </Link>

                {/* Farmer specific links */}
                {user && user.role === "farmer" && (
                  <>
                    <Link
                      to="/farmer/products"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      My Products
                    </Link>
                    <Link
                      to="/farmer/orders"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/farmer/analytics"
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Analytics
                    </Link>
                  </>
                )}

                {/* Admin specific links */}
                {user && user.role === "admin" && (
                  <Link
                    to="/admin/affiliates"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    Affiliate Partners
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center">
              {/* Cart icon for customers */}
              {user && user.role === "customer" && (
                <Link
                  to="/cart"
                  className="px-3 py-2 flex items-center text-sm font-medium hover:bg-green-700"
                >
                  🛒 Cart ({cartItems.length})
                </Link>
              )}

              <div className="ml-4 flex items-center">
                <span className="mr-2">
                  {user?.username} ({user?.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 border border-white rounded-md text-sm hover:bg-green-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
