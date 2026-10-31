import HeroSlider from "@/components/hero/hero-slider";
import NewArrivals from "@/components/home/new-arrivals";
import BookCategories from "@/components/home/book-categories";
import CtaBanner from "@/components/home/cta-banner";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <BookCategories />
      <CtaBanner />
    </>
  );
}
