"use client";

import Link from "next/link";
import { CirclePlus, Trash2 } from "lucide-react";
import PageHeader from "@/components/page-header";
import { ALL_CATEGORIES } from "@/lib/site";

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-border bg-card px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none";

export default function AddBookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Librarian mode"
        title="Add a New Book"
        description="Contribute a title to the BookNook shelves."
      />

      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_20rem]">
        {/* Form (static placeholder) */}
        <form
          className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
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
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="cover"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Cover image URL
              </label>
              <input
                id="cover"
                name="cover"
                type="url"
                placeholder="https://…"
                className={FIELD_CLASSES}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Paste a link to the cover image. Leave empty to use a generated
                placeholder cover.
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
                placeholder="4.5"
                className={FIELD_CLASSES}
              />
            </div>

            <div>
              <label
                htmlFor="pages"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Total Copies 
              </label>
              <input
                id="pages"
                name="pages"
                type="number"
                min={1}
                placeholder="3"
                className={FIELD_CLASSES}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="summary"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Short summary <span className="text-amber-700">*</span>
              </label>
              <textarea
                id="summary"
                name="summary"
                required
                rows={5}
                placeholder="A couple of sentences about the book…"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="reset"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Clear form
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
            >
              <CirclePlus className="size-4" aria-hidden="true" />
              Add to shelves
            </button>
          </div>
        </form>

        {/* Tips sidebar */}
        <aside className="space-y-4">
          <div className="rounded-3xl border border-border/70 bg-linear-to-b from-secondary/60 to-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Tips for a great listing
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                "Use clean metadata: correct title, author and category help readers find your book.",
                "A crisp cover image renders beautifully in the library grid.",
                "Keep summaries short — three sentences is plenty.",
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
              {" "}
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
