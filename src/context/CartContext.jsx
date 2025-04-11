import { createContext, useState, useContext } from "react";

//  Create CartContext
export const CartContext = createContext();

//  Custom Hook to Use Cart
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //  Add product to cart
  const addToCart = (product, selectedSize, selectedColor) => {
    const newItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0], // First image
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === newItem.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === existingItem.id && item.size === selectedSize && item.color === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  //  Remove product from cart
  const removeFromCart = (id, size, color) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  //  Update quantity of cart item
  const updateCartQuantity = (id, size, color, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  //  Clear entire cart (Fixes the error in CheckoutPage.jsx)
  const clearCart = () => {
    setCart([]); // Reset cart to empty
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
