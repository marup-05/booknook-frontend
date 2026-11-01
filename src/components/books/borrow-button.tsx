"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookCheck, Ban, Loader2 } from "lucide-react";

type BorrowButtonProps = {
  bookId: string;
  availableCopies: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL 

export default function BorrowButton({
  bookId,
  availableCopies,
}: BorrowButtonProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const unavailable = availableCopies <= 0;

  const handleBorrow = async () => {
    setMessage("");
    setSuccess(false);

    if (!name.trim() || !email.trim()) {
      setMessage("Please enter your name and email.");
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
          borrowerName: name,
          borrowerEmail: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setSuccess(true);
      setMessage("Book borrowed successfully!");
      setName("");
      setEmail("");

      router.refresh();
    } catch (error) {
      console.error("Borrow failed:", error);
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (unavailable) {
    return (
      <button
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-stone-200 px-6 py-4 font-semibold text-stone-500"
      >
        <Ban size={19} />
        Not Available
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {availableCopies === 1 && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Only 1 copy left! Borrow it before it is gone.
        </p>
      )}

      <div className="space-y-3">
        <div>
          <label
            htmlFor="borrowerName"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Your Name
          </label>
          <input
            id="borrowerName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
          />
        </div>

        <div>
          <label
            htmlFor="borrowerEmail"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Your Email
          </label>
          <input
            id="borrowerEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
          />
        </div>
      </div>

      <button
        onClick={handleBorrow}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-700 px-6 py-4 font-semibold text-white shadow-lg shadow-amber-900/10 transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={19} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <BookCheck size={19} />
            Borrow This Book
          </>
        )}
      </button>

      {message && (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${
            success
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
