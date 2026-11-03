
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookCheck, Ban, Loader2, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";

type BorrowButtonProps = {
  bookId: string;
  availableCopies: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BorrowButton({
  bookId,
  availableCopies,
}: BorrowButtonProps) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const unavailable = availableCopies <= 0;

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";

  const handleOpenForm = () => {
    if (isPending) return;

    if (!session?.user) {
      toast.error("Please login before borrowing a book.");
      router.push(
        `/login?callbackURL=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    setShowForm(true);
  };

  const handleBorrow = async () => {
    if (!session?.user || !userEmail) {
      toast.error("Please login before borrowing a book.");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/borrow/${bookId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Something went wrong.";

        if (
          response.status === 409 &&
          errorMessage.toLowerCase().includes("already borrowed")
        ) {
          toast.warning("You have already borrowed this book!");
        } else {
          toast.error(errorMessage);
        }

        return;
      }

      toast.success("Book borrowed successfully!");

      setShowForm(false);
      router.refresh();
    } catch (error) {
      console.error("Borrow failed:", error);
      toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (unavailable) {
    return (
      <button
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-stone-200 px-5 py-3 text-sm font-semibold text-stone-500"
      >
        <Ban size={18} />
        Not Available
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {availableCopies === 1 && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
          Only 1 copy left! Borrow it before it is gone.
        </p>
      )}

      {!showForm ? (
        <button
          onClick={handleOpenForm}
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <BookCheck size={18} />
          )}
          Borrow This Book
        </button>
      ) : (
        <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900">
              Borrower Information
            </h3>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full p-1 text-stone-500 transition hover:bg-stone-100"
              aria-label="Close borrow form"
            >
              <X size={18} />
            </button>
          </div>

          <div>
            <label
              htmlFor="borrowerName"
              className="mb-1.5 block text-xs font-semibold text-stone-700"
            >
              Your Name
            </label>

            <input
              id="borrowerName"
              type="text"
              value={userName}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-stone-200 bg-stone-100 px-3 py-2.5 text-sm text-stone-600 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="borrowerEmail"
              className="mb-1.5 block text-xs font-semibold text-stone-700"
            >
              Your Email
            </label>

            <input
              id="borrowerEmail"
              type="email"
              value={userEmail}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-stone-200 bg-stone-100 px-3 py-2.5 text-sm text-stone-600 outline-none"
            />
          </div>

          <button
            onClick={handleBorrow}
            disabled={loading || !userEmail}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <BookCheck size={18} />
                Confirm Borrow
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
