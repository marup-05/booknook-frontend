import Link from "next/link";
import {
  BookOpen,
  Heart,
  Bookmark,
  Library,
  Sparkles,
  Telescope,
} from "lucide-react";
import { BOOK_CATEGORIES } from "@/lib/site";

const CATEGORY_ICONS = [BookOpen, Sparkles, Bookmark, Heart, Telescope, Library];

export default function BookCategories() {
  return (
    <section className="container-page py-16 md:py-24" id="categories">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-amber-700">
          Explore the stacks
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
          Every genre has a home here
        </h2>
        <p className="mt-3 text-muted-foreground">
          Six curated aisles to wander through — from cosy mysteries to
          sweeping sagas.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {BOOK_CATEGORIES.map((category, index) => {
          const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];
          return (
            <Link
              key={category.label}
              href="/books"
              className="group rounded-2xl border border-border/70 bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-950/5"
            >
              <span className="mx-auto grid size-11 place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-amber-500 group-hover:text-stone-950">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-3 font-medium text-foreground">
                {category.label}
              </p>
              <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                {category.count} books
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
