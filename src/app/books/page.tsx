
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

async function getBooks(): Promise<Book[]> {
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const res = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
}

async function BooksContent() {
  await connection();

  const books = await getBooks();

  return (
    <main className="min-h-screen bg-background py-12 text-foreground sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
              Discover Your Next Read
            </p>

            <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Explore Our Library
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Find your next favorite book from our growing collection.
              Every book has a new story waiting for you.
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-amber-500" />
          </div>
        </Reveal>

        {/* Book Count */}
        <Reveal>
          <div className="mb-7 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              All Books
            </h2>

            <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
              {books.length} Books Available
            </span>
          </div>
        </Reveal>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-7 lg:grid-cols-3">
            {books.map((book, index) => (
              <Reveal key={book._id} hover delay={(index % 3) * 0.1}>
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
                  {/* Book Image */}
                  <div className="relative flex h-48 items-center justify-center overflow-hidden bg-muted p-3 sm:h-72 sm:p-6">
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      width={180}
                      height={250}
                      className="h-full w-auto object-contain shadow-lg transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />

                    <span className="absolute left-2 top-2 rounded-full bg-background/95 px-2.5 py-1 text-[0.65rem] font-semibold capitalize text-amber-800 shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs dark:text-amber-300">
                      {book.category}
                    </span>
                  </div>

                  {/* Book Information */}
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

                    {/* Copies */}
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

                    {/* Details Button */}
                    <Link
                      href={`/books/${book._id}`}
                      className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#a97842] text-xs font-semibold text-white transition-colors hover:bg-[#896033] sm:mt-5 sm:h-11 sm:text-sm"
                    >
                      Explore Book
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              No Books Found
            </h3>

            <p className="mt-3 text-sm text-muted-foreground">
              There are no books in the library yet.
            </p>

            <Link
              href="/add-book"
              className="mt-6 inline-flex rounded-xl bg-[#a97842] px-6 py-3 text-sm font-semibold text-white hover:bg-[#896033]"
            >
              Add Your First Book
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BooksPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-[#a97842]">Loading books...</p>
        </div>
      }
    >
      <BooksContent />
    </Suspense>
  );
}
