interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface ProductCardProps {
  img: string;
  bookTitle: string;
  bookAuthor: string;
  price: string;
  type: "sm" | "lg";
  // pricingLocale: string;
  // pricingCurrency: string;
}

function Card({ children, onClick }: CardProps) {
  return (
    <div
      className="bg-violet-50 rounded outline outline-1 outline-offset-[-1px] outline-slate-900/10 inline-flex flex-col justify-start items-center gap-5"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <img
        src={product.img}
        alt={`Book cover for ${product.bookAuthor}'s ${product.bookTitle}`}
      />
      <p>{product.price}</p>
    </Card>
  );
}

export { Card, ProductCard };
