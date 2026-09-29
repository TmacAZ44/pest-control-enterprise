import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/layout/page-shell";
import { services } from "@/lib/catalog";
import { serviceAreas } from "@/lib/locations";

const steps = [
  { title: "Tell us the property", copy: "ZIP code, pest pressure, and whether the site is a home or a facility." },
  { title: "Get a clear range", copy: "The estimator prices the visit and the annual plan before anyone comes out." },
  { title: "Book a licensed tech", copy: "Pick an open slot and place a deposit that applies to the invoice." },
];

export function HomeSections() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <PageShell className="grid gap-6 py-8 sm:grid-cols-3">
          {[
            ["Same day", "Emergency windows across the metro"],
            ["Documented", "Service reports your auditors can file"],
            ["Multi-site", "One portal for every property you manage"],
          ].map(([title, copy]) => (
            <div key={title}>
              <p className="font-display text-2xl">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </PageShell>
      </section>

      <section className="py-16">
        <PageShell>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Services</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Programs built for the property, not a generic spray.</h2>
            </div>
            <Button href="/services" variant="outline" className="hidden sm:inline-flex">
              All services
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.slug} className="p-5 shadow-none">
                <h3 className="font-display text-2xl">{service.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.summary}</p>
                <Link href={`/book?service=${service.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand">
                  Book {service.name.toLowerCase()}
                </Link>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <section className="bg-muted/70 py-16">
        <PageShell>
          <h2 className="font-display text-3xl sm:text-4xl">How a new account starts</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-border bg-card p-5">
                <p className="text-sm font-semibold text-brand">0{index + 1}</p>
                <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/estimate" variant="safety" size="lg">
              Build an estimate
            </Button>
            <Button href="/book" variant="outline" size="lg">
              Schedule service
            </Button>
          </div>
        </PageShell>
      </section>

      <section className="py-16">
        <PageShell>
          <h2 className="font-display text-3xl sm:text-4xl">Local crews, named cities</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Each service-area page is written for the pests and properties in that city, with local business schema for search.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/locations/${area.slug}`}
                  className="inline-flex rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold hover:border-accent"
                >
                  {area.name}, {area.stateCode}
                </Link>
              </li>
            ))}
          </ul>
        </PageShell>
      </section>
    </>
  );
}
