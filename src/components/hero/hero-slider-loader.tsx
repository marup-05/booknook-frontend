"use client";

import dynamic from "next/dynamic";

const HeroSlider = dynamic(
  () => import("./hero-slider"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[640px] bg-stone-950" />
    ),
  }
);

export default function HeroSliderLoader() {
  return <HeroSlider />;
}
