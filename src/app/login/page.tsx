"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import Logo from "@/components/logo";

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none";

export default function LoginPage() {
  return (
    <div className="container-page flex flex-col items-center py-14 md:py-20">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to borrow books and visit your nook.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
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
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs font-medium text-amber-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className={FIELD_CLASSES}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-stone-950 text-sm font-semibold text-amber-50 transition-colors hover:bg-stone-800"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to BookNook?{" "}
          <Link
            href="/register"
            className="font-medium text-amber-700 underline decoration-amber-400 underline-offset-4 hover:text-amber-800"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
