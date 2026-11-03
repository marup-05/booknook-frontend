
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PenLine,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validatePassword = () => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    return null;
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const passwordError = validatePassword();

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoURL.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Registration successful! Please login.");

      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
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
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Free forever. Start borrowing books today.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={FIELD_CLASSES}
              autoComplete="name"
            />
          </div>

          {/* Email */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={FIELD_CLASSES}
              autoComplete="email"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photoURL"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Photo URL
            </label>

            <input
              id="photoURL"
              name="photoURL"
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className={FIELD_CLASSES}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={`${FIELD_CLASSES} pr-12`}
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Must contain uppercase, lowercase and at least 6 characters.
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-500 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <PenLine className="size-4" />
                Register
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-full"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <svg
              className="mr-2 size-5"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.01 13.22l7.98 6.19C12.88 13.72 18.02 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.77 7.18l7.73 6C44.41 37.8 46.98 31.77 46.98 24.55Z"
              />
              <path
                fill="#FBBC05"
                d="M10.99 28.59A14.4 14.4 0 0 1 10.22 24c0-1.6.27-3.15.77-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l8.41-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.87 2.3-8.17 2.3-5.98 0-11.12-4.22-13.01-9.91l-8.41 6.19C6.51 43.62 14.62 48 24 48Z"
              />
            </svg>
          )}

          {googleLoading ? "Connecting..." : "Continue with Google"}
        </Button>

        {/* Login Link */}
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
