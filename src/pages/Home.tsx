import { useCategories } from "../contexts/CategoryContext";

import Section from "../components/page-specific/home/Section";
import HomeBanner from "../components/page-specific/home/HomeBanner";

function Home() {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        We can't deliver your favorite categories right now - try again later
      </p>
    );
  }

  return (
    <>
      <main className="flex flex-col gap-12 px-12 py-8">
        <HomeBanner />
        {categories.map((category: Category) => (
          <Section category={category} key={category.id} />
        ))}
      </main>
    </>
  );
}

export default Home;
