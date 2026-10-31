/**
 * Hand-crafted flat SVG illustrations for the hero slider.
 * One unique book-related scene per slide, each tuned to its slide's palette.
 */

type ArtProps = {
  className?: string;
};

/** Slide 1 — an open book with a reading lamp glow */
export function HeroOpenBook({ className }: ArtProps) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      role="img"
      aria-label="Illustration of an open book"
      className={className}
    >
      {/* glow */}
      <circle cx="210" cy="150" r="120" fill="#fbbf24" opacity="0.08" />
      <circle cx="210" cy="150" r="85" fill="#fbbf24" opacity="0.06" />
      {/* hanging lamp */}
      <line x1="210" y1="0" x2="210" y2="52" stroke="#e7e5e4" strokeWidth="2" opacity="0.5" />
      <path d="M188 52h44l-12 18h-20z" fill="#f59e0b" />
      <circle cx="210" cy="76" r="7" fill="#fde68a" />
      {/* open book */}
      <path
        d="M210 128c-34-22-76-26-112-12v118c36-14 78-10 112 12z"
        fill="#fefce8"
      />
      <path
        d="M210 128c34-22 76-26 112-12v118c-36-14-78-10-112 12z"
        fill="#fef9c3"
      />
      <path d="M210 128v130" stroke="#d6d3d1" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M210 128c-34-22-76-26-112-12"
        stroke="#d6d3d1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M210 128c34-22 76-26 112-12"
        stroke="#d6d3d1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* text lines left page */}
      {[150, 170, 190, 210].map((y, i) => (
        <path
          key={y}
          d={`M118 ${y + 4}c26-8 56-6 76 2`}
          stroke="#44403c"
          strokeOpacity="0.35"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {/* text lines right page */}
      {[150, 170, 190, 210].map((y) => (
        <path
          key={y}
          d={`M302 ${y + 4}c-26-8-56-6-76 2`}
          stroke="#44403c"
          strokeOpacity="0.35"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {/* bookmark */}
      <path d="M296 118v66l14-14 14 14v-70" fill="#f97316" />
      {/* floating sparks */}
      <circle cx="70" cy="80" r="6" fill="#fbbf24" opacity="0.7" />
      <circle cx="352" cy="56" r="5" fill="#fbbf24" opacity="0.55" />
      <circle cx="330" cy="270" r="4" fill="#fbbf24" opacity="0.45" />
      <circle cx="86" cy="264" r="5" fill="#fbbf24" opacity="0.5" />
    </svg>
  );
}

/** Slide 2 — a cosy stack of well-loved books */
export function HeroBookStack({ className }: ArtProps) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      role="img"
      aria-label="Illustration of a stack of books"
      className={className}
    >
      <circle cx="210" cy="170" r="120" fill="currentColor" opacity="0.1" />
      <circle cx="210" cy="170" r="88" fill="currentColor" opacity="0.08" />
      {/* stack bottom to top */}
      <g>
        <rect x="90" y="238" width="240" height="34" rx="8" fill="#f5c04e" />
        <rect x="90" y="238" width="240" height="10" rx="5" fill="#fbbf24" opacity="0.65" />
        <text x="20" y="0" />
        <rect x="106" y="204" width="208" height="30" rx="7" fill="#e668a7" opacity="0.9" />
        <rect x="106" y="204" width="208" height="9" rx="4" fill="#f9a8d4" opacity="0.7" />
        <rect x="120" y="170" width="180" height="30" rx="7" fill="#7dd3fc" opacity="0.9" />
        <rect x="120" y="170" width="180" height="9" rx="4" fill="#bae6fd" opacity="0.7" />
        {/* tilted book leaning on top */}
        <g transform="rotate(-14 214 122)">
          <rect x="150" y="106" width="150" height="28" rx="7" fill="#fda4af" />
          <rect x="150" y="106" width="150" height="9" rx="4" fill="#fecdd3" opacity="0.75" />
        </g>
        {/* glasses resting on the stack */}
        <g stroke="#e7e5e4" strokeWidth="4" strokeLinecap="round" opacity="0.85">
          <circle cx="196" cy="152" r="12" fill="none" />
          <circle cx="228" cy="152" r="12" fill="none" />
          <path d="M208 152c4-4 8-4 12 0" />
        </g>
      </g>
      {/* steam mug beside the stack */}
      <g>
        <rect x="330" y="246" width="38" height="30" rx="6" fill="#e7e5e4" />
        <path d="M368 252h8a6 6 0 0 1 0 16h-8" stroke="#e7e5e4" strokeWidth="4" fill="none" />
        <path d="M340 232c0-6 8-6 8-12m8 12c0-6 8-6 8-12" stroke="#e7e5e4" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
      </g>
      {/* floating leaves/stars */}
      <path d="M80 92c8-14 26-14 34 0-8 14-26 14-34 0z" fill="#f472b6" opacity="0.7" />
      <circle cx="352" cy="88" r="5" fill="#fbbf24" opacity="0.6" />
      <circle cx="58" cy="200" r="4" fill="#f472b6" opacity="0.55" />
      <circle cx="356" cy="176" r="6" fill="#f472b6" opacity="0.4" />
    </svg>
  );
}

/** Slide 3 — a tidy personal bookshelf */
export function HeroShelf({ className }: ArtProps) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      role="img"
      aria-label="Illustration of a bookshelf"
      className={className}
    >
      <circle cx="210" cy="160" r="120" fill="currentColor" opacity="0.1" />
      <circle cx="210" cy="160" r="88" fill="currentColor" opacity="0.08" />
      {/* shelf frames */}
      <rect x="70" y="118" width="280" height="10" rx="4" fill="#d6d3d1" opacity="0.85" />
      <rect x="70" y="240" width="280" height="10" rx="4" fill="#d6d3d1" opacity="0.85" />
      {/* top row books */}
      <g>
        <rect x="88" y="60" width="26" height="58" rx="4" fill="#fbbf24" />
        <rect x="120" y="52" width="26" height="66" rx="4" fill="#f472b6" />
        <rect x="152" y="64" width="26" height="54" rx="4" fill="#7dd3fc" />
        {/* tilted book leaning */}
        <g transform="rotate(16 208 118)">
          <rect x="196" y="60" width="26" height="58" rx="4" fill="#a5b4fc" />
        </g>
        <rect x="238" y="56" width="26" height="62" rx="4" fill="#86efac" />
      </g>
      {/* bottom row books + small plant */}
      <g>
        <rect x="88" y="182" width="30" height="58" rx="4" fill="#f97316" />
        <rect x="124" y="174" width="30" height="66" rx="4" fill="#e879f9" opacity="0.9" />
        <rect x="160" y="184" width="30" height="56" rx="4" fill="#38bdf8" />
        <rect x="196" y="176" width="30" height="64" rx="4" fill="#fde047" />
        {/* plant pot */}
        <rect x="296" y="216" width="36" height="24" rx="5" fill="#ef4444" opacity="0.85" />
        <path
          d="M314 214c-2-16-14-20-18-32 12 0 16 6 18 12 2-6 6-12 18-12-4 12-16 16-18 32z"
          fill="#4ade80"
        />
      </g>
      {/* ticker dots */}
      <circle cx="86" cy="30" r="4" fill="#fbbf24" opacity="0.6" />
      <circle cx="334" cy="36" r="5" fill="#fbbf24" opacity="0.5" />
      <circle cx="352" cy="286" r="4" fill="#fbbf24" opacity="0.45" />
      <circle cx="64" cy="286" r="5" fill="#fbbf24" opacity="0.5" />
    </svg>
  );
}
