import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Button from "../components/general/Button";
import { Card } from "../components/general/Card";
import { useCategories } from "../contexts/CategoryContext";
import Message from "../components/general/Message";

function Product() {
  const location = useLocation();
  const navigation = useNavigate();

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const product = location.state?.product;
  console.log(categoryId);

  if (!product) {
    return (
      <Message
        title="Oops..."
        message="You have entered an incomplete or incorrect link - please try again later"
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Button
        className="self-start"
        type="hyperlink-navigation"
        onClick={() => navigation(-1)}
      >
        <span className="material-symbols-outlined">chevron_left</span>
        Book Details
      </Button>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 h-full">
        <Card className="p-8">
          <img
            src={`/img/covers/${product.cover}`}
            alt={`Book cover for ${product.author}'s ${product.name}`}
            className="rounded shadow-[0px_4px_8px_0px_rgba(98,81,221,0.20)] aspect-2/3"
          />
        </Card>
        <div className="flex flex-col gap-8 col-span-1 md:col-span-2">
          <span className="flex flex-col gap-1">
            <h1 className="text-black text-3xl font-semibold">
              {product.name}
            </h1>
            <h2 className="text-black/60 text-2xl font-semibold">
              {product.author}
            </h2>

            <Button
              type="field"
              className="absolute right-8 !p-3 bg-violet-50 rounded-full shadow-[0px_4px_8px_0px_rgba(98,81,221,0.20)]"
            >
              <span className="material-symbols-outlined text-indigo-600">
                favorite
              </span>
            </Button>
          </span>

          <span className="flex flex-col gap-1 h-full">
            <h4 className="text-slate-900 text-xl font-bold">Summary</h4>
            <p className="text-slate-900/60 text-base font-normal text-justify">
              {product.description}
            </p>
          </span>

          <Button type="primary" className="w-full md:w-max self-end gap-40">
            <span className="text-bold">{product.price} $</span>
            <span>Buy Now</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Product;
