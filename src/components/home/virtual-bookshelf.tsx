
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
};

type FloorObjectType = "plant" | "lamp" | "globe" | "books" | "telescope";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const categories = [
  { name: "fiction", label: "Fiction", icon: "✦" },
  { name: "history", label: "History", icon: "⌛" },
  { name: "mystery", label: "Mystery", icon: "◈" },
  { name: "fantasy", label: "Fantasy", icon: "✧" },
  { name: "science", label: "Science", icon: "⚗" },
];

const floorObjects: Record<
  string,
  { left: FloorObjectType; right: FloorObjectType }
> = {
  fiction: { left: "plant", right: "lamp" },
  history: { left: "globe", right: "books" },
  mystery: { left: "lamp", right: "books" },
  fantasy: { left: "plant", right: "globe" },
  science: { left: "telescope", right: "plant" },
};

async function getBooks(): Promise<Book[]> {
  try {
    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const res = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("Failed to load bookshelf:", error);
    return [];
  }
}

function FloorObject({ type }: { type: FloorObjectType }) {
  if (type === "plant") {
    return (
      <div className="relative flex h-32 w-24 items-end justify-center">
        <div className="absolute bottom-9 left-1/2 h-16 w-1 -translate-x-1/2 rounded-full bg-[#526d3c]" />
        <div className="absolute bottom-[76px] left-7 h-10 w-5 rotate-[-38deg] rounded-[100%_0_100%_0] bg-gradient-to-br from-[#91a96b] to-[#365436] shadow-md" />
        <div className="absolute bottom-[85px] right-6 h-11 w-5 rotate-[38deg] rounded-[100%_0_100%_0] bg-gradient-to-br from-[#a3b879] to-[#3d603b] shadow-md" />
        <div className="absolute bottom-[58px] left-4 h-9 w-5 rotate-[-58deg] rounded-[100%_0_100%_0] bg-gradient-to-br from-[#789b5b] to-[#304c32] shadow-md" />
        <div className="absolute bottom-[60px] right-3 h-9 w-5 rotate-[58deg] rounded-[100%_0_100%_0] bg-gradient-to-br from-[#8eaa65] to-[#365638] shadow-md" />
        <div className="absolute bottom-2 h-10 w-16 rounded-b-xl rounded-t-sm border-x-2 border-[#985d37] bg-gradient-to-r from-[#70412a] via-[#bd8050] to-[#70412a] shadow-[0_8px_12px_rgba(0,0,0,0.5)]" />
        <div className="absolute bottom-10 h-2 w-[68px] rounded-full bg-[#d19a65] shadow-md" />
      </div>
    );
  }

  if (type === "lamp") {
    return (
      <div className="relative flex h-32 w-24 items-end justify-center">
        <div className="absolute bottom-2 h-3 w-16 rounded-full bg-gradient-to-b from-[#c5a16a] to-[#614321] shadow-lg" />
        <div className="absolute bottom-4 h-[76px] w-2 rounded-full bg-gradient-to-r from-[#76502b] via-[#e0bd7b] to-[#76502b]" />
        <div className="absolute bottom-[76px] h-11 w-[70px] rounded-t-[50%] rounded-b-lg border border-[#b68a4d] bg-gradient-to-b from-[#f4dba1] via-[#d3a85d] to-[#93632e] shadow-[0_0_24px_rgba(230,177,91,0.25)]" />
        <div className="absolute bottom-[72px] h-2 w-12 rounded-full bg-[#8e632f]" />
      </div>
    );
  }

  if (type === "globe") {
    return (
      <div className="relative flex h-32 w-24 items-end justify-center">
        <div className="absolute bottom-2 h-3 w-16 rounded-full bg-gradient-to-b from-[#c09a5b] to-[#614321]" />
        <div className="absolute bottom-4 h-4 w-12 rounded-sm bg-gradient-to-r from-[#76502b] via-[#c09a5b] to-[#76502b]" />
        <div className="absolute bottom-7 h-2 w-2 rounded-full bg-[#d4ad6a]" />
        <div className="absolute bottom-9 h-[72px] w-[72px] rounded-full border-[3px] border-[#b18a50] bg-[radial-gradient(circle_at_35%_30%,#85a68a,#315f55_65%,#183e38)] shadow-[0_8px_14px_rgba(0,0,0,0.5)]">
          <div className="absolute left-5 top-3 h-5 w-3 rotate-12 rounded-full bg-[#b9a66b]/80" />
          <div className="absolute right-3 top-7 h-6 w-3 -rotate-12 rounded-full bg-[#b9a66b]/70" />
          <div className="absolute bottom-3 left-3 h-4 w-5 rotate-12 rounded-full bg-[#b9a66b]/70" />
        </div>
      </div>
    );
  }

  if (type === "books") {
    return (
      <div className="relative flex h-32 w-28 items-end justify-center">
        <div className="absolute bottom-3 h-6 w-[76px] rotate-[-5deg] rounded-sm border-b-[3px] border-[#42251d] bg-gradient-to-r from-[#642d27] via-[#a44c3c] to-[#5d2924] shadow-md">
          <div className="absolute inset-y-1 left-3 w-px bg-white/30" />
        </div>
        <div className="absolute bottom-9 h-6 w-[68px] rotate-[4deg] rounded-sm border-b-[3px] border-[#3b3422] bg-gradient-to-r from-[#85703e] via-[#c0a05a] to-[#766039] shadow-md">
          <div className="absolute inset-y-1 left-3 w-px bg-white/30" />
        </div>
        <div className="absolute bottom-[60px] h-6 w-[74px] rotate-[-3deg] rounded-sm border-b-[3px] border-[#242e37] bg-gradient-to-r from-[#29485b] via-[#527b8b] to-[#29485b] shadow-md">
          <div className="absolute inset-y-1 left-3 w-px bg-white/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-32 w-28 items-end justify-center">
      <div className="absolute bottom-2 left-1/2 h-16 w-1 -translate-x-1/2 rotate-[12deg] bg-gradient-to-r from-[#79572e] to-[#d0a766]" />
      <div className="absolute bottom-2 left-[42%] h-16 w-1 -rotate-[17deg] bg-gradient-to-r from-[#79572e] to-[#d0a766]" />
      <div className="absolute bottom-2 right-[42%] h-16 w-1 rotate-[17deg] bg-gradient-to-r from-[#79572e] to-[#d0a766]" />
      <div className="absolute bottom-[67px] h-5 w-[72px] rotate-[-12deg] rounded-full border border-[#9e7a42] bg-gradient-to-b from-[#d4ba7e] via-[#7c8b68] to-[#344c3e] shadow-lg">
        <div className="absolute right-0 top-0 h-full w-3 rounded-r-full bg-[#c7a15f]" />
        <div className="absolute left-0 top-0 h-full w-2 rounded-l-full bg-[#4c5e4c]" />
      </div>
    </div>
  );
}

function ShelfFloor({ category }: { category: string }) {
  const objects = floorObjects[category] || {
    left: "plant" as const,
    right: "lamp" as const,
  };

  return (
    <div className="relative flex h-36 items-end justify-between overflow-hidden border-x-[9px] border-b-[9px] border-[#80532e] bg-gradient-to-b from-[#302016] via-[#24180f] to-[#17100c] px-4 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 border-t border-[#9b693d]/40 bg-gradient-to-b from-[#704525] to-[#382317]" />
      <div className="relative z-10 transition-transform duration-300 hover:-translate-y-2">
        <FloorObject type={objects.left} />
      </div>
      <div className="relative z-10 transition-transform duration-300 hover:-translate-y-2">
        <FloorObject type={objects.right} />
      </div>
    </div>
  );
}

function BookShelf({
  category,
  books,
}: {
  category: string;
  books: Book[];
}) {
  if (!books.length) return null;

  return (
    <div id={`shelf-${category}`} className="scroll-mt-24">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400">
            The collection
          </p>
          <h3 className="mt-1 font-serif text-2xl font-bold capitalize text-amber-50">
            {category} <span className="text-amber-400">Books</span>
          </h3>
        </div>
        <span className="rounded-full border border-amber-100/20 px-3 py-1 text-xs text-amber-200">
          {books.length} {books.length === 1 ? "Book" : "Books"}
        </span>
      </div>

      <div className="relative rounded-t-lg border-x-[9px] border-t-[9px] border-[#80532e] bg-gradient-to-b from-[#2a1a12] to-[#51331f] px-2 pt-7 shadow-[inset_0_10px_25px_rgba(0,0,0,0.4)] sm:px-4 md:px-6">
        <div className="flex min-h-[205px] items-end justify-center gap-2 overflow-x-auto px-2 pb-0 [perspective:1000px] sm:gap-3">
          {books.map((book, index) => (
            <Link
              key={book._id}
              href={`/books/${book._id}`}
              title={`${book.title} by ${book.author}`}
              className="group relative flex h-[175px] w-[48px] shrink-0 origin-bottom items-end justify-center rounded-t-sm border-r-2 border-black/20 shadow-[4px_0_7px_rgba(0,0,0,0.4)] transition-all duration-500 hover:z-10 hover:w-[105px] hover:-translate-y-5 hover:rotate-[-2deg] hover:shadow-[0_12px_22px_rgba(0,0,0,0.5)] sm:w-[54px] sm:hover:w-[115px]"
              style={{
                background: [
                  "linear-gradient(90deg,#6b2925,#a34d3c,#71342c)",
                  "linear-gradient(90deg,#254b43,#3d7764,#254b43)",
                  "linear-gradient(90deg,#283b61,#45649a,#293b60)",
                  "linear-gradient(90deg,#785326,#b0803d,#704c24)",
                  "linear-gradient(90deg,#493052,#80517d,#493052)",
                ][index % 5],
              }}
            >
              <div className="absolute inset-y-2 left-1 right-1 border-y border-white/20 opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-300 group-hover:opacity-0">
                <span className="line-clamp-2 text-center text-[10px] font-bold leading-4 text-amber-50 [writing-mode:vertical-rl]">
                  {book.title}
                </span>
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-t-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  unoptimized
                  sizes="115px"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30" />
            </Link>
          ))}
        </div>

        <div className="relative z-20 h-4 rounded-sm bg-gradient-to-b from-[#c08b4c] via-[#93602e] to-[#5b371e] shadow-[0_8px_12px_rgba(0,0,0,0.5)]" />
        <div className="mx-auto h-3 w-[94%] rounded-b-md bg-[#59391f] shadow-lg" />
      </div>

      <ShelfFloor category={category} />
    </div>
  );
}

async function BookshelfContent() {
  await connection();

  const books = await getBooks();

  const groupedBooks = categories.map((category) => ({
    ...category,
    books: books.filter(
      (book) => book.category?.toLowerCase() === category.name
    ),
  }));

  return (
    <section className="relative overflow-hidden bg-[#17120f] py-20 md:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-amber-600/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 size-96 rounded-full bg-orange-800/10 blur-[110px]" />

      <div className="container-page relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-amber-400">
            ✦ Beyond the ordinary ✦
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold text-amber-50 md:text-5xl">
            The Virtual Library
          </h2>
          <p className="mt-4 leading-7 text-amber-100/60">
            Wander through our collections. Discover a story, explore a world,
            and find your next favorite book.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`#shelf-${category.name}`}
              className="rounded-full border border-amber-100/20 bg-white/[0.04] px-5 py-2.5 text-sm text-amber-100 transition-all hover:border-amber-400 hover:bg-amber-500/15 hover:text-amber-300"
            >
              <span className="mr-2 text-amber-400">{category.icon}</span>
              {category.label}
            </a>
          ))}
        </div>

        {books.length > 0 ? (
          <div className="mx-auto max-w-5xl space-y-14">
            {groupedBooks.map((category) => (
              <BookShelf
                key={category.name}
                category={category.name}
                books={category.books}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-amber-100/60">
            Your library is waiting for its first books.
          </p>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-full border border-amber-500/50 bg-amber-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-950/30 transition hover:bg-amber-500"
          >
            Explore Entire Library <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function VirtualBookshelf() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#17120f] py-20 text-center text-amber-200">
          Preparing your virtual library...
        </div>
      }
    >
      <BookshelfContent />
    </Suspense>
  );
}
