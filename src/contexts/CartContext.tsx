/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";

import type ProductType from "../types/ProductType";
import { useAuth } from "../hooks/useAuth";

interface CartContextType {
  addProductToCart: (product: ProductType) => void;
  getProductsOnCart: () => Array<ProductType | null>;
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

  const { isAuthenticated } = useAuth();

  function addProductToCart(product: ProductType) {
    if (!isAuthenticated) {
      setError("You cannot add products to cart without an account");
      return;
    }

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

  const clearCart = useCallback(function clearCart() {
    setProductsOnCart([]);
  }, []);

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
