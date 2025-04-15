import React, { createContext, useContext, useState } from "react";

// Initial mock data
const initialProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: 2.99,
    quantity: 100,
    seller: "FarmFresh",
    sellerType: "Farmer",
    image: "https://via.placeholder.com/160x120",
    description: "Fresh organic tomatoes grown locally",
  },
  {
    id: 2,
    name: "Fresh Apples",
    category: "Fruits",
    price: 1.49,
    quantity: 200,
    seller: "OrchardGoods",
    sellerType: "Farmer",
    image: "https://via.placeholder.com/160x120",
    description: "Crisp and sweet apples",
  },
  {
    id: 3,
    name: "Bagged Potatoes",
    category: "Vegetables",
    price: 4.99,
    quantity: 50,
    seller: "FarmToTable",
    sellerType: "Retailer",
    image: "https://via.placeholder.com/160x120",
    description: "5lb bag of russet potatoes",
  },
  {
    id: 4,
    name: "Farm Eggs",
    category: "Dairy",
    price: 3.99,
    quantity: 30,
    seller: "HappyHens",
    sellerType: "Farmer",
    image: "https://via.placeholder.com/160x120",
    description: "Free-range organic eggs",
  },
];

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    const newProduct = {
      id: Date.now(),
      ...product,
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const getProduct = (productId) => {
    return products.find((product) => product.id === parseInt(productId));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
