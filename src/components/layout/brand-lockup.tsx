import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const logo = {
  src: "/revup-logo.jpg",
  width: 1024,
  height: 682,
  alt: "RevUp Consulting Arizona, healthcare marketing. More patients. Stronger practices. Greater impact.",
};

const frames = {
  header: "h-24 w-36 sm:h-32 sm:w-48",
  footer: "h-auto w-full",
};

export function BrandLockup({
  className,
  size = "header",
  onClick,
}: {
  className?: string;
  size?: keyof typeof frames;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "rounded-sm",
        size === "footer" ? "mx-auto flex w-full max-w-sm sm:max-w-md" : "inline-flex",
        className,
      )}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={size === "header"}
        className={frames[size]}
      />
    </Link>
  );
}
