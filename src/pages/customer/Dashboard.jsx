import React, { useState } from "react";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
  Plus,
  Truck,
  Leaf,
  ShieldCheck,
  Minus,
  Star,
  Mail,
  Package,
  Info,
  ArrowRight,
  LogOut,
  Settings,
} from "lucide-react";

// Mock Product Data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Organic Tomatoes",
    description: "Fresh, locally grown organic tomatoes",
    category: "Vegetables",
    price: 4.99,
    rating: 4.5,
    image: "https://via.placeholder.com/300x300?text=Tomatoes",
  },
  {
    id: 2,
    name: "Fresh Lettuce",
    description: "Crisp green lettuce from local farms",
    category: "Vegetables",
    price: 2.49,
    rating: 4.2,
    image: "https://via.placeholder.com/300x300?text=Lettuce",
  },
  {
    id: 3,
    name: "Organic Carrots",
    description: "Sweet and crunchy organic carrots",
    category: "Vegetables",
    price: 3.29,
    rating: 4.7,
    image: "https://via.placeholder.com/300x300?text=Carrots",
  },
  {
    id: 4,
    name: "Farm Fresh Eggs",
    description: "Free-range, organic farm eggs",
    category: "Dairy",
    price: 5.99,
    rating: 4.8,
    image: "https://via.placeholder.com/300x300?text=Eggs",
  },
  {
    id: 5,
    name: "Organic Apples",
    description: "Sweet and crisp organic apples",
    category: "Fruits",
    price: 4.49,
    rating: 4.6,
    image: "https://via.placeholder.com/300x300?text=Apples",
  },
  {
    id: 6,
    name: "Fresh Milk",
    description: "Locally sourced fresh milk",
    category: "Dairy",
    price: 3.99,
    rating: 4.4,
    image: "https://via.placeholder.com/300x300?text=Milk",
  },
];

// Navbar Component with Profile Dropdown
const TopNavbar = ({ activeTab, setActiveTab, cartItems }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: Home, key: "home" },
    { name: "Products", icon: ShoppingBag, key: "products" },
    { name: "Orders", icon: Package, key: "orders" },
    { name: "Contact", icon: Mail, key: "contact" },
  ];

  const profileDropdownItems = [
    { name: "Settings", icon: Settings, action: () => {} },
    { name: "Logout", icon: LogOut, action: () => {} },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-green-800">FarmConnect</span>
        </div>

        {/* Navigation Items */}
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center ${
                activeTab === item.key
                  ? "text-green-600 font-semibold"
                  : "text-gray-600 hover:text-green-500"
              } transition-colors`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.name}
            </button>
          ))}
        </div>

        {/* Profile and Cart */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="hover:text-green-600 transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border border-green-100">
                {profileDropdownItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className="flex items-center w-full px-4 py-2 hover:bg-green-50 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3 text-green-600" />
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={() => setActiveTab("cart")}
            className="relative text-gray-600 hover:text-green-600 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-green-900">{product.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-green-700">
            ${product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ onAddToCart, products = MOCK_PRODUCTS }) => {
  const [featuredProducts, setFeaturedProducts] = useState(
    products.filter((product) =>
      ["Organic Tomatoes", "Farm Fresh Eggs", "Organic Apples"].includes(
        product.name
      )
    )
  );

  const featureHighlights = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Get free shipping on orders over $50",
    },
    {
      icon: Leaf,
      title: "Organic Produce",
      description: "100% locally sourced, organic farming",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guarantee",
      description: "Fresh products or your money back",
    },
  ];

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Hero Text */}
          <div>
            <h1 className="text-5xl font-bold text-green-900 mb-6 leading-tight">
              Fresh Farm Produce
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Connecting local farmers directly to your table. Fresh, organic,
              and sustainably sourced produce delivered right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  document
                    .getElementById("featured-products")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                Shop Now <ArrowRight className="ml-2" />
              </button>
              <button className="border-2 border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block">
            <img
              src="https://via.placeholder.com/600x400?text=Fresh+Produce"
              alt="Fresh Produce"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* Features Highlights */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {featureHighlights.map((feature, index) => (
              <div
                key={index}
                className="text-center bg-green-50 p-6 rounded-2xl hover:shadow-lg transition-all group"
              >
                <feature.icon className="mx-auto mb-4 w-16 h-16 text-green-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-green-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="featured-products" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-green-900 text-center mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-700">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Fresh with Our Newsletter
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest updates on our fresh produce, special offers, and
            farm-to-table insights.
          </p>
          <form className="max-w-xl mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-800"
            />
            <button
              type="submit"
              className="bg-white text-green-600 px-6 py-3 rounded-r-lg hover:bg-green-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
// Products Page
const ProductsPage = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(MOCK_PRODUCTS.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold text-green-900 mb-8">Our Products</h1>

      {/* Category Filters */}
      <div className="flex space-x-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

// Cart Page
const CartPage = ({ cartItems, onUpdateCart, onCheckout }) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity === 0) {
      onUpdateCart(cartItems.filter((item) => item.id !== product.id));
    } else {
      onUpdateCart(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold text-green-900 mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty</div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item, item.quantity - 1)
                    }
                    className="bg-green-100 text-green-600 p-2 rounded-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item, item.quantity + 1)
                    }
                    className="bg-green-100 text-green-600 p-2 rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="ml-4 text-lg font-bold text-green-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-green-50 p-6 rounded-lg">
            <div className="flex justify-between">
              <span className="text-xl font-bold text-green-900">Total</span>
              <span className="text-2xl font-bold text-green-900">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Orders Page
const OrdersPage = ({ orders = [] }) => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold text-green-900 mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">No orders yet</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-bold text-green-900">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-green-100 flex justify-between">
                <span className="font-bold text-green-900">Total</span>
                <span className="font-bold text-green-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Message sent! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    // Create a new order
    if (cartItems.length > 0) {
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString().split("T")[0],
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        status: "Shipped",
      };

      // Add to order history
      setOrderHistory([newOrder, ...orderHistory]);

      // Clear cart
      setCartItems([]);

      // Switch to orders tab
      setActiveTab("orders");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onAddToCart={handleAddToCart} />;
      case "products":
        return <ProductsPage onAddToCart={handleAddToCart} />;
      case "orders":
        return <OrdersPage orders={orderHistory} />;
      case "contact":
        return <ContactPage />;
      case "cart":
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateCart={setCartItems}
            onCheckout={handleCheckout}
          />
        );
      default:
        return <HomePage onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navbar */}
      <TopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItems={cartItems}
      />

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Dashboard;
