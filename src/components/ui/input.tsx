import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-accent";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}
