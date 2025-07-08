import { useCategories } from "../contexts/CategoryContext";

import Section from "../components/page-specific/home/Section";
import HomeBanner from "../components/page-specific/home/HomeBanner";
import Spinner from "../components/general/Spinner";
import Message from "../components/general/Message";

function Home() {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <HomeBanner />
      {error && (
        <Message
          title="404"
          message="We cannot create your bookstore experience right now - please reload the page or try again later"
        />
      )}
      {categories.map((category) => (
        <Section category={category} key={category.id} />
      ))}
    </>
  );
}

export default Home;
