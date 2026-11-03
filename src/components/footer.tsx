
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  AtSign,
  Share2,
} from "lucide-react";
import Logo from "@/components/logo";
import CurrentYear from "@/components/current-year";

export default function Footer() {
  return (
    <footer className="border-t border-stone-900 bg-stone-950 text-stone-300">
      <div className="container-page py-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="space-y-2">
            <Logo variant="light" />

            <p className="max-w-xs text-xs leading-5 text-stone-400">
              Discover, borrow, and keep track of your favorite books.
              Every great journey begins with a book.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-xs text-stone-400">
            <a
              href="mailto:hello@booknook.com"
              className="flex items-center gap-2 transition-colors hover:text-amber-400"
            >
              <Mail className="size-3.5 text-amber-500" />
              hello@booknook.com
            </a>

            <a
              href="tel:+15550142867"
              className="flex items-center gap-2 transition-colors hover:text-amber-400"
            >
              <Phone className="size-3.5 text-amber-500" />
              +1 (555) 014-2867
            </a>

            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 shrink-0 text-amber-500" />
              <span>42 Lantern Lane, Ashwick, ON 40219</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 pt-1">
              <a
                href="#"
                aria-label="Facebook"
                className="grid size-7 place-items-center rounded-full border border-stone-800 transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                <Globe className="size-3.5" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="grid size-7 place-items-center rounded-full border border-stone-800 transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                <AtSign className="size-3.5" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="grid size-7 place-items-center rounded-full border border-stone-800 transition-colors hover:border-amber-500 hover:text-amber-400"
              >
                <Share2 className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 border-t border-stone-800 pt-3 text-center text-[11px] text-stone-500">
          © <CurrentYear /> BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
