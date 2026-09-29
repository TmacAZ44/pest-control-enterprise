import Link from "next/link";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { company } from "@/lib/company";
import { serviceAreas } from "@/lib/locations";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <BrandLockup inverted />
          <p className="mt-3 max-w-xs text-sm text-brand-foreground/80">{company.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Visit</p>
          <p className="mt-3 text-sm leading-6 text-brand-foreground/80">
            {company.street}
            <br />
            {company.city}, {company.region} {company.postalCode}
            <br />
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">Service areas</p>
          <ul className="mt-3 space-y-1 text-sm">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/locations/${area.slug}`} className="text-brand-foreground/80 hover:text-brand-foreground">
                  {area.name}, {area.stateCode}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
