"use client";

import { useEffect, useRef, useState } from "react";   
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass, SwiperOptions } from "swiper/types";    
import "swiper/css/bundle";

import { cn } from "cn";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  image: { src: string; alt: string };
  /** Tailwind gradient classes layered over the photo for text readability */
  overlay: string;
};

const SLIDES: Slide[] = [
  {
    id: "library",
    eyebrow: "Welcome to BookNook",
    title: "Where every shelf holds a new adventure",
    image: {
      src: "/images/hero-books.jpg",
      alt: "A cozy library aisle lined with books under warm hanging lights",
    },
    overlay: "bg-linear-to-t from-stone-950/90 via-stone-950/45 to-stone-950/25",
  },
  {
    id: "arrivals",
    eyebrow: "Fresh & trending",
    title: "This week's arrivals just landed",
    image: {
      src: "/images/hero-cozy.jpg",
      alt: "A colourful stack of freshly arrived hardcover books",
    },
    overlay: "bg-linear-to-t from-stone-950/90 via-stone-950/40 to-stone-950/20",
  },
  {
    id: "shelves",
    eyebrow: "The BookNook shelves",
    title: "Your next great read is waiting",
    image: {
      src: "/images/hero-library.jpg",
      alt: "Wall-to-wall wooden shelves packed with classic books",
    },
    overlay: "bg-linear-to-t from-stone-950/90 via-stone-950/45 to-stone-950/25",
  },
];

const SWIPER_CONFIG: SwiperOptions = {
  modules: [EffectFade, Navigation, Pagination, Keyboard],
};

const AUTOPLAY_DELAY_MS = 4500;
const AUTOPLAY_SPEED = 900;

export default function HeroSlider() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;

    const id = window.setInterval(() => {
      if (
        !pausedRef.current &&
        document.visibilityState === "visible" &&
        !swiper.destroyed &&
        swiper.initialized
      ) {
        swiper.slideNext(AUTOPLAY_SPEED);
      }
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(id);
    };
  }, [swiper]);

  return (
    <section
      aria-label="Featured highlights"
      className="relative"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <Swiper
        {...SWIPER_CONFIG}
        className="hero-swiper h-full"
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={AUTOPLAY_SPEED}
        loop
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".hero-swiper-prev",
          nextEl: ".hero-swiper-next",
        }}
        onSwiper={setSwiper}
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative overflow-hidden bg-stone-950">
              {/* Full-bleed photo, properly fitted */}
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Readability gradient over the photo */}
              <div
                aria-hidden="true"
                className={cn("absolute inset-0", slide.overlay)}
              />

              {/* Slide content */}
              <div className="container-page relative flex min-h-[640px] flex-col items-center justify-center py-20 pb-28 text-center md:min-h-[680px] lg:min-h-[700px] lg:py-24">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-amber-300 backdrop-blur-sm">
                  {slide.eyebrow}
                </p>

                <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-bold text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <Link
                  href="/books"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-500 px-7 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-950/40 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                >
                  Browse Books
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          type="button"
          aria-label="Previous slide"
          className="hero-swiper-prev absolute left-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:grid md:left-6"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next slide"
          className="hero-swiper-next absolute right-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:grid md:right-6"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </Swiper>
    </section>
  );
}
