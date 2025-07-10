import useSWR from "swr";
import apiClient from "./api-client";
import type { Product } from "../types/ProductType";

interface ProductResponse {
  product: Product;
}

interface CoverResponse {
  url: string;
}

const productFetcher = async (url: string): Promise<ProductResponse> => {
  return apiClient.get(url);
};

const coverFetcher = async (
  url: string,
  coverName: string
): Promise<CoverResponse> => {
  return apiClient.post(url, { fileName: coverName });
};

export function useProduct(slug: string | undefined) {
  const { data, error, isLoading } = useSWR<ProductResponse>(
    slug ? `/product/${slug}` : null,
    productFetcher
  );

  return {
    product: data?.product,
    isLoading,
    error,
  };
}

export function useProductCover(coverName: string | undefined) {
  const { data, error, isLoading } = useSWR<CoverResponse>(
    coverName ? ["/cover_image", coverName] : null,
    ([url, cover]) => coverFetcher(url as string, cover as string)
  );

  return {
    coverUrl: data?.url || `/img/covers/${coverName}`,
    isLoading,
    error,
  };
}
