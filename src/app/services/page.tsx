import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/catalog";
import { formatUsd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pest control services",
  description: "Residential, commercial, termite, rodent, and wildlife programs with scheduled reporting.",
};

export default function ServicesPage() {
  return (
    <PageShell className="py-12">
      <h1 className="font-display text-4xl">Service programs</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every program includes a written report. Deposits below are applied to the first invoice.
      </p>
      <div className="mt-8 grid gap-4">
        {services.map((service) => (
          <article key={service.slug} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="font-display text-2xl">{service.name}</h2>
              <p className="text-sm font-semibold">{formatUsd(service.depositCents)} deposit</p>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{service.summary}</p>
            <div className="mt-4 flex gap-3">
              <Button href={`/book?service=${service.slug}`} variant="accent" size="sm">
                Book
              </Button>
              <Link href="/estimate" className="self-center text-sm font-semibold">
                Estimate first
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
