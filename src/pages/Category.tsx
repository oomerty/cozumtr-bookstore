import useSWR from "swr";
import axios from "axios";
import { useCategories } from "../contexts/CategoryContext";
import { useParams } from "react-router-dom";

import { ProductCard } from "../components/general/Card";

const BASE_URL = "https://assign-api.piton.com.tr/api/rest";

interface CategoryResponse {
  id: number;
  slug: string;
  name: string;
  author: string;
  description: string;
  cover: string;
  price: number;
  created_at: string;
}

const categoryFetcher = (url: string): Promise<CategoryResponse> =>
  axios({
    method: "GET",
    headers: {
      "x-hasura-user-id": 2,
    },
    url,
  });

function Category() {
  const { categories } = useCategories();

  const { data, error, isLoading } = useSWR<CategoryResponse>(
    `${BASE_URL}/products/${useParams().id}`,
    categoryFetcher
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        We can't deliver your favorite categories right now - try again later
        {data.data.product.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </p>
    );
  }

  console.log(categories.filter((el) => el.id === 1));

  return <main className="flex flex-col gap-12 px-12 py-8">deneme</main>;
}

export default Category;
