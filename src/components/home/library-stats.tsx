
import { BookOpen, BookCopy, Layers3, Library } from "lucide-react";
import { connection } from "next/server";
import Reveal from "@/components/motion/reveal";

type Book = {
  _id: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getLibraryStats() {
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const response = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch library statistics");
    }

    const books: Book[] = await response.json();

    return {
      totalBooks: books.length,
      totalCopies: books.reduce(
        (total, book) => total + Number(book.totalCopies || 0),
        0
      ),
      availableCopies: books.reduce(
        (total, book) => total + Number(book.availableCopies || 0),
        0
      ),
      categories: new Set(books.map((book) => book.category)).size,
    };
  } catch (error) {
    console.error("Library statistics error:", error);

    return {
      totalBooks: 0,
      totalCopies: 0,
      availableCopies: 0,
      categories: 0,
    };
  }
}

export default async function LibraryStats() {
  await connection();

  const stats = await getLibraryStats();

  const items = [
    {
      label: "Book Titles",
      value: stats.totalBooks,
      description: "Unique books in our library",
      icon: Library,
    },
    {
      label: "Total Copies",
      value: stats.totalCopies,
      description: "Books across our collection",
      icon: BookCopy,
    },
    {
      label: "Available Copies",
      value: stats.availableCopies,
      description: "Ready for your next read",
      icon: BookOpen,
    },
    {
      label: "Categories",
      value: stats.categories,
      description: "Different reading categories",
      icon: Layers3,
    },
  ];

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="container-page py-16 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
            BookNook at a Glance
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            A Little World of Books
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Every book has a story. Here's a little look at the collection
            waiting for you to explore.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                key={item.label}
                hover
                delay={index * 0.1}
                className="group rounded-2xl border border-border bg-card p-5 text-center transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg sm:p-7"
              >
                <div className="mx-auto grid size-12 place-items-center rounded-xl bg-amber-100 text-amber-800 transition-colors group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-950 dark:text-amber-400">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>

                <p className="mt-5 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                  {item.value.toLocaleString()}
                  <span className="text-amber-600 dark:text-amber-400">
                    +
                  </span>
                </p>

                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {item.label}
                </h3>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
