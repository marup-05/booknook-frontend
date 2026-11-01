
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Mail,
  Star,
  UserRound,
  BookCopy,
} from "lucide-react";

import BorrowButton from "@/components/books/borrow-button";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
  createdAt?: string;
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

async function BookDetailsContent({ id }: { id: string }) {
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  const isAvailable = book.availableCopies > 0;

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-amber-700 hover:text-amber-800"
        >
          <ArrowLeft size={17} />
          Back to All Books
        </Link>

        {/* Details Card */}
        <section className="overflow-hidden rounded-3xl border border-stone-200/80 bg-[#fffefa] shadow-xl shadow-stone-900/5">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Book Image */}
            <div className="relative flex min-h-[420px] items-center justify-center bg-[#f0ece3] p-8 sm:p-12 lg:min-h-[680px]">
              <div className="absolute left-6 top-6">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-800 shadow-sm">
                  {book.category}
                </span>
              </div>

              {book.imageUrl ? (
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={420}
                  height={560}
                  unoptimized
                  priority
                  className="max-h-[520px] w-auto max-w-full rounded-xl object-contain shadow-2xl shadow-stone-900/20"
                />
              ) : (
                <div className="flex h-80 w-60 items-center justify-center rounded-xl bg-white text-stone-400 shadow-lg">
                  <BookOpen size={64} />
                </div>
              )}
            </div>

            {/* Book Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                    isAvailable
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isAvailable ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {isAvailable ? "Available" : "Currently Unavailable"}
                </span>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                  <Star size={17} fill="currentColor" />
                  {book.rating ?? "N/A"}
                </span>
              </div>

              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                Book Details
              </p>

              <h1 className="mb-3 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
                {book.title}
              </h1>

              <p className="mb-7 text-lg text-stone-500">
                by <span className="font-semibold text-stone-800">{book.author}</span>
              </p>

              <div className="mb-8 h-px bg-stone-200" />

              {/* Description */}
              <div className="mb-8">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-stone-900">
                  <BookOpen size={19} className="text-amber-700" />
                  About This Book
                </h2>

                <p className="text-sm leading-7 text-stone-600 sm:text-base">
                  {book.description || "No description available for this book."}
                </p>
              </div>

              {/* Copies Information */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="mb-2 flex items-center gap-2 text-stone-500">
                    <BookCopy size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Copies Left
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-stone-900">
                    {book.availableCopies}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    {book.availableCopies === 1
                      ? "Last copy available"
                      : "Available to borrow"}
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="mb-2 flex items-center gap-2 text-stone-500">
                    <BookOpen size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Total Copies
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-stone-900">
                    {book.totalCopies}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    Total library stock
                  </p>
                </div>
              </div>

              {/* Added By */}
              <div className="mb-8 rounded-2xl bg-[#f7f4ed] p-5">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-800">
                  Added By
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-amber-700">
                      <UserRound size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Name</p>
                      <p className="text-sm font-semibold text-stone-800">
                        {book.addedByName || "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-amber-700">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-stone-500">Email</p>
                      <p className="break-all text-sm font-semibold text-stone-800">
                        {book.addedByEmail || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {book.createdAt && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-amber-700">
                        <CalendarDays size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500">Date Added</p>
                        <p className="text-sm font-semibold text-stone-800">
                          {new Date(book.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Borrow Section */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle2 size={19} className="text-amber-700" />
                  <h2 className="font-bold text-stone-900">
                    Borrow This Book
                  </h2>
                </div>

                <BorrowButton
                  bookId={book._id}
                  availableCopies={book.availableCopies}
                />
              </div>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-stone-400">
          BookNook · Your next chapter starts here.
        </p>
      </div>
    </main>
  );
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#faf8f3]">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-amber-700 border-t-transparent" />
            <p className="text-sm font-medium text-stone-500">
              Loading book details...
            </p>
          </div>
        </div>
      }
    >
      <BookDetailsContent id={id} />
    </Suspense>
  );
}
