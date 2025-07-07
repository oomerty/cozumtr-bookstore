import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import type ProductType from "../../../types/ProductType";

import Button from "../components/general/Button";
import Spinner from "../components/general/Spinner";
import Message from "../components/general/Message";
import Card from "../components/general/Card";
import ProductCard from "../components/page-specific/product-detail/ProductCard";

function Cart() {
  const { getProductsOnCart, clearCart, isLoading } = useCart();
  const [productsOnCart, setProductsOnCart] = useState([]);
  const navigation = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchedProductsOnCart = getProductsOnCart();
    if (fetchedProductsOnCart.length !== 0) {
      const newTotalPrice = fetchedProductsOnCart.reduce(
        (sum, item) => sum + item?.price,
        0
      );
      setTotalPrice(newTotalPrice);
    }
    setProductsOnCart(fetchedProductsOnCart);
  }, [totalPrice, getProductsOnCart]);

  function handleClearCart() {
    setTotalPrice(0);
    clearCart();
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <span className="flex flex-row justify-between">
          <Button
            className="self-start"
            btnType="hyperlink-navigation"
            onClick={() => navigation(-1)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
            Cart{" "}
            {productsOnCart.length > 0 &&
              `(${productsOnCart.length} item${
                productsOnCart.length > 1 ? "s" : ""
              })`}
          </Button>
          {productsOnCart.length !== 0 && (
            <Button btnType="hyperlink" onClick={() => handleClearCart()}>
              Clear Cart
            </Button>
          )}
        </span>
        {isLoading && <Spinner />}
        {productsOnCart.length <= 0 && (
          <Message
            title="No Products On Cart"
            message="You don't have any products on your cart, go ahead and add some products to your shopping basket!"
          />
        )}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {productsOnCart.map((product: ProductType) => (
            <ProductCard
              type="sm"
              categoryId={undefined}
              product={product}
              key={product.id}
            />
          ))}
        </section>
      </div>

      <section className="flex flex-col gap-4 w-full md:w-1/3">
        <div className="flex flex-col gap-4 p-4 rounded bg-gray-100 ring-1 ring-gray-200 w-full h-fit">
          {totalPrice !== 0 && (
            <span className="flex flex-row items-center justify-between gap-1">
              <p className="text-sm font-bold uppercase">Items</p>
              <p className="text-slate-700 text-xl font-bold">
                {totalPrice.toFixed(2)} $
              </p>
            </span>
          )}

          {totalPrice !== 0 && (
            <span className="flex flex-row items-center justify-between gap-1">
              <p className="text-sm font-bold uppercase">Shipping</p>
              <span className="flex flex-row gap-1">
                <p className="text-slate-700 text-xl font-bold">0 $</p>
                <p className="text-slate-900/60 text-base font-semibold line-through">
                  {(totalPrice * 0.08).toFixed(2)} $
                </p>
              </span>
            </span>
          )}

          <span className="flex flex-row items-center justify-between gap-1">
            <p className="text-sm font-bold uppercase">Total Price</p>
            <p className="text-indigo-600 text-xl font-bold">
              {totalPrice.toFixed(2)} $
            </p>
          </span>

          <span className="flex flex-col gap-2">
            <Button
              className="w-full"
              btnType="primary"
              disabled={totalPrice === 0}
              onClick={() =>
                navigation(
                  `/checkout?item_number=${productsOnCart.length}&price=${totalPrice}`
                )
              }
            >
              Checkout
            </Button>

            <Button
              className="w-full"
              btnType="secondary"
              onClick={() => navigation("/")}
            >
              Continue shopping
            </Button>
          </span>
        </div>

        <Card className="flex flex-col p-3 !gap-1 items-start justify-start">
          <p className="text-sm font-semibold uppercase text-slate-900">
            Payment Method
          </p>
          <p className="font-medium text-slate-900/80">VISA 4934</p>
        </Card>

        <Card className="flex flex-col p-3 !gap-1 items-start justify-start">
          <p className="text-sm font-semibold uppercase text-slate-900">
            Shipping Adress
          </p>
          <p className="font-medium text-slate-900/80">
            3 hoog Kizzyplantsoen 701 III, West Schippersswaerd, FL 1058 LY
          </p>
        </Card>
      </section>
    </div>
  );
}

export default Cart;
