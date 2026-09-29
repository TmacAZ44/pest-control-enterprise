import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { serviceAreas } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Service areas",
  description: "Local pest control coverage across Arizona and southern Nevada.",
};

export default function LocationsPage() {
  return (
    <PageShell className="py-12">
      <h1 className="font-display text-4xl">Where we dispatch</h1>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {serviceAreas.map((area) => (
          <li key={area.slug}>
            <Link href={`/locations/${area.slug}`} className="block rounded-lg border border-border bg-card p-5 hover:border-accent">
              <h2 className="font-display text-2xl">
                {area.name}, {area.stateCode}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{area.climateNote}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
