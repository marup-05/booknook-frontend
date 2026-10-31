import Link from "next/link";
import type { PlaceholderBook } from "@/lib/site";
import { cn } from "cn";

/**
 * Placeholder book cover rendered purely with CSS — will be replaced by real
 * cover images once the Express + MongoDB APIs are connected.
 */
export function BookCover({
  book,
  className,
}: {
  book: PlaceholderBook;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-md ring-1 ring-black/10",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(150deg, ${book.from}, ${book.to})`,
      }}
    >
      {/* spine shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-5 w-px bg-white/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-6 w-3 bg-black/15"
      />

      <div className="relative flex h-full flex-col justify-between p-4 pl-12">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-white/90">
            {book.category}
          </span>
          {book.isNew && (
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-stone-950">
              New
            </span>
          )}
        </div>

        <div>
          <h3 className="font-serif text-lg leading-snug font-bold text-white sm:text-xl">
            {book.title}
          </h3>
          <p className="mt-1 text-xs text-white/75">{book.author}</p>
          <div
            aria-hidden="true"
            className="mt-3 h-px w-10 bg-amber-400/80"
          />
        </div>
      </div>
    </div>
  );
}

export function BookCard({ book }: { book: PlaceholderBook }) {
  return (
<Link
      href="/books"
      className="group block rounded-2xl transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        <BookCover book={book} />
        {/* hover overlay */}
        <div className="absolute inset-0 flex items-end justify-center rounded-xl bg-stone-950/50 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-stone-950">
            View details
            <svg
              className="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
      <div className="pt-3">
        <h3 className="truncate font-serif text-base font-semibold text-foreground transition-colors group-hover:text-amber-700">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {book.author} · {book.category}
        </p>
      </div>
    </Link>
  );
}
