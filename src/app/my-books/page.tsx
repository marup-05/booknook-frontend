
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Pencil, Trash2, X, BookOpen } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
};

function MyBooksContent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadBooks = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Failed to get authentication token.");
        }

        const response = await fetch(`${API_URL}/my-books`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load books");
        }

        setBooks(result);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        toast.error(
          error instanceof Error ? error.message : "Failed to load books",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadBooks();

    return () => controller.abort();
  }, []);

  // Update book (JWT protected)
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingBook) return;

    setSaving(true);

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Failed to get authentication token.");
      }

      const formData = new FormData(event.currentTarget);

      const response = await fetch(`${API_URL}/books/${editingBook._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success(data.message || "Book updated successfully!");

      const updatedBook: Book = data.book || data;

      setBooks((previous) =>
        previous.map((book) =>
          book._id === editingBook._id
            ? { ...book, ...updatedBook }
            : book,
        ),
      );

      setEditingBook(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Delete book (JWT protected)
  const handleDelete = async () => {
    if (!deletingBook || deleting) return;

    setDeleting(true);

    try {
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Failed to get authentication token.");
      }

      const response = await fetch(`${API_URL}/books/${deletingBook._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success(data.message || "Book deleted successfully!");

      setBooks((previous) =>
        previous.filter((book) => book._id !== deletingBook._id),
      );

      setDeletingBook(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="py-20 text-center">Loading your books...</p>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Your collection
        </p>
        <h1 className="mt-2 text-3xl font-bold">My Books</h1>
        <p className="mt-2 text-muted-foreground">
          Manage the books you have added.
        </p>
      </div>

      {books.length === 0 && (
        <div className="rounded-xl border p-12 text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <h2 className="text-xl font-semibold">No books added yet</h2>
          <p className="mt-2 text-muted-foreground">
            Your added books will appear here.
          </p>
        </div>
      )}

      {/* Mobile: book cards */}
      {books.length > 0 && (
        <div className="space-y-4 md:hidden">
          {books.map((book) => (
            <div
              key={book._id}
              className="rounded-xl border bg-card p-4"
            >
              <div className="flex gap-3">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={55}
                  height={70}
                  className="h-[70px] w-[55px] shrink-0 rounded-md object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 font-semibold">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm capitalize text-muted-foreground">
                    {book.category}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Total: {book.totalCopies} · Available:{" "}
                    {book.availableCopies}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEditingBook(book)}
                  className="rounded-lg bg-primary px-3 py-2.5 text-sm text-primary-foreground"
                >
                  <Pencil className="mr-1 inline h-4 w-4" />
                  Edit
                </button>

                <button
                  onClick={() => setDeletingBook(book)}
                  className="rounded-lg bg-destructive px-3 py-2.5 text-sm text-white"
                >
                  <Trash2 className="mr-1 inline h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tablet/Desktop: table */}
      {books.length > 0 && (
        <div className="hidden overflow-x-auto rounded-xl border md:block">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4">Book</th>
                <th className="p-4">Category</th>
                <th className="p-4">Copies</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={book.imageUrl}
                        alt={book.title}
                        width={55}
                        height={70}
                        className="h-[70px] w-[55px] rounded-md object-cover"
                      />
                      <span className="font-semibold">{book.title}</span>
                    </div>
                  </td>

                  <td className="p-4">{book.category}</td>

                  <td className="p-4">
                    <p>Total: {book.totalCopies}</p>
                    <p className="text-sm text-muted-foreground">
                      Available: {book.availableCopies}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingBook(book)}
                        className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                      >
                        <Pencil className="mr-1 inline h-4 w-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeletingBook(book)}
                        className="rounded-lg bg-destructive px-3 py-2 text-sm text-white"
                      >
                        <Trash2 className="mr-1 inline h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={handleUpdate}
            className="max-h-[90vh] w-full max-w-xl space-y-4 overflow-y-auto rounded-xl bg-background p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Book</h2>

              <button
                type="button"
                onClick={() => setEditingBook(null)}
                aria-label="Close edit dialog"
                className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["title", "Book Title", editingBook.title],
                ["author", "Author", editingBook.author],
                ["category", "Category", editingBook.category],
                ["rating", "Rating", editingBook.rating],
                ["totalCopies", "Total Copies", editingBook.totalCopies],
              ].map(([name, label, value]) => (
                <label key={String(name)} className="space-y-1 text-sm">
                  {label}

                  <input
                    name={String(name)}
                    type={
                      name === "rating" || name === "totalCopies"
                        ? "number"
                        : "text"
                    }
                    step={name === "rating" ? "0.1" : undefined}
                    min={
                      name === "rating"
                        ? "0"
                        : name === "totalCopies"
                          ? "1"
                          : undefined
                    }
                    max={name === "rating" ? "5" : undefined}
                    defaultValue={String(value)}
                    required
                    className="w-full rounded-lg border bg-background px-3 py-2"
                  />
                </label>
              ))}
            </div>

            <label className="block space-y-1 text-sm">
              Description

              <textarea
                name="description"
                defaultValue={editingBook.description}
                required
                rows={4}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </label>

            <div className="space-y-2 text-sm">
              <p>Current cover</p>

              <Image
                src={editingBook.imageUrl}
                alt={editingBook.title}
                width={70}
                height={90}
                className="h-[90px] w-[70px] rounded object-cover"
              />

              <label className="block">
                Change cover (optional)

                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="mt-2 block w-full text-sm"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {deletingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm space-y-4 rounded-xl bg-background p-6">
            <h2 className="text-xl font-bold">Delete Book?</h2>

            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete &quot;{deletingBook.title}&quot;?
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingBook(null)}
                disabled={deleting}
                className="rounded-lg border px-4 py-2 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-destructive px-4 py-2 text-white disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const MyBooksPage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="py-20 text-center">Loading your books...</p>;
  }

  if (!session?.user) {
    return <p className="py-20 text-center">Please login to see your books.</p>;
  }

  return <MyBooksContent />;
};

export default MyBooksPage;
