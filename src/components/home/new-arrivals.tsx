
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import Reveal from "@/components/motion/reveal";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getLatestBooks(): Promise<Book[]> {
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const res = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch latest books");
    }

    const books: Book[] = await res.json();

    return books.slice(0, 9);
  } catch (error) {
    console.error("Failed to fetch latest books:", error);
    return [];
  }
}

async function NewArrivalsContent() {
  await connection();

  const books = await getLatestBooks();

  return (
    <section className="container-page py-16 md:py-24" id="new-arrivals">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
            New Arrivals
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Fresh off the press
          </h2>

          <p className="mt-3 text-muted-foreground">
            Discover the nine latest additions to our shelves.
            Your next favorite read is waiting.
          </p>
        </div>

        <Link
          href="/books"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400"
        >
          Show all books

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
      </Reveal>

      {books.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {books.map((book, index) => (
            <Reveal
              key={book._id}
              hover
              delay={(index % 3) * 0.1}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-muted p-3 sm:h-72 sm:p-6">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={180}
                  height={250}
                  unoptimized
                  className="h-full w-auto object-contain shadow-lg transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-2 top-2 rounded-full bg-background/95 px-2.5 py-1 text-[0.65rem] font-semibold capitalize text-amber-800 shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs dark:text-amber-300">
                  {book.category}
                </span>
              </div>

              <div className="p-3.5 sm:p-5">
                <div className="mb-2 flex items-center justify-between gap-1.5 sm:mb-3 sm:gap-2">
                  <span className="truncate text-xs font-medium text-amber-700 sm:text-sm dark:text-amber-400">
                    {book.author}
                  </span>

                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] font-semibold text-amber-800 sm:px-2.5 sm:py-1 sm:text-xs dark:bg-amber-950 dark:text-amber-300">
                    <span>★</span>
                    {Number(book.rating).toFixed(1)}
                  </span>
                </div>

                <h3 className="line-clamp-1 font-serif text-sm font-bold text-foreground sm:text-xl">
                  {book.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm">
                  {book.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-border pt-3 sm:mt-5 sm:pt-4">
                  <div>
                    <p className="text-[0.7rem] text-muted-foreground sm:text-xs">
                      Availability
                    </p>

                    <p
                      className={`text-xs font-semibold sm:text-sm ${
                        book.availableCopies > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {book.availableCopies > 0
                        ? `${book.availableCopies} Copies`
                        : "Currently Unavailable"}
                    </p>
                  </div>

                  <span className="text-[0.7rem] text-muted-foreground sm:text-xs">
                    Total: {book.totalCopies}
                  </span>
                </div>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#a97842] text-xs font-semibold text-white transition-colors hover:bg-[#896033] sm:mt-5 sm:h-11 sm:text-sm"
                >
                  Explore Book
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-border bg-card px-5 py-16 text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground">
            No New Arrivals Yet
          </h3>

          <p className="mt-3 text-sm text-muted-foreground">
            New books will appear here when they are added to the library.
          </p>
        </div>
      )}
    </section>
  );
}

export default function NewArrivals() {
  return (
    <Suspense
      fallback={
        <section className="container-page py-16 md:py-24">
          <p className="text-center text-amber-700 dark:text-amber-400">
            Loading new arrivals...
          </p>
        </section>
      }
    >
      <NewArrivalsContent />
    </Suspense>
  );
}
