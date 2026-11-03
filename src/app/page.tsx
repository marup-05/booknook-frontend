
import { Suspense } from "react";

import HeroSlider from "@/components/hero/hero-slider-loader";
import NewArrivals from "@/components/home/new-arrivals";
import HowItWorks from "@/components/home/how-it-works";
import LibraryStats from "@/components/home/library-stats";
import VirtualBookshelf from "@/components/home/virtual-bookshelf";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <NewArrivals />

      <VirtualBookshelf />

      <HowItWorks />

      <Suspense
        fallback={
          <div className="container-page py-16 text-center text-muted-foreground">
            Loading library statistics...
          </div>
        }
      >
        <LibraryStats />
      </Suspense>
    </>
  );
}
