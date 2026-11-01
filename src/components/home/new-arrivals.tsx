
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

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
  const books = await getLatestBooks();

  return (
    <section className="container-page py-16 md:py-24" id="new-arrivals">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-amber-700">
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
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-amber-500 hover:text-amber-700"
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
      </div>

      {books.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article
              key={book._id}
              className="group overflow-hidden rounded-2xl border border-[#e9e1d3] bg-[#fffefa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#f0ece3] p-6">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={180}
                  height={250}
                  unoptimized
                  className="h-full w-auto object-contain shadow-lg transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-[#fffefa]/95 px-3 py-1.5 text-xs font-semibold capitalize text-amber-800 shadow-sm">
                  {book.category}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[#9a7950]">
                    {book.author}
                  </span>

                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#fff2d9] px-2.5 py-1 text-xs font-semibold text-amber-800">
                    <span>★</span>
                    {Number(book.rating).toFixed(1)}
                  </span>
                </div>

                <h3 className="line-clamp-1 font-serif text-xl font-bold text-[#29251f]">
                  {book.title}
                </h3>

                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-[#81796d]">
                  {book.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#eee8dc] pt-4">
                  <div>
                    <p className="text-xs text-[#928879]">
                      Availability
                    </p>

                    <p
                      className={`mt-1 text-sm font-semibold ${
                        book.availableCopies > 0
                          ? "text-emerald-700"
                          : "text-red-600"
                      }`}
                    >
                      {book.availableCopies > 0
                        ? `${book.availableCopies} Copies`
                        : "Currently Unavailable"}
                    </p>
                  </div>

                  <span className="text-xs text-[#928879]">
                    Total: {book.totalCopies}
                  </span>
                </div>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#a97842] text-sm font-semibold text-white transition-colors hover:bg-[#896033]"
                >
                  Explore Book
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-[#e9e1d3] bg-[#fffefa] px-5 py-16 text-center">
          <h3 className="font-serif text-2xl font-bold text-[#29251f]">
            No New Arrivals Yet
          </h3>

          <p className="mt-3 text-sm text-[#81796d]">
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
          <p className="text-center text-[#a97842]">
            Loading new arrivals...
          </p>
        </section>
      }
    >
      <NewArrivalsContent />
    </Suspense>
  );
}
