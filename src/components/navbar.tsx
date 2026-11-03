
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, X, UserRound } from "lucide-react";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";

function NavbarContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const visibleLinks = isLoggedIn
    ? NAV_LINKS
    : NAV_LINKS.filter(
        (link) => link.href === "/" || link.href === "/books"
      );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="items-center gap-1 lg:flex">
          {!isPending &&
            visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />

          {!isPending &&
            (isLoggedIn ? (
              <Link
                href="/profile"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors",
                  "bg-amber-500 text-stone-950 hover:bg-amber-400"
                )}
              >
                <UserRound className="size-4" />
                Profile
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <LogIn className="size-4" aria-hidden="true" />
                  Login
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm transition-colors hover:bg-amber-400"
                >
                  Register
                </Link>
              </>
            ))}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted"
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/70 bg-background/95 backdrop-blur-md lg:hidden">
          <nav
            aria-label="Mobile"
            className="container-page flex flex-col gap-1 py-3"
          >
            {!isPending &&
              visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

            {!isPending && isLoggedIn && (
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive("/profile")
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                Profile
              </Link>
            )}

            {!isPending && !isLoggedIn && (
              <>
                <div className="my-2 h-px bg-border/70" aria-hidden="true" />

                <div className="flex gap-2 pb-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-full bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 md:h-[4.5rem]" />}>
      <NavbarContent />
    </Suspense>
  );
}
