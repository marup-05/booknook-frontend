import Link from "next/link";
import { AtSign, Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";
import Logo from "@/components/logo";
import CurrentYear from "@/components/current-year";
import { BOOK_CATEGORIES, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-stone-900 bg-stone-950 text-stone-300">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-stone-400">
              A cozy corner of the internet for readers, borrowers and
              book-hoarders. Discover, borrow, and keep track — all in one
              nook.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                aria-label="BookNook on Facebook"
                className="grid size-9 place-items-center rounded-full border border-stone-800 text-stone-400 transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                <Globe className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="BookNook on Twitter"
                className="grid size-9 place-items-center rounded-full border border-stone-800 text-stone-400 transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                <AtSign className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="BookNook on Instagram"
                className="grid size-9 place-items-center rounded-full border border-stone-800 text-stone-400 transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                <Share2 className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-50">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-50">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {BOOK_CATEGORIES.map((category) => (
                <li key={category.label}>
                  <Link
                    href="/books"
                    className="text-stone-400 transition-colors hover:text-amber-400"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-50">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-amber-500"
                  aria-hidden="true"
                />
                <a
                  href="mailto:hello@booknook.com"
                  className="transition-colors hover:text-amber-400"
                >
                  hello@booknook.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-amber-500"
                  aria-hidden="true"
                />
                <a
                  href="tel:+15550142867"
                  className="transition-colors hover:text-amber-400"
                >
                  +1 (555) 014-2867
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-amber-500"
                  aria-hidden="true"
                />
                <span>
                  42 Lantern Lane
                  <br />
                  Ashwick, ON 40219
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-stone-800 pt-6 text-xs text-stone-500 sm:flex-row">
          <p>© <CurrentYear /> BookNook. All rights reserved.</p>
          <p>
            Made with <span className="text-amber-500">♥</span> for readers
            everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
