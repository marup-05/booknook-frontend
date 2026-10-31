import Link from "next/link";
import { BookX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center md:py-36">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-amber-700">
        Lost in the stacks
      </p>
      <BookX className="mt-6 size-12 text-amber-600" aria-hidden="true" />
      <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
        This page has been borrowed
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The page you're looking for isn't on our shelves. Maybe it wandered into
        another nook.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-stone-950 px-6 text-sm font-semibold text-amber-50 transition-colors hover:bg-stone-800"
        >
          Back home
        </Link>
        <Link
          href="/books"
          className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-amber-500 hover:text-amber-700"
        >
          Browse Books
        </Link>
      </div>
    </div>
  );
}
