import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLike } from "../contexts/LikeContext";
import type ProductType from "../types/ProductType";

import ProductCard from "../components/page-specific/product-detail/ProductCard";
import Button from "../components/general/Button";
import Spinner from "../components/general/Spinner";
import Message from "../components/general/Message";

function Liked() {
  const { getLikedProducts, isLoading, error } = useLike();
  const [likedProducts, setLikedProducts] = useState<Array<ProductType | null>>(
    []
  );
  const navigation = useNavigate();

  useEffect(() => {
    const fetchedLikedProducts: Array<ProductType | null> = getLikedProducts();
    setLikedProducts(fetchedLikedProducts);
  }, [getLikedProducts]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Message
        title="Nothing yet..."
        message="We cannot find your liked products right now - please try again later"
      />
    );
  }

  return (
    <>
      <Button
        className="self-start"
        btnType="hyperlink-navigation"
        onClick={() => navigation(-1)}
      >
        <span className="material-symbols-outlined">chevron_left</span>
        Liked Prodcuts
      </Button>
      {likedProducts.length <= 0 && (
        <Message
          title="No Liked Products"
          message="You don't have any liked products, go ahead and favorite some products!"
        />
      )}
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {likedProducts
          .filter((product): product is ProductType => product !== null)
          .map((product: ProductType) => (
            <ProductCard
              type="lg"
              categoryId={undefined}
              product={product}
              key={product.id}
            />
          ))}
      </section>
    </>
  );
}

export default Liked;
