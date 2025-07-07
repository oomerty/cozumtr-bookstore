/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import type ProductType from "../types/ProductType";

interface CartContextType {
  addProductToCart: (product: ProductType) => void;
  getProductsOnCart: () => Array<object | null>;
  clearCart: () => void;
  isLoading: boolean;
  error: string;
}

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: CartContextProviderProps) {
  const [productsOnCart, setProductsOnCart] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function addProductToCart(product: ProductType) {
    try {
      setIsLoading(true);

      const alreadyAddedToCart = productsOnCart.find(
        (el) => product.id === el.id
      );

      if (alreadyAddedToCart) {
        setProductsOnCart((arr) => arr.filter((val) => val.id !== product.id));
        return;
      }

      setProductsOnCart((arr) => [...arr, product]);
    } catch {
      setError(
        "This product cannot be added to cart now - please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  }

  function getProductsOnCart() {
    return productsOnCart;
  }

  function clearCart() {
    setProductsOnCart([]);
  }

  const value: CartContextType = {
    addProductToCart,
    getProductsOnCart,
    clearCart,
    isLoading,
    error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
}

export { CartProvider, useCart };
