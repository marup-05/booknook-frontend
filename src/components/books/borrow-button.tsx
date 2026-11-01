
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookCheck, Ban, Loader2, X } from "lucide-react";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const unavailable = availableCopies <= 0;

  const handleBorrow = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/borrow/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          borrowerName: name.trim(),
          borrowerEmail: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Something went wrong.";

        // Duplicate borrow check
        if (
          response.status === 409 ||
          errorMessage.toLowerCase().includes("already borrowed")
        ) {
          toast.warning("You have already borrowed this book with this email!");
        } else {
          toast.error(errorMessage);
        }

        return;
      }

      toast.success("Book borrowed successfully!");

      setName("");
      setEmail("");
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
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          <BookCheck size={18} />
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <button
            onClick={handleBorrow}
            disabled={loading}
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
