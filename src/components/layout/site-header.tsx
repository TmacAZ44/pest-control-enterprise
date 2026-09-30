"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLockup onClick={close} />
        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200",
                    active ? "text-brand" : "text-ink hover:text-brand",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Button
            href="/contact"
            size="sm"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="h-10 rounded-sm px-4 text-[0.68rem] tracking-[0.2em] uppercase hover:bg-brand-strong"
          >
            Contact
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn("border-t border-border px-4 py-3 md:hidden", !open && "hidden")}
      >
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              onClick={close}
              className={cn(
                "block py-3 text-sm font-semibold tracking-[0.16em] uppercase",
                active ? "text-brand" : "text-ink",
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <Button href="/contact" onClick={close} className="mt-2 w-full rounded-sm text-xs tracking-[0.18em] uppercase hover:bg-brand-strong">
          Contact
        </Button>
      </nav>
    </header>
  );
}
