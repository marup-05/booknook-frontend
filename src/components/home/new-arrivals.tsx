import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { PLACEHOLDER_BOOKS, type PlaceholderBook } from "@/lib/site";

/**
 * New Arrivals section.
 *
 * Currently renders placeholder data, but accepts a `books` prop so the
 * real book list can be passed in (and rendered server-side) once the
 * MongoDB-backed API is connected:
 *
 *   const books = await fetch(`${API_URL}/api/books/latest`).then(r => r.json());
 *   <NewArrivals books={books} />
 */
export default function NewArrivals({
  books = PLACEHOLDER_BOOKS.slice(0, 9),
}: {
  books?: PlaceholderBook[];
}) {
  const latest = books.slice(0, 9);

  return (
    <section className="container-page py-16 md:py-24" id="new-arrivals">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-amber-700">
            New arrivals
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Fresh off the press
          </h2>
          <p className="mt-3 text-muted-foreground">
            The nine latest additions to our shelves — ready to borrow
            right now.
          </p>
        </div>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-amber-500 hover:text-amber-700"
        >
          View all books
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

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
