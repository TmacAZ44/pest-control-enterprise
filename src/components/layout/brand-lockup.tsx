import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";

export function BrandLockup({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt=""
        width={44}
        height={44}
        priority
        className="h-11 w-11 rounded-md bg-white object-contain"
      />
      <span className={cn("font-display text-xl leading-none tracking-tight", inverted && "text-white")}>
        {company.name}
      </span>
    </Link>
  );
}
