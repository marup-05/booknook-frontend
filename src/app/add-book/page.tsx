"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CirclePlus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "@/components/page-header";
import { ALL_CATEGORIES } from "@/lib/site";
import { authClient } from "@/lib/auth-client";

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-border bg-card px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (isPending || loading) return;

    if (!session?.user?.email) {
      router.push(
        `/login?callbackURL=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedImage = formData.get("image");

    if (!(selectedImage instanceof File) || selectedImage.size === 0) {
      setError("Please select a book cover image.");
      return;
    }

    setLoading(true);

    try {
      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      // Get JWT token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Failed to get authentication token.");
      }

      const response = await fetch(`${API_URL}/add-book`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book.");
      }

      toast.success("Book added successfully!", {
        description: "Your book has been added to the library.",
      });

      router.push("/books");
    } catch (err) {
      console.error("Add book error:", err);

      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
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
        <form
          className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 rounded-2xl border border-border/70 bg-muted/30 p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Added By
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="addedByName"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  User Name
                </label>
                <input
                  id="addedByName"
                  type="text"
                  value={isPending ? "Loading..." : userName}
                  readOnly
                  className={`${FIELD_CLASSES} cursor-not-allowed opacity-75`}
                />
              </div>

              <div>
                <label
                  htmlFor="addedByEmail"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  User Email
                </label>
                <input
                  id="addedByEmail"
                  type="email"
                  value={isPending ? "Loading..." : userEmail}
                  readOnly
                  className={`${FIELD_CLASSES} cursor-not-allowed opacity-75`}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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

            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Book Image <span className="text-amber-700">*</span>
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                className={`${FIELD_CLASSES} cursor-pointer py-2`}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Select a book cover image from your device. Maximum size: 5 MB.
              </p>
            </div>

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

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="reset"
              disabled={loading || isPending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Clear form
            </button>

            <button
              type="submit"
              disabled={loading || isPending}
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

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border/70 bg-linear-to-b from-secondary/60 to-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Tips for a great listing
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                "Use the correct book title, author and category.",
                "Select a clear book cover image from your device.",
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
