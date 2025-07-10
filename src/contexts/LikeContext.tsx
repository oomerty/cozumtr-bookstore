/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import type ProductType from "../types/ProductType";
import { useAuth } from "../hooks/useAuth";

interface LikeContextType {
  likeProduct: (product: ProductType) => void;
  getLikedProducts: () => Array<ProductType | null>;
  isLoading: boolean;
  error: string;
}

interface LikeContextProviderProps {
  children: React.ReactNode;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

function LikeProvider({ children }: LikeContextProviderProps) {
  const [likedProducts, setLikedProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();

  function likeProduct(product: ProductType) {
    if (!isAuthenticated) {
      setError("You cannot like products without an account");
      return;
    }

    try {
      setIsLoading(true);

      const alreadyLiked = likedProducts.find((el) => product.id === el.id);

      if (alreadyLiked) {
        setLikedProducts((arr) => arr.filter((val) => val.id !== product.id));

        return;
      }

      setLikedProducts((arr) => [...arr, product]);
    } catch {
      setError("This product cannot be liked now - please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  function getLikedProducts() {
    return likedProducts;
  }

  const value: LikeContextType = {
    likeProduct,
    getLikedProducts,
    isLoading,
    error,
  };

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

function useLike(): LikeContextType {
  const context = useContext(LikeContext);
  if (context === undefined) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
}

export { LikeProvider, useLike };
