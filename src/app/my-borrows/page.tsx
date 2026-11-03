"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { BookOpen, RotateCcw } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Borrow = {
  _id: string;
  bookTitle: string;
  bookImage?: string;
  borrowDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
  overdue: boolean;
};

function MyBorrowsContent() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadBorrows = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Failed to get authentication token. Please login again.");
        }

        const response = await fetch(`${API_URL}/my-borrows`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load borrows");
        }

        setBorrows(result);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        toast.error(
          error instanceof Error ? error.message : "Failed to load borrows",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadBorrows();

    return () => controller.abort();
  }, []);

  const handleReturn = async (borrowId: string) => {
    setReturningId(borrowId);

    try {
      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Unable to get authentication token. Please login again.");
      }

      const response = await fetch(`${API_URL}/return/${borrowId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to return book.");
      }

      toast.success(data.message || "Book returned successfully!");

      setBorrows((previous) =>
        previous.map((borrow) =>
          borrow._id === borrowId
            ? { ...borrow, status: "returned", overdue: false }
            : borrow,
        ),
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Return failed");
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return <p className="py-20 text-center">Loading your borrows...</p>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Borrowing history
        </p>
        <h1 className="mt-2 text-3xl font-bold">My Borrows</h1>
        <p className="mt-2 text-muted-foreground">
          Keep track of your borrowed books and return dates.
        </p>
      </div>

      {borrows.length === 0 && (
        <div className="rounded-xl border p-12 text-center">
          <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <h2 className="text-xl font-semibold">No borrowed books</h2>
          <p className="mt-2 text-muted-foreground">
            Books you borrow will appear here.
          </p>
        </div>
      )}

      {borrows.length > 0 && (
        <div className="space-y-4 md:hidden">
          {borrows.map((borrow) => (
            <div key={borrow._id} className="rounded-xl border bg-card p-4">
              <div className="flex gap-3">
                {borrow.bookImage ? (
                  <Image
                    src={borrow.bookImage}
                    alt={borrow.bookTitle}
                    width={50}
                    height={65}
                    className="h-[65px] w-[50px] shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-[65px] w-[50px] shrink-0 items-center justify-center rounded bg-muted">
                    <BookOpen />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 font-semibold">
                    {borrow.bookTitle}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Borrowed:{" "}
                    {borrow.borrowDate
                      ? new Date(borrow.borrowDate).toLocaleDateString()
                      : "—"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Return by:{" "}
                    {borrow.returnDate
                      ? new Date(borrow.returnDate).toLocaleDateString()
                      : "—"}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    {borrow.status === "returned" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Returned
                      </span>
                    ) : borrow.overdue ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        Overdue
                      </span>
                    ) : (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        Borrowed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {borrow.status === "borrowed" && (
                <button
                  onClick={() => handleReturn(borrow._id)}
                  disabled={returningId === borrow._id}
                  className="mt-4 w-full whitespace-nowrap rounded-lg bg-primary px-3 py-2.5 text-sm text-primary-foreground disabled:opacity-50"
                >
                  <RotateCcw className="mr-1 inline h-4 w-4" />
                  {returningId === borrow._id
                    ? "Returning..."
                    : "Return Book"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {borrows.length > 0 && (
        <div className="hidden overflow-x-auto rounded-xl border md:block">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4">Book</th>
                <th className="p-4">Borrow Date</th>
                <th className="p-4">Return Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {borrow.bookImage ? (
                        <Image
                          src={borrow.bookImage}
                          alt={borrow.bookTitle}
                          width={50}
                          height={65}
                          className="h-[65px] w-[50px] rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-[65px] w-[50px] items-center justify-center rounded bg-muted">
                          <BookOpen />
                        </div>
                      )}

                      <span className="font-semibold">
                        {borrow.bookTitle}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    {borrow.borrowDate
                      ? new Date(borrow.borrowDate).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-4">
                    {borrow.returnDate
                      ? new Date(borrow.returnDate).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-4">
                    {borrow.status === "returned" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Returned
                      </span>
                    ) : borrow.overdue ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        Overdue
                      </span>
                    ) : (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        Borrowed
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    {borrow.status === "borrowed" ? (
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        disabled={returningId === borrow._id}
                        className="whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground disabled:opacity-50"
                      >
                        <RotateCcw className="mr-1 inline h-4 w-4" />
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </button>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

const MyBorrowsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p className="py-20 text-center">Loading your borrows...</p>;
  }

  if (!session?.user) {
    return <p className="py-20 text-center">Please login to see your borrows.</p>;
  }

  return <MyBorrowsContent />;
};

export default MyBorrowsPage;
