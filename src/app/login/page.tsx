"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import Logo from "@/components/logo";
import { authClient } from "@/lib/auth-client";

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const getCallbackURL = () => {
    const params = new URLSearchParams(window.location.search);

    const callbackURL =
      params.get("callbackURL") ||
      params.get("callbackUrl") ||
      params.get("redirect") ||
      "/";

    // Only allow internal application routes.
    return callbackURL.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: getCallbackURL(),
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Login successful!");

      router.push(getCallbackURL());
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: getCallbackURL(),
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="container-page flex flex-col items-center py-10 sm:py-14 md:py-20">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-10">
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

        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
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

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className={`${FIELD_CLASSES} pr-12`}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-stone-950 text-sm font-semibold text-amber-50 transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="size-4" aria-hidden="true" />
                Log in
              </>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
          className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-full border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGoogleLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="size-5"
              aria-hidden="true"
            >
              <path
                fill="#FFC107"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.9 6-15Z"
              />
              <path
                fill="#FF3D00"
                d="M24 44c5.4 0 10-1.8 13.4-4.9l-6.7-5.1c-1.8 1.2-4 1.9-6.7 1.9-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3C9.2 37.6 16 44 24 44Z"
              />
              <path
                fill="#4CAF50"
                d="M12.8 27.7a12 12 0 0 1 0-7.4V15H5.9a20 20 0 0 0 0 18Z"
              />
              <path
                fill="#1976D2"
                d="M24 12.1c2.9 0 5.5 1 7.6 3.1l5.7-5.7C33.9 6.1 29.4 4 24 4 16 4 9.2 8.4 5.9 15l6.9 5.3c1.6-4.7 6-8.2 11.2-8.2Z"
              />
            </svg>
          )}

          {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

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
