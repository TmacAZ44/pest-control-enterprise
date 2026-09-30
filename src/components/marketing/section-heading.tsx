import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  children,
  align = "left",
  id,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      <p className="font-script text-4xl leading-none text-script sm:text-5xl">{kicker}</p>
      <h2 id={id} className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {children ? <p className="mt-4 text-base leading-7 text-muted-foreground">{children}</p> : null}
    </div>
  );
}
