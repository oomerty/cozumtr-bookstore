import { Link } from "react-router-dom";

interface CardProps {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

interface Product {
  slug: string;
  cover: string;
  author: string;
  name: string;
  price: number;
}

interface ProductCardProps {
  type: "sm" | "lg";
  className?: string;
  product: Product;
}

function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={`bg-violet-50 rounded outline-1 outline-offset-[-1px] outline-slate-900/10 flex flex-col justify-start items-center gap-5 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function ProductCard({ product, className, type }: ProductCardProps) {
  return (
    <Link to={`/products/${product.slug}`}>
      <Card
        className={`p-2 ${type === "lg" && "flex-col"} ${
          type === "sm" && "flex-row"
        } ${className && className}`}
      >
        <img
          src={`/img/covers/${product.cover}`}
          alt={`Book cover for ${product.author}'s ${product.name}`}
          className="rounded shadow-[0px_4px_8px_0px_rgba(98,81,221,0.20)] aspect-2/3 w-1/3"
        />
        <div className="flex flex-col h-full justify-between py-4">
          <div>
            <h4 className="text-slate-900 text-lg font-semibold">
              {product.name}
            </h4>
            <p className="text-slate-900/60 text-base font-medium">
              {product.author}
            </p>
          </div>
          <p className="text-indigo-600 text-xl font-semibold">
            {product.price} $
          </p>
        </div>
      </Card>
    </Link>
  );
}

export { Card, ProductCard };
