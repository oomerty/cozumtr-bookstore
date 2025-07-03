import useSWR from "swr";
import axios from "axios";
import { useCategories } from "../contexts/CategoryContext";
import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "../components/page-specific/product-detail/ProductCard";
import Button from "../components/general/Button";
import Spinner from "../components/general/Spinner";
import Message from "../components/general/Message";

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
    `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
    categoryFetcher
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (data?.data.product.length <= 0 || error) {
    return (
      <Message
        title="Nothing..."
        message="We can't deliver your favorite categories right now - try again later"
      />
    );
  }

  const products = data?.data.product || [];
  const currCategory = categories.filter((el) => el.id === Number(id));
  const currCategoryTitle = currCategory.at(0)?.name;

  return (
    <>
      <Button
        className="self-start"
        type="hyperlink-navigation"
        onClick={() => navigation("/")}
      >
        <span className="material-symbols-outlined">chevron_left</span>
        {currCategoryTitle}
      </Button>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <ProductCard
            type="lg"
            categoryId={id}
            product={product}
            key={product.id}
          />
        ))}
      </section>
    </>
  );
}

export default Category;
