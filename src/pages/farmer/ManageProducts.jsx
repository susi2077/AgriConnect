import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FarmerSidebar from "../../components/FarmerSidebar";

// Mock data for demonstration
const MOCK_PRODUCTS = [
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
    description:
      "Freshly grown organic tomatoes without pesticides. Rich in flavor and nutrients.",
    organic: true,
    harvestDate: "2025-04-10",
    expiryDate: "2025-04-25",
    image: "/images/tomatoes.jpg", // Local path for reliable images
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
    description:
      "Crisp and fresh lettuce grown locally. Perfect for salads and sandwiches.",
    organic: true,
    harvestDate: "2025-04-12",
    expiryDate: "2025-04-20",
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
    description:
      "Sweet and crunchy organic carrots. Excellent source of vitamins and minerals.",
    organic: true,
    harvestDate: "2025-04-08",
    expiryDate: "2025-04-30",
    image: "/images/carrots.jpg",
  },
  {
    id: 4,
    name: "Sweet Corn",
    category: "Vegetables",
    currentStock: 600,
    unit: "ear",
    currentPrice: 0.75,
    marketAvgPrice: 0.79,
    lastUpdated: "2025-04-15",
    trend: "down",
    description:
      "Juicy sweet corn, perfect for grilling or boiling. Naturally sweet flavor.",
    organic: false,
    harvestDate: "2025-04-14",
    expiryDate: "2025-04-22",
    image: "/images/corn.jpg",
  },
  {
    id: 5,
    name: "Organic Apples",
    category: "Fruits",
    currentStock: 320,
    unit: "pound",
    currentPrice: 2.99,
    marketAvgPrice: 3.15,
    lastUpdated: "2025-04-15",
    trend: "down",
    description:
      "Fresh organic apples with a crisp texture and sweet-tart flavor.",
    organic: true,
    harvestDate: "2025-04-05",
    expiryDate: "2025-05-05",
    image: "/images/apples.jpg",
  },
];

// Sample default product image
const DEFAULT_PRODUCT_IMAGE = "/images/default-product.jpg";

// Categories for filter
const CATEGORIES = ["All", "Vegetables", "Fruits", "Grains", "Dairy", "Other"];

// Units options
const UNITS = [
  "pound",
  "kg",
  "each",
  "head",
  "bunch",
  "oz",
  "gallon",
  "quart",
  "pint",
  "liter",
];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Vegetables",
    currentStock: 0,
    unit: "pound",
    currentPrice: 0,
    description: "",
    organic: false,
    harvestDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    image: DEFAULT_PRODUCT_IMAGE,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Mock farmer profile for sidebar
  const profile = {
    name: "John Farmer",
    role: "Farmer",
    email: "john@example.com",
  };

  // Fetch products (simulated)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 1000);
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Get trend indicator
  const getTrendIndicator = (trend) => {
    if (trend === "up") {
      return (
        <span className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
    } else {
      return (
        <span className="text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      // Handle different sort fields
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.currentPrice - b.currentPrice;
          break;
        case "stock":
          comparison = a.currentStock - b.currentStock;
          break;
        case "updated":
          comparison = new Date(a.lastUpdated) - new Date(b.lastUpdated);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      // Apply sort order
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Delete product
  const handleDeleteProduct = () => {
    if (!productToDelete) return;

    // Remove product from state
    setProducts(
      products.filter((product) => product.id !== productToDelete.id)
    );
    // Close modal
    setShowDeleteModal(false);
    setProductToDelete(null);

    // Show confirmation (in a real app, use a toast notification)
    alert(`Product "${productToDelete.name}" has been deleted.`);
  };

  // Handle edit product form submit
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    // Update product in state
    setProducts(
      products.map((product) =>
        product.id === editProduct.id ? editProduct : product
      )
    );

    // Exit edit mode
    setIsEditMode(false);
    setEditProduct(null);

    // Show confirmation
    alert("Product has been updated successfully.");
  };

  // Handle add product form submit
  const handleAddProduct = (e) => {
    e.preventDefault();

    // Create new product with unique ID and current date
    const currentDate = new Date().toISOString().split("T")[0];
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;

    const productToAdd = {
      ...newProduct,
      id: newId,
      lastUpdated: currentDate,
      marketAvgPrice: newProduct.currentPrice, // For demo purposes
      trend: "up", // Default trend for new product
    };

    // Add to products array
    setProducts([...products, productToAdd]);

    // Reset form and close modal
    setNewProduct({
      name: "",
      category: "Vegetables",
      currentStock: 0,
      unit: "pound",
      currentPrice: 0,
      description: "",
      organic: false,
      harvestDate: currentDate,
      expiryDate: "",
      image: DEFAULT_PRODUCT_IMAGE,
    });
    setShowAddModal(false);
    setImagePreview(null);

    // Show confirmation
    alert("New product has been added successfully.");
  };

  // Handle image upload
  const handleImageUpload = (e, isNewProduct = false) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a preview URL for the uploaded image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);

      if (isNewProduct) {
        setNewProduct({ ...newProduct, image: reader.result });
      } else {
        setEditProduct({ ...editProduct, image: reader.result });
      }
    };

    reader.readAsDataURL(file);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <FarmerSidebar user={profile} />

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Products
            </h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Add New Product
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Category Filter */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label
                    htmlFor="sortBy"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sort By
                  </label>
                  <div className="flex space-x-2">
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="stock">Stock</option>
                      <option value="updated">Last Updated</option>
                    </select>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      {sortOrder === "asc" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="w-full md:w-1/3">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {isEditMode ? (
            // Edit Product Form
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Product
                </h3>
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setEditProduct(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUpdateProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image Upload */}
                      <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Image
                        </label>
                        <div className="flex flex-col items-center">
                          <div className="w-full h-48 border-2 border-gray-300 border-dashed rounded-lg p-2 flex justify-center items-center mb-2 overflow-hidden">
                            <img
                              src={editProduct?.image || DEFAULT_PRODUCT_IMAGE}
                              alt={editProduct?.name || "Product"}
                              className="max-h-full object-contain"
                            />
                          </div>
                          <label className="w-full flex justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                            <span>Change Image</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Basic Information */}
                      <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Product Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              value={editProduct?.name || ""}
                              onChange={(e) =>
                                setEditProduct({
                                  ...editProduct,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Category
                              </label>
                              <select
                                id="edit-category"
                                value={editProduct?.category || ""}
                                onChange={(e) =>
                                  setEditProduct({
                                    ...editProduct,
                                    category: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              >
                                {CATEGORIES.filter((c) => c !== "All").map(
                                  (category) => (
                                    <option key={category} value={category}>
                                      {category}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <div className="flex items-center h-full mt-6">
                              <input
                                type="checkbox"
                                id="organic"
                                checked={editProduct?.organic || false}
                                onChange={(e) =>
                                  setEditProduct({
                                    ...editProduct,
                                    organic: e.target.checked,
                                  })
                                }
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="organic"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Organic Product
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="currentStock"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Stock
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        id="currentStock"
                        value={editProduct?.currentStock || 0}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            currentStock: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        min="0"
                        required
                      />
                      <select
                        value={editProduct?.unit || "pound"}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            unit: e.target.value,
                          })
                        }
                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 border-l-0"
                      >
                        {UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="currentPrice"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        $
                      </span>
                      <input
                        type="number"
                        id="currentPrice"
                        value={editProduct?.currentPrice || 0}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            currentPrice: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 pl-7 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="harvestDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Harvest Date
                    </label>
                    <input
                      type="date"
                      id="harvestDate"
                      value={editProduct?.harvestDate || ""}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          harvestDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      value={editProduct?.expiryDate || ""}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          expiryDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={editProduct?.description || ""}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setEditProduct(null);
                    }}
                    className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Products List
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full">
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <p className="text-gray-500">
                      No products found matching your criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="mt-4 px-4 py-2 text-sm text-green-600 hover:text-green-800"
                    >
                      Clear filters
                    </button>
                  </div>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      {/* Using a background color as fallback while image loads */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="h-12 w-12 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover z-10 relative"
                        onError={(e) => {
                          // Replace broken images with a default
                          e.target.onerror = null;
                          e.target.src = DEFAULT_PRODUCT_IMAGE;
                        }}
                      />
                      {product.organic && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Organic
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h4 className="text-xl font-semibold text-gray-900">
                          {product.name}
                        </h4>
                        <span className="text-sm font-medium text-gray-600">
                          {product.category}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Current Stock</p>
                          <p className="text-lg font-medium text-gray-900">
                            {product.currentStock} {product.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Your Price</p>
                          <p className="text-lg font-medium text-gray-900 flex items-center">
                            {formatCurrency(product.currentPrice)}{" "}
                            {getTrendIndicator(product.trend)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Market Average:{" "}
                          {formatCurrency(product.marketAvgPrice)}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => {
                            setEditProduct(product);
                            setIsEditMode(true);
                          }}
                          className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 text-center rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                          className="flex-1 px-4 py-2 bg-red-100 text-red-700 text-center rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Product
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <form onSubmit={handleAddProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image Upload */}
                      <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Image
                        </label>
                        <div className="flex flex-col items-center">
                          <div className="w-full h-48 border-2 border-gray-300 border-dashed rounded-lg p-2 flex justify-center items-center mb-2 overflow-hidden">
                            {imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-full object-contain"
                              />
                            ) : (
                              <div className="text-center">
                                <svg
                                  className="h-12 w-12 text-gray-300 mx-auto"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <p className="text-sm text-gray-500 mt-1">
                                  Upload product image
                                </p>
                              </div>
                            )}
                          </div>
                          <label className="w-full flex justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                            <span>Upload Image</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, true)}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Basic Information */}
                      <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label
                              htmlFor="new-name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Product Name
                            </label>
                            <input
                              type="text"
                              id="new-name"
                              value={newProduct.name}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              required
                              placeholder="Enter product name"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="new-category"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Category
                              </label>
                              <select
                                id="new-category"
                                value={newProduct.category}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    category: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              >
                                {CATEGORIES.filter((c) => c !== "All").map(
                                  (category) => (
                                    <option key={category} value={category}>
                                      {category}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <div className="flex items-center h-full mt-6">
                              <input
                                type="checkbox"
                                id="new-organic"
                                checked={newProduct.organic}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    organic: e.target.checked,
                                  })
                                }
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                              />
                              <label
                                htmlFor="new-organic"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Organic Product
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="new-stock"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Stock
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        id="new-stock"
                        value={newProduct.currentStock}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            currentStock: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        min="0"
                        required
                        placeholder="0"
                      />
                      <select
                        value={newProduct.unit}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, unit: e.target.value })
                        }
                        className="w-1/3 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 border-l-0"
                      >
                        {UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="new-price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        $
                      </span>
                      <input
                        type="number"
                        id="new-price"
                        value={newProduct.currentPrice}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            currentPrice: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 pl-7 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        min="0"
                        step="0.01"
                        required
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="new-harvest-date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Harvest Date
                    </label>
                    <input
                      type="date"
                      id="new-harvest-date"
                      value={newProduct.harvestDate}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          harvestDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="new-expiry-date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      id="new-expiry-date"
                      value={newProduct.expiryDate}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          expiryDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="new-description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="new-description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe your product..."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Delete
              </h3>
            </div>
            <div className="p-6">
              <p className="mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{productToDelete?.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
