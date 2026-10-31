import Image from "next/image";
import Link from "next/link";

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

const API_URL = "http://localhost:5000";

async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    return res.json();
  } catch (error) {
    console.error("Books fetch error:", error);
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-[#faf8f3] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            Discover Your Next Read
          </p>

          <h1 className="font-serif text-4xl font-bold text-[#29251f] sm:text-5xl">
            Explore Our Library
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#777064] sm:text-base">
            Find your next favorite book from our growing collection.
            Every book has a new story waiting for you.
          </p>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-amber-500" />
        </div>

        {/* Book Count */}
        <div className="mb-7 flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-[#29251f]">
            All Books
          </h2>

          <span className="rounded-full bg-[#eee8dc] px-4 py-2 text-sm font-medium text-[#75664f]">
            {books.length} Books Available
          </span>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {books.map((book) => (
              <article
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#e9e1d3] bg-[#fffefa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Book Image */}
                <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#f0ece3] p-6">
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    width={180}
                    height={250}
                    className="h-full w-auto object-contain shadow-lg transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-[#fffefa]/95 px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-sm">
                    {book.category}
                  </span>
                </div>

                {/* Book Information */}
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

                  {/* Copies */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#eee8dc] pt-4">
                    <div>
                      <p className="text-xs text-[#928879]">
                        Availability
                      </p>

                      <p className={`mt-1 text-sm font-semibold ${
                        book.availableCopies > 0
                          ? "text-emerald-700"
                          : "text-red-600"
                      }`}>
                        {book.availableCopies > 0    
                          ? `${book.availableCopies} Copies`    
                          : "Currently Unavailable"}
                      </p>
                    </div>    

                    <span className="text-xs text-[#928879]">
                      Total: {book.totalCopies}
                    </span>
                  </div>

                  {/* Details Button */}
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
          <div className="rounded-2xl border border-dashed border-[#d9cebd] bg-[#fffefa] px-5 py-16 text-center">
            <h3 className="font-serif text-2xl font-bold text-[#29251f]">
              No Books Found
            </h3>

            <p className="mt-3 text-sm text-[#81796d]">
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
