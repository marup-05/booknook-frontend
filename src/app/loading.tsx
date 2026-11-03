
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted ${className}`}
    />
  );
}

function SectionTitle() {
  return (
    <div className="mb-8 space-y-3 text-center">
      <Skeleton className="mx-auto h-8 w-56" />
      <Skeleton className="mx-auto h-4 w-72 max-w-full" />
    </div>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen space-y-20 overflow-hidden pb-16">
      {/* Hero Slider */}
      <section className="container mx-auto px-4 pt-6">
        <div className="grid min-h-[420px] items-center gap-10 rounded-2xl border p-6 md:grid-cols-2 md:p-12">
          <div className="space-y-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-full max-w-lg" />
            <Skeleton className="h-12 w-4/5 max-w-md" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />
            <Skeleton className="h-11 w-36 rounded-full" />
          </div>
          <Skeleton className="h-64 w-full rounded-2xl md:h-80" />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <SectionTitle />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-3 rounded-xl border p-3 md:p-4"
            >
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4">
        <SectionTitle />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4 rounded-xl border p-6">
              <Skeleton className="h-14 w-14 rounded-full" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </section>

      {/* Library Stats */}
      <section className="container mx-auto px-4">
        <div className="rounded-2xl border p-6 md:p-10">
          <SectionTitle />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3 text-center">
                <Skeleton className="mx-auto h-10 w-20" />
                <Skeleton className="mx-auto h-4 w-28 max-w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Bookshelf */}
      <section className="container mx-auto px-4">
        <SectionTitle />

        <div className="space-y-8 rounded-2xl border p-5 md:p-8">
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-9 w-24 rounded-full"
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-4 md:grid-cols-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-36 rounded-t-md sm:h-48"
              />
            ))}
          </div>

          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      </section>
    </main>
  );
}
