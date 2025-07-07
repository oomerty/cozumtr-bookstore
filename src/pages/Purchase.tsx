import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import dateFormat from "../utils/DateFormat";
import { useCart } from "../contexts/CartContext";
import type ProductType from "../types/ProductType";

import Button from "../components/general/Button";
import ProductCard from "../components/page-specific/product-detail/ProductCard";
import { useEffect } from "react";

function Purchase() {
  const { clearCart } = useCart();

  const navigation = useNavigate();
  const location = useLocation();
  const purchasedItems = location.state?.productsOnCart;

  const [searchParams] = useSearchParams();
  const purchase_id = searchParams.get("purchase_id");
  const price = Number(searchParams.get("price"));

  const dateNow = new Date();
  const dateFormatted = dateFormat({ date: dateNow, type: "dd/mm/yyyy-hr/mn" });

  useEffect(() => {
    if (location.state?.productsOnCart === undefined) {
      navigation("/cart");
    }

    clearCart();
  }, [location.state?.productsOnCart, clearCart, navigation]);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4">
        <span className="flex flex-col gap-2 py-8 md:py-0">
          <span className="material-symbols-outlined self-center text-indigo-600">
            sentiment_excited
          </span>
          <h1 className="text-indigo-600 text-3xl font-bold text-center">
            Purchase Completed!
          </h1>
          <p className="text-base font-semibold text-center text-slate-900/80">
            Your{" "}
            {purchasedItems?.length > 1
              ? `${purchasedItems?.length} items`
              : `item`}{" "}
            will arrive next week!
          </p>
        </span>

        <div className="flex flex-col gap-4 p-4 rounded bg-gray-100 ring-1 ring-gray-200 w-full h-fit">
          {price !== 0 && (
            <span className="flex flex-row items-center justify-between gap-1">
              <p className="text-sm font-bold uppercase">Items</p>
              <p className="text-slate-700 text-xl font-bold">
                {price.toFixed(2)} $
              </p>
            </span>
          )}

          <span className="flex flex-row items-center justify-between gap-1">
            <p className="text-sm font-bold uppercase">Shipping</p>
            <span className="flex flex-row gap-1">
              <p className="text-slate-700 text-xl font-bold">0 $</p>
              <p className="text-slate-900/60 text-base font-semibold line-through">
                {(price * 0.08).toFixed(2)} $
              </p>
            </span>
          </span>

          <span className="flex flex-row items-center justify-between gap-1">
            <p className="text-sm font-bold uppercase">Total Price</p>
            <p className="text-indigo-600 text-xl font-bold">
              {price.toFixed(2)} $
            </p>
          </span>

          <Button
            className="w-full"
            btnType="secondary"
            onClick={() => navigation("/")}
          >
            Go back to home
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {purchasedItems?.map((product: ProductType) => (
          <ProductCard
            type="sm"
            categoryId={undefined}
            product={product}
            key={product.id}
          />
        ))}
      </section>

      <span className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <p className="text-base font-medium text-center text-slate-900/80">
          Purchase ID: {purchase_id}
        </p>
        <p className="text-base font-medium text-center text-slate-900/80">
          Purchase Date: {dateFormatted}
        </p>
      </span>
    </>
  );
}

export default Purchase;
