import { useNavigate } from "react-router-dom";

import Button from "../../general/Button";

interface SectionProps {
  category: object;
}

function Section({ category }: SectionProps) {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-2 items-center">
      <h3 className="text-slate-900 text-2xl font-semibold">{category.name}</h3>
      <div className="flex justify-self-end">
        <Button
          type="hyperlink"
          onClick={() => navigate(`/category/${category.id}`)}
        >
          View All
        </Button>
      </div>
    </section>
  );
}

export default Section;
