import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-accent",
        className,
      )}
      {...props}
    />
  );
}
