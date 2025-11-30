import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: string, name: string, price: number, image: string) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, type: "increase" | "decrease") => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart]);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const saveCartToLocalStorage = () => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const addToCart = (id: string, name: string, price: number, image: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        toast({
          title: "Cart Updated",
          description: `${name} quantity increased`,
        });
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        toast({
          title: "Added to Cart",
          description: `${name} has been added to your cart`,
        });
        return [...prevCart, { id, name, price, image, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart",
    });
  };

  const changeQuantity = (id: string, type: "increase" | "decrease") => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = type === "increase" ? item.quantity + 1 : item.quantity - 1;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
