import Link from "next/link";
import { cn } from "cn";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

/**
 * BookNook logo — a small open-book icon beside the wordmark.
 * Used consistently in the Navbar and Footer.
 */
export default function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="BookNook — back to homepage"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4",
        className
      )}
      data-variant={variant}
    >
      {/* Open book icon */}
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-500 text-stone-950 shadow-sm">
        <svg
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 5.5C4 4.5 6.5 4.5 11 5.5v13C6.5 17.5 4 17.5 2 18.5z" />
          <path d="M22 5.5c-2-1-4.5-1-9 0v13c4.5-1 7-1 9 0z" />
        </svg>
      </span>

      <span
        className={cn(
          "font-serif text-xl leading-none font-bold tracking-tight sm:text-2xl",
          variant === "dark" ? "text-foreground" : "text-amber-50"
        )}
      >
        Book<span className="text-amber-600">Nook</span>
      </span>
    </Link>
  );
}
