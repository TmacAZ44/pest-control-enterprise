import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        safety: "bg-safety text-safety-foreground hover:bg-safety/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-4",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonStyle = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonStyle &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkButtonProps = ButtonStyle &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function Button({ className, variant, size, ...props }: ButtonProps | LinkButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return <Link href={href} className={classes} {...linkProps} />;
  }

  return <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
