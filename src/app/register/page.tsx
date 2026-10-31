"use client";

import Link from "next/link";
import { PenLine } from "lucide-react";
import Logo from "@/components/logo";

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none";

export default function RegisterPage() {
  return (
    <div className="container-page flex flex-col items-center py-14 md:py-20">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Free forever. Start borrowing books today.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className={FIELD_CLASSES}
              autoComplete="name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={FIELD_CLASSES}
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className={FIELD_CLASSES}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-500 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
          >
            <PenLine className="size-4" aria-hidden="true" />
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-amber-700 underline decoration-amber-400 underline-offset-4 hover:text-amber-800"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
