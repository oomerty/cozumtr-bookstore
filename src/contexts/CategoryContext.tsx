/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

import useSWR from "swr";
import axios from "axios";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

interface Category {
  id: number;
  name: string;
  created_at: string;
}

interface CategoriesResponse {
  category: Category[];
}

const categoriesFetcher = (url: string): Promise<CategoriesResponse> =>
  axios.get(url).then((res) => res.data);

interface CategoryContextType {
  categories: Category[];
  isLoading: boolean;
  error: string;
}

interface CategoryContextProviderProps {
  children: React.ReactNode;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

function CategoryProvider({ children }: CategoryContextProviderProps) {
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  const { data, error, isLoading } = useSWR<CategoriesResponse>(
    `${BASE_URL}/categories`,
    categoriesFetcher
  );

  useEffect(() => {
    if (data?.category) {
      setCategoryData(data.category);
    }
  }, [data]);

  const value: CategoryContextType = {
    categories: categoryData,
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
