"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CirclePlus, Trash2, Loader2 } from "lucide-react";

import PageHeader from "@/components/page-header";
import { ALL_CATEGORIES } from "@/lib/site";

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-border bg-card px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddBookPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const totalCopies = Number(formData.get("totalCopies"));
    const rating = Number(formData.get("rating") || 0);

    const bookData = {
      title: String(formData.get("title")).trim(),
      author: String(formData.get("author")).trim(),
      category: String(formData.get("category")),
      imageUrl: String(formData.get("imageUrl")).trim(),
      rating,
      totalCopies,
      availableCopies: totalCopies,
      description: String(formData.get("description")).trim(),

      // Temporary values until Better Auth is connected
      addedByName: "Rahman Marup",
      addedByEmail: "rahmanmarup05@gmail.com",
    };

    try {
      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${API_URL}/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Failed to add book. Please try again.");
      }

      router.push("/books");
      router.refresh();
    } catch (err) {
      console.error("Add book error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );

      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Librarian mode"
        title="Add a New Book"
        description="Contribute a title to the BookNook shelves."
      />

      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_20rem]">
        {/* Add Book Form */}
        <form
          className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Book Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Book title <span className="text-amber-700">*</span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                minLength={2}
                placeholder="e.g. The Midnight Library"
                className={FIELD_CLASSES}
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Author name <span className="text-amber-700">*</span>
              </label>

              <input
                id="author"
                name="author"
                type="text"
                required
                placeholder="e.g. Matt Haig"
                className={FIELD_CLASSES}
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Category <span className="text-amber-700">*</span>
              </label>

              <select
                id="category"
                name="category"
                required
                defaultValue={ALL_CATEGORIES[0]}
                className={FIELD_CLASSES}
              >
                {ALL_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover Image */}
            <div className="sm:col-span-2">
              <label
                htmlFor="imageUrl"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Cover image URL <span className="text-amber-700">*</span>
              </label>

              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                required
                placeholder="https://example.com/book-cover.jpg"
                className={FIELD_CLASSES}
              />

              <p className="mt-1.5 text-xs text-muted-foreground">
                Paste a valid link to the book cover image.
              </p>
            </div>

            {/* Rating */}
            <div>
              <label
                htmlFor="rating"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Rating (0–5)
              </label>

              <input
                id="rating"
                name="rating"
                type="number"
                min={0}
                max={5}
                step="0.1"
                defaultValue={0}
                placeholder="4.5"
                className={FIELD_CLASSES}
              />
            </div>

            {/* Total Copies */}
            <div>
              <label
                htmlFor="totalCopies"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Total Copies <span className="text-amber-700">*</span>
              </label>

              <input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min={1}
                step={1}
                required
                placeholder="e.g. 5"
                className={FIELD_CLASSES}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Short summary <span className="text-amber-700">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                required
                minLength={10}
                rows={5}
                placeholder="Write a short description about the book..."
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Form Buttons */}
          <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="reset"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Clear form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Adding Book...
                </>
              ) : (
                <>
                  <CirclePlus className="size-4" aria-hidden="true" />
                  Add to shelves
                </>
              )}
            </button>
          </div>
        </form>

        {/* Tips Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-3xl border border-border/70 bg-linear-to-b from-secondary/60 to-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Tips for a great listing
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                "Use the correct book title, author and category.",
                "Add a valid cover image URL for a beautiful book card.",
                "Keep the book summary short and informative.",
                "Enter the correct number of available copies.",
              ].map((tip) => (
                <li key={tip} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6">
            <p className="text-sm leading-relaxed text-foreground">
              Need to check something first?{" "}
              <Link
                href="/books"
                className="font-medium text-amber-700 underline decoration-amber-400 underline-offset-4 hover:text-amber-800"
              >
                Browse the library
              </Link>{" "}
              to see if the book is already listed.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}