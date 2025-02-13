import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Retrieve cart items from localStorage on initial load
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      setCartItems((items) =>
        items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCartItems((items) => items.filter((item) => item._id !== id));
    } else {
      setCartItems((items) =>
        items.map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        handleOrderComplete,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};