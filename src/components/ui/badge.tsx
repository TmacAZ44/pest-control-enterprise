import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "accent" | "safety" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        tone === "neutral" && "border-border bg-card text-foreground",
        tone === "accent" && "border-transparent bg-accent text-accent-foreground",
        tone === "safety" && "border-transparent bg-safety text-safety-foreground",
        className,
      )}
      {...props}
    />
  );
}
