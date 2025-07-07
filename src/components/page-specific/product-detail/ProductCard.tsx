import { memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";

import type ProductType from "../../../types/ProductType";

import Card from "../../general/Card";

interface ProductCardProps {
  type: "sm" | "lg";
  className?: string;
  categoryId: number | string | undefined;
  product: ProductType;
}

interface ProductCoverResponse {
  action_product_image: {
    url: string;
  };
}

const productCoverFetcher = async (
  url: string,
  payload?: string
): Promise<ProductCoverResponse> => {
  const response = await axios.post<ProductCoverResponse>(url, {
    fileName: payload,
  });
  return response.data;
};

const ProductCard = memo(function ProductCard({
  product,
  categoryId,
  className,
  type,
}: ProductCardProps) {
  const { data, isLoading } = useSWR<ProductCoverResponse>(
    [`${import.meta.env.VITE_API_BASE_URL}/cover_image`, product.cover],
    (args) => {
      const [url, fileName] = args as [string, string];
      return productCoverFetcher(url, fileName);
    }
  );

  return (
    <Link
      to={`/product/${product.slug}${categoryId && `?category=${categoryId}`}`}
      state={{ product }}
    >
      <Card
        className={`p-2 h-full ${type === "lg" && "flex-col p-4"} ${
          type === "sm" && "flex-row"
        } ${className && className}`}
      >
        <img
          src={data?.action_product_image.url}
          alt={`Book cover for ${product.author}'s ${product.name}`}
          className={`rounded shadow-[0px_4px_8px_0px_rgba(98,81,221,0.20)] aspect-2/3 w-1/3 ${
            type === "lg" && "w-full"
          } ${isLoading && "animate-pulse"}`}
        />
        <div
          className={`flex flex-col h-full justify-between p-4 w-full ${
            type === "lg" &&
            "flex-col md:flex-row items-start md:items-end px-0 py-2 gap-4 md:gap-0 pb-0"
          }`}
        >
          <div>
            <h4 className="text-slate-900 text-lg font-semibold">
              {product.name}
            </h4>
            <p className="text-slate-900/60 text-base font-medium">
              {product.author}
            </p>
          </div>

          <p className="text-indigo-600 text-xl font-bold">{product.price} $</p>
        </div>
      </Card>
    </Link>
  );
});

export default ProductCard;
