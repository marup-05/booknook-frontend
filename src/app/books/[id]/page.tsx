
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  BookCopy,
  Mail,
  Star,
  UserRound,
} from "lucide-react";

import BorrowButton from "@/components/books/borrow-button";

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
    const response = await fetch(`${API_URL}/books/${id}`, {
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
    <main className="min-h-screen bg-[#faf8f3] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/books"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-amber-800"
        >
          <ArrowLeft size={17} />
          Back to All Books
        </Link>

        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-[#fffefa] shadow-md shadow-stone-900/5">
          <div className="grid gap-6 p-5 sm:grid-cols-[220px_1fr] sm:gap-8 sm:p-7">
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="relative h-[260px] w-[190px] overflow-hidden rounded-lg bg-[#f0ece3] shadow-md">
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
                  <div className="flex h-full items-center justify-center text-stone-400">
                    <BookOpen size={48} />
                  </div>
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="flex flex-col">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  {book.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isAvailable
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700">
                  <Star size={15} fill="currentColor" />
                  {book.rating ?? "N/A"}
                </span>
              </div>

              <h1 className="text-2xl font-bold leading-tight text-stone-900 sm:text-3xl">
                {book.title}
              </h1>

              <p className="mt-2 text-sm text-stone-500">
                by <span className="font-semibold text-stone-800">{book.author}</span>
              </p>

              <div className="my-5 border-t border-stone-200" />

              <h2 className="mb-2 text-sm font-bold text-stone-900">
                About This Book
              </h2>

              <p className="text-sm leading-6 text-stone-600">
                {book.description || "No description available for this book."}
              </p>

              {/* Copies */}
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-stone-100 px-4 py-3">
                  <BookCopy size={18} className="text-amber-700" />
                  <div>
                    <p className="text-xs text-stone-500">Available Copies</p>
                    <p className="font-bold text-stone-900">
                      {book.availableCopies}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-stone-100 px-4 py-3">
                  <BookOpen size={18} className="text-amber-700" />
                  <div>
                    <p className="text-xs text-stone-500">Total Copies</p>
                    <p className="font-bold text-stone-900">
                      {book.totalCopies}
                    </p>
                  </div>
                </div>
              </div>

              {/* Added By */}
              <div className="mt-5 rounded-lg border border-stone-200 bg-[#faf8f3] p-4">
                <h2 className="mb-3 text-sm font-bold text-stone-900">
                  Added By
                </h2>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <UserRound size={16} className="text-amber-700" />
                    <span>{book.addedByName || "Unknown"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <Mail size={16} className="shrink-0 text-amber-700" />
                    <span className="break-all">
                      {book.addedByEmail || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Borrow */}
              <div className="mt-5">
                <BorrowButton
                  bookId={book._id}
                  availableCopies={book.availableCopies}
                />
              </div>
            </div>
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-stone-400">
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
        <div className="flex min-h-screen items-center justify-center bg-[#faf8f3]">
          <p className="text-sm font-medium text-stone-500">
            Loading book details...
          </p>
        </div>
      }
    >
      <BookDetailsContent params={params} />
    </Suspense>
  );
}
