export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-script text-4xl leading-none text-script sm:text-5xl">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
        <div className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{children}</div>
      </div>
    </section>
  );
}
