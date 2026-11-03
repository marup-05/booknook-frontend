
import Link from "next/link";
import { Search, BookOpen, BookmarkCheck, ArrowRight } from "lucide-react";
import Reveal from "@/components/motion/reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore our growing collection and find a book that matches your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow",
    description:
      "Choose your favorite book and borrow it easily with just one click.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Enjoy Reading",
    description:
      "Enjoy your reading journey and return the book when you're finished.",
    icon: BookmarkCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="container-page py-16 md:py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
            Simple & Easy
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Your Reading Journey
            <span className="block text-amber-700 dark:text-amber-400">
              Starts Here
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Getting your next favorite book has never been easier.
            Just follow three simple steps and start exploring.
          </p>
        </div>
      </Reveal>

      <div className="relative mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <Reveal key={step.number} hover delay={index * 0.12}>
              <div className="group relative h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-900/5">
                <div className="flex items-center justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-amber-100 text-amber-800 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-950 dark:text-amber-400">
                    <Icon className="size-6" strokeWidth={1.8} />
                  </div>

                  <span className="font-serif text-4xl font-bold text-muted-foreground/20">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 font-serif text-xl font-bold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden size-7 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-muted-foreground md:grid">
                    <ArrowRight className="size-3.5" />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-10 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-full bg-[#a97842] px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-[#896033] hover:shadow-lg"
          >
            Start Exploring
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
