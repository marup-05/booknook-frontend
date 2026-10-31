import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="container-page pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-700 px-6 py-16 text-center md:px-16 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(500px 320px at 85% 15%, rgba(251, 191, 36, 0.18), transparent 70%), radial-gradient(420px 300px at 10% 90%, rgba(16, 185, 129, 0.25), transparent 70%)",
          }}
        />
        <div className="relative">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-amber-300">
            Start exploring
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-bold text-white md:text-4xl">
            Ready to curl up with a good book?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Wander the shelves, find a story that sticks with you, and
            borrow it in a single click.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/books"
              className="inline-flex h-12 items-center rounded-full bg-amber-500 px-7 text-sm font-semibold text-stone-950 shadow-lg shadow-emerald-950/40 transition-colors hover:bg-amber-400"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
