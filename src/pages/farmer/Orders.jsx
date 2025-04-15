import React, { useState, useRef, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import FarmerSidebar from "../../components/FarmerSidebar";

// Enhanced Mock Orders Data with additional entries
const INITIAL_ORDERS = [
  {
    id: "ORD-8721",
    customer: "Fresh Market",
    date: "2025-04-14",
    items: [
      { name: "Organic Tomatoes", quantity: 50, unit: "pound" },
      { name: "Fresh Lettuce", quantity: 40, unit: "head" },
    ],
    totalAmount: 349.5,
    status: "pending",
  },
  {
    id: "ORD-8715",
    customer: "EcoGrocers",
    date: "2025-04-13",
    items: [
      { name: "Organic Tomatoes", quantity: 35, unit: "pound" },
      { name: "Organic Carrots", quantity: 40, unit: "pound" },
    ],
    totalAmount: 289.75,
    status: "processing",
  },
  {
    id: "ORD-8710",
    customer: "Local Bistro",
    date: "2025-04-10",
    items: [
      { name: "Fresh Milk", quantity: 20, unit: "liter" },
      { name: "Farm Fresh Eggs", quantity: 10, unit: "dozen" },
    ],
    totalAmount: 199.9,
    status: "shipped",
  },
  // Added new orders
  {
    id: "ORD-8705",
    customer: "Green Earth Restaurant",
    date: "2025-04-08",
    items: [
      { name: "Organic Potatoes", quantity: 60, unit: "pound" },
      { name: "Fresh Spinach", quantity: 25, unit: "pound" },
      { name: "Heirloom Apples", quantity: 30, unit: "pound" },
    ],
    totalAmount: 412.75,
    status: "delivered",
  },
  {
    id: "ORD-8702",
    customer: "Neighborhood Co-op",
    date: "2025-04-07",
    items: [
      { name: "Honey", quantity: 15, unit: "jar" },
      { name: "Organic Blueberries", quantity: 20, unit: "pint" },
    ],
    totalAmount: 325.25,
    status: "cancelled",
  },
  {
    id: "ORD-8699",
    customer: "Farm-to-Table Café",
    date: "2025-04-05",
    items: [
      { name: "Organic Zucchini", quantity: 40, unit: "pound" },
      { name: "Fresh Basil", quantity: 12, unit: "bunch" },
      { name: "Cherry Tomatoes", quantity: 25, unit: "pound" },
    ],
    totalAmount: 378.5,
    status: "delivered",
  },
];

// Status Color Mapping
const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  delivered: "bg-green-200 text-green-900",
  cancelled: "bg-red-100 text-red-800",
};

// Status Icon Mapping
const STATUS_ICONS = {
  pending: RefreshCw,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const FarmerOrders = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdownId &&
        !dropdownRefs.current[openDropdownId]?.contains(event.target)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  // Toggle dropdown
  const toggleDropdown = (orderId) => {
    setOpenDropdownId(openDropdownId === orderId ? null : orderId);
  };

  // Update Order Status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setOpenDropdownId(null);
  };

  // Filter Orders
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus.toLowerCase());

  // Render Status Badge
  const renderStatusBadge = (status) => {
    const StatusIcon = STATUS_ICONS[status];
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2 ${STATUS_COLORS[status]}`}
      >
        <StatusIcon className="w-4 h-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Possible Status Transitions
  const getNextStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return ["Processing", "Cancelled"];
      case "processing":
        return ["Shipped", "Cancelled"];
      case "shipped":
        return ["Delivered", "Processing"];
      default:
        return [];
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <FarmerSidebar />

      {/* Main Content */}
      <div className="flex-1 pl-[250px] pr-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 flex items-center">
            <Package className="mr-4 text-green-600" />
            Orders Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track your incoming and ongoing orders
          </p>
        </header>

        {/* Order Summary Cards - Moved up */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-green-900">
                  {orders.length}
                </p>
              </div>
              <Package className="w-12 h-12 text-green-500" />
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-700">
                  {orders.filter((order) => order.status === "pending").length}
                </p>
              </div>
              <RefreshCw className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          {/* Shipped Orders */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-2">Shipped</p>
                <p className="text-3xl font-bold text-blue-700">
                  {orders.filter((order) => order.status === "shipped").length}
                </p>
              </div>
              <Truck className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          {/* Delivered Orders */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-2">Delivered</p>
                <p className="text-3xl font-bold text-green-700">
                  {
                    orders.filter((order) => order.status === "delivered")
                      .length
                  }
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Status Filter - Kept above table */}
        <div className="mb-6 flex space-x-4">
          {[
            "All",
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedStatus === status
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-50 text-green-800">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Date",
                  "Items",
                  "Total",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-green-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-800">
                      {order.customer}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {order.date}
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-h-20 overflow-y-auto">
                      {order.items.map((item) => (
                        <p
                          key={item.name}
                          className="text-xs text-gray-600 py-1"
                        >
                          {item.name}: {item.quantity} {item.unit}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    {renderStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-4 relative">
                    <div
                      className="relative"
                      ref={(el) => (dropdownRefs.current[order.id] = el)}
                    >
                      <button
                        onClick={() => toggleDropdown(order.id)}
                        className={`flex items-center justify-between w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors ${
                          getNextStatusOptions(order.status).length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          getNextStatusOptions(order.status).length === 0
                        }
                      >
                        <span>Update Status</span>
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      {openDropdownId === order.id &&
                        getNextStatusOptions(order.status).length > 0 && (
                          <div className="absolute z-10 bg-white shadow-lg rounded-lg mt-2 right-0 w-40 border border-gray-200">
                            {getNextStatusOptions(order.status).map(
                              (status) => (
                                <button
                                  key={status}
                                  onClick={() =>
                                    updateOrderStatus(
                                      order.id,
                                      status.toLowerCase()
                                    )
                                  }
                                  className="w-full text-left px-4 py-2 hover:bg-green-50 text-sm transition-colors"
                                >
                                  {status}
                                </button>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Package className="mx-auto w-16 h-16 mb-4 text-green-500" />
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerOrders;
