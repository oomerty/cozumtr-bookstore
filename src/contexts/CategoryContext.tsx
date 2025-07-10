/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useCategories as useCategoriesService } from "../services/category-service";
import type { Category } from "../types/ProductType";

interface CategoryContextType {
  categories: Category[];
  isLoading: boolean;
  error: unknown;
}

interface CategoryContextProviderProps {
  children: React.ReactNode;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

function CategoryProvider({ children }: CategoryContextProviderProps) {
  // Using our service hook instead of direct API calls
  const { categories, isLoading, error } = useCategoriesService();

  const value: CategoryContextType = {
    categories,
    isLoading,
    error,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

function useCategories(): CategoryContextType {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}

export { CategoryProvider, useCategories };
