import { Link } from "react-router-dom";
import Card from "../../general/Card";
import axios from "axios";
import useSWR from "swr";
import { memo } from "react";

interface ProductCardProps {
  type: "sm" | "lg";
  className?: string;
  categoryId: number | string | undefined;
  product: Product;
}

interface Product {
  slug: string;
  cover: string;
  author: string;
  name: string;
  price: number;
}

interface ProductCoverResponse {
  url: string;
}

const productCoverFetcher = (
  url: string,
  payload?: string
): Promise<ProductCoverResponse> =>
  axios({
    method: "POST",
    url,
    data: {
      fileName: payload,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

const ProductCard = memo(function ProductCard({
  product,
  categoryId,
  className,
  type,
}: ProductCardProps) {
  const { data, error, isLoading } = useSWR<ProductCoverResponse>(
    [`${import.meta.env.VITE_API_BASE_URL}/cover_image`, product.cover],
    ([url, fileName]) => productCoverFetcher(url, fileName)
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
          src={data?.data.action_product_image.url}
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
