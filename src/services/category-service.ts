import useSWR from "swr";
import apiClient from "./api-client";
import type { Category, Product } from "../types/ProductType";

interface CategoryResponse {
  category: Category[];
}

interface CategoryProductsResponse {
  product: Product[];
}

const categoryFetcher = async (): Promise<CategoryResponse> => {
  return apiClient.get("/categories");
};

const productsFetcher = async (
  url: string
): Promise<CategoryProductsResponse> => {
  return apiClient.get(url);
};

export function useCategories() {
  const { data, error, isLoading } = useSWR<CategoryResponse>(
    "/categories",
    categoryFetcher
  );

  return {
    categories: data?.category || [],
    isLoading,
    error,
  };
}

export function useCategory(id: string | number | undefined) {
  const { categories } = useCategories();
  const category = categories.find((cat) => cat.id === Number(id));

  return { category };
}

export function useCategoryProducts(categoryId: string | number | undefined) {
  const { data, error, isLoading } = useSWR<CategoryProductsResponse>(
    categoryId ? `/products/${categoryId}` : null,
    productsFetcher
  );

  return {
    products: data?.product || [],
    isLoading,
    error,
  };
}

export function useCategoryWithProducts(
  categoryId: string | number | undefined
) {
  const { category } = useCategory(categoryId);
  const { products, isLoading, error } = useCategoryProducts(categoryId);

  return {
    category,
    products,
    isLoading,
    error,
  };
}
