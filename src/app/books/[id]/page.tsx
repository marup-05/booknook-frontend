import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import {
  ArrowLeft,
  BookOpen,
  BookCopy,
  Mail,
  Star,
  UserRound,
} from "lucide-react";

import BorrowButton from "@/components/books/borrow-button";
import { auth } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  addedByName?: string;
  addedByEmail?: string;
};

async function getBook(id: string): Promise<Book | null> {
  try {
    if (!API_URL) throw new Error("API URL is not configured.");

    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const response = await fetch(`${API_URL}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (response.status === 404 || response.status === 400) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    return response.json();
  } catch (error) {
    console.error("Book details error:", error);
    return null;
  }
}

async function BookDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) notFound();

  const isAvailable = book.availableCopies > 0;

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/books"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-amber-700 dark:hover:text-amber-400"
        >
          <ArrowLeft size={17} />
          Back to All Books
        </Link>

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-md shadow-black/5">
          <div className="grid gap-6 p-5 sm:grid-cols-[220px_1fr] sm:gap-8 sm:p-7">
            <div className="flex justify-center">
              <div className="relative h-[260px] w-[190px] overflow-hidden rounded-lg bg-muted shadow-md">
                {book.imageUrl ? (
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    fill
                    unoptimized
                    priority
                    sizes="190px"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <BookOpen size={48} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {book.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isAvailable
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 dark:text-amber-400">
                  <Star size={15} fill="currentColor" />
                  {book.rating ?? "N/A"}
                </span>
              </div>

              <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                {book.title}
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                by{" "}
                <span className="font-semibold text-foreground">
                  {book.author}
                </span>
              </p>

              <div className="my-5 border-t border-border" />

              <h2 className="mb-2 text-sm font-bold text-foreground">
                About This Book
              </h2>

              <p className="text-sm leading-6 text-muted-foreground">
                {book.description || "No description available for this book."}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
                  <BookCopy
                    size={18}
                    className="text-amber-700 dark:text-amber-400"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Available Copies
                    </p>
                    <p className="font-bold text-foreground">
                      {book.availableCopies}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
                  <BookOpen
                    size={18}
                    className="text-amber-700 dark:text-amber-400"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Copies
                    </p>
                    <p className="font-bold text-foreground">
                      {book.totalCopies}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-border bg-muted/50 p-4">
                <h2 className="mb-3 text-sm font-bold text-foreground">
                  Added By
                </h2>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserRound
                      size={16}
                      className="text-amber-700 dark:text-amber-400"
                    />
                    <span>{book.addedByName || "Unknown"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail
                      size={16}
                      className="shrink-0 text-amber-700 dark:text-amber-400"
                    />
                    <span className="break-all">
                      {book.addedByEmail || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <BorrowButton
                  bookId={book._id}
                  availableCopies={book.availableCopies}
                />
              </div>
            </div>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          BookNook · Your next chapter starts here.
        </p>
      </div>
    </main>
  );
}

export default function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-sm font-medium text-muted-foreground">
            Loading book details...
          </p>
        </div>
      }
    >
      <BookDetailsContent params={params} />
    </Suspense>
  );
}