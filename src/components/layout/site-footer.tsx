import Link from "next/link";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { company } from "@/lib/company";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="bg-white px-4 py-8 text-center sm:py-10">
        <BrandLockup size="footer" className="justify-center" />
      </div>
      <div className="bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 text-xs sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-semibold tracking-[0.16em] uppercase">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-opacity duration-200 hover:opacity-80">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-center">
            <a href={`tel:${company.phoneTel}`} className="hover:underline">
              {company.phoneDisplay}
            </a>
            <span aria-hidden> · </span>
            <a href={`mailto:${company.email}`} className="hover:underline">
              {company.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
