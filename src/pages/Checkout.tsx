import { useEffect, useId, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useCart } from "../contexts/CartContext";

import Button from "../components/general/Button";
import Spinner from "../components/general/Spinner";
import Card from "../components/general/Card";
import ProductCard from "../components/page-specific/product-detail/ProductCard";

function Checkout() {
  const { getProductsOnCart, isLoading, error } = useCart();
  const [productsOnCart, setProductsOnCart] = useState([]);
  const navigation = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const items_number = searchParams.get("items_number");
  const price = searchParams.get("price");
  const totalPrice = Number(price);

  const purchaseId = useId();

  useEffect(() => {
    const fetchedProductsOnCart = getProductsOnCart();

    if (fetchedProductsOnCart.length === 0) {
      navigation("/cart");
    }

    setProductsOnCart(fetchedProductsOnCart);
  }, [getProductsOnCart, navigation]);

  return (
    <>
      <span className="flex flex-row justify-between">
        <Button
          className="self-start"
          type="hyperlink-navigation"
          onClick={() => navigation(-1)}
        >
          <span className="material-symbols-outlined">chevron_left</span>
          Checkout
        </Button>
      </span>

      <section className="flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col p-4 !gap-1 items-start justify-start">
          <p className="text-sm font-semibold uppercase text-slate-900">
            Payment Method
          </p>
          <p className="font-medium text-slate-900/80">VISA 4934</p>
        </Card>

        <Card className="flex flex-col p-4 !gap-1 items-start justify-start">
          <p className="text-sm font-semibold uppercase text-slate-900">
            Shipping Adress
          </p>
          <p className="font-medium text-slate-900/80">
            3 hoog Kizzyplantsoen 701 III, West Schippersswaerd, FL 1058 LY
          </p>
        </Card>

        <div className="flex flex-col gap-4 p-4 rounded bg-gray-100 ring-1 ring-gray-200 w-full h-fit lg:col-span-2">
          {totalPrice !== 0 && (
            <span className="flex flex-row items-center justify-between gap-1">
              <p className="text-sm font-bold uppercase">Items</p>
              <p className="text-slate-700 text-xl font-bold">
                {totalPrice.toFixed(2)} $
              </p>
            </span>
          )}

          <span className="flex flex-row items-center justify-between gap-1">
            <p className="text-sm font-bold uppercase">Shipping</p>
            <span className="flex flex-row gap-1">
              <p className="text-slate-700 text-xl font-bold">0 $</p>
              <p className="text-slate-900/60 text-base font-semibold line-through">
                {(totalPrice * 0.08).toFixed(2)} $
              </p>
            </span>
          </span>

          <span className="flex flex-row items-center justify-between gap-1">
            <p className="text-sm font-bold uppercase">Total Price</p>
            <p className="text-indigo-600 text-xl font-bold">
              {totalPrice.toFixed(2)} $
            </p>
          </span>

          <span className="flex flex-col lg:flex-row-reverse gap-2">
            <Button
              className="w-full"
              type="primary"
              disabled={totalPrice === 0}
              onClick={() =>
                navigation(
                  `/purchase-confirmation?purchase_id=${purchaseId}&price=${totalPrice}`,
                  {
                    state: { productsOnCart },
                  }
                )
              }
            >
              Complete Purchase
            </Button>

            <Button
              className="w-full"
              type="secondary"
              onClick={() => navigation("/cart")}
            >
              Go back to cart
            </Button>
          </span>
        </div>
      </section>

      {isLoading && <Spinner />}
      <span className="flex flex-col gap-2">
        <h2 className="font-semibold uppercase text-slate-900">Items</h2>
        <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {productsOnCart.map((product: object) => (
            <ProductCard
              type="sm"
              categoryId={null}
              product={product}
              key={product.id}
            />
          ))}
        </section>
      </span>
    </>
  );
}

export default Checkout;
