import { cn } from "@/lib/utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-sm outline-none focus:border-accent",
        className,
      )}
      {...props}
    />
  );
}
