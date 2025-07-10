import { useNavigate } from "react-router-dom";

import type ProductType from "../../../types/ProductType";

import Button from "../../general/Button";
import axios from "axios";
import useSWR from "swr";
import ProductCard from "../product-detail/ProductCard";
import Spinner from "../../general/Spinner";
import Message from "../../general/Message";

interface Category {
  id: number;
  name: string;
}

interface SectionProps {
  className?: string;
  category: Category;
}

interface CategoryProductsResponse {
  data: {
    product: ProductType[];
  };
}

const categoryFetcher = (url: string): Promise<CategoryProductsResponse> =>
  axios({
    method: "GET",
    headers: {
      "x-hasura-user-id": 2,
    },
    url,
  });

function Section({ className, category }: SectionProps) {
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR<CategoryProductsResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/products/${category.id}`,
    categoryFetcher
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Message
        title="404"
        message="We can't deliver your favorite categories right now - try again later"
      />
    );
  }

  const products = data?.data?.product || [];

  return (
    <section
      className={`grid grid-cols-2 gap-4 items-center ${
        className && className
      }`}
    >
      <h3 className="text-slate-900 text-2xl font-bold">{category.name}</h3>
      <div className="flex justify-self-end">
        <Button
          btnType="hyperlink"
          onClick={() => navigate(`/category/${category.id}`)}
        >
          View All
        </Button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap md:flex-row col-span-2 gap-6 md:gap-4">
        {products.map((product: ProductType) => (
          <ProductCard
            type="sm"
            categoryId={category.id}
            product={product}
            key={product.id}
          />
        ))}
      </section>
    </section>
  );
}

export default Section;
