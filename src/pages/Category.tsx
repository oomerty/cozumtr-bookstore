import useSWR from "swr";
import axios from "axios";
import { useCategories } from "../contexts/CategoryContext";
import { useNavigate, useParams } from "react-router-dom";

import { ProductCard } from "../components/general/Card";
import Button from "../components/general/Button";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

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

function Category() {
  const { categories } = useCategories();
  const { id } = useParams<{ id: string }>();

  const navigation = useNavigate();

  const { data, error, isLoading } = useSWR<CategoryProductsResponse>(
    `${BASE_URL}/products/${id}`,
    categoryFetcher
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        We can't deliver your favorite categories right now - try again later
      </p>
    );
  }

  const products = data?.data.product || [];
  const currCategory = categories.filter((el) => el.id === 1);
  const currCategoryTitle = currCategory.at(0).name;

  return (
    <main className="flex flex-col justify-start gap-12 px-12 py-8">
      <Button
        className="self-start"
        type="hyperlink-navigation"
        onClick={() => navigation("/")}
      >
        {currCategoryTitle}
      </Button>
      <section className="grid grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    </main>
  );
}

export default Category;
