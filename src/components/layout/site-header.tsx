"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { company } from "@/lib/company";

const links = [
  { href: "/services", label: "Services" },
  { href: "/estimate", label: "Free estimate" },
  { href: "/book", label: "Book" },
  { href: "/locations", label: "Service areas" },
  { href: "/portal", label: "Customer portal" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 sm:text-sm lg:px-8">
          <p>{company.emergency}</p>
          <a className="inline-flex items-center gap-1.5 font-semibold" href={`tel:${company.phoneTel}`}>
            <Phone className="h-3.5 w-3.5" />
            {company.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLockup />
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
