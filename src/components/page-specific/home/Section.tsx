import { useNavigate } from "react-router-dom";

import Button from "../../general/Button";
import axios from "axios";
import useSWR from "swr";
import { ProductCard } from "../../general/Card";
import Spinner from "../../general/Spinner";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

interface Category {
  id: number;
  name: string;
}

interface SectionProps {
  category: Category;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  author: string;
  description: string;
  cover: string;
  price: number;
  created_at: string;
}

interface CategoryProductsResponse {
  product: Product[];
}

const categoryFetcher = (url: string): Promise<CategoryProductsResponse> =>
  axios({
    method: "GET",
    headers: {
      "x-hasura-user-id": 2,
    },
    url,
  });

function Section({ category }: SectionProps) {
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR<CategoryProductsResponse>(
    `${BASE_URL}/products/${category.id}`,
    categoryFetcher
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        We can't deliver your favorite categories right now - try again later
      </p>
    );
  }

  const products = data?.data.product || [];

  return (
    <section className="grid grid-cols-2 gap-4 items-center">
      <h3 className="text-slate-900 text-2xl font-bold">{category.name}</h3>
      <div className="flex justify-self-end">
        <Button
          type="hyperlink"
          onClick={() => navigate(`/category/${category.id}`)}
        >
          View All
        </Button>
      </div>
      <section className="flex flex-col md:flex-row col-span-2 gap-6 md:gap-4">
        {products.map((product: Product) => (
          <ProductCard
            type="sm"
            categoryId={category.id}
            product={product}
            className="md:w-80"
            key={product.id}
          />
        ))}
      </section>
    </section>
  );
}

export default Section;
