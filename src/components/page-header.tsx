type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="border-b border-border/60 bg-linear-to-b from-secondary/70 via-secondary/30 to-background">
      <div className="container-page py-14 text-center md:py-20">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-amber-700">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
