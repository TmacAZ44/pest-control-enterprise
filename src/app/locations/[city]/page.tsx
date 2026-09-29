import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/features/seo/json-ld";
import { services } from "@/lib/catalog";
import { company } from "@/lib/company";
import { getServiceArea, serviceAreas } from "@/lib/locations";

type LocationPageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) return { title: "Service area" };

  const title = `Pest Control in ${area.name}, ${area.stateCode}`;
  const description = `Licensed emergency and enterprise pest control in ${area.name}, ${area.state}. ${area.climateNote}`;

  return {
    title,
    description,
    keywords: [
      `${area.name} pest control`,
      `emergency pest control ${area.name}`,
      `commercial pest control ${area.name} ${area.stateCode}`,
      `termite inspection ${area.name}`,
      `rodent control ${area.county}`,
      `${area.name} exterminator`,
    ],
    alternates: { canonical: `/locations/${area.slug}` },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url: `/locations/${area.slug}`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const area = getServiceArea(city);
  if (!area) notFound();

  const pageUrl = `${company.siteUrl}/locations/${area.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${company.siteUrl}/#business`,
        name: company.name,
        url: company.siteUrl,
        telephone: company.phoneTel,
        priceRange: "$$",
        image: `${company.siteUrl}/icon`,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.street,
          addressLocality: company.city,
          addressRegion: company.region,
          postalCode: company.postalCode,
          addressCountry: company.country,
        },
        areaServed: {
          "@type": "City",
          name: area.name,
          containedInPlace: { "@type": "AdministrativeArea", name: area.state },
        },
      },
      {
        "@type": "Service",
        name: `Pest control in ${area.name}, ${area.stateCode}`,
        serviceType: "Pest control",
        url: pageUrl,
        areaServed: {
          "@type": "City",
          name: `${area.name}, ${area.stateCode}`,
        },
        provider: { "@id": `${company.siteUrl}/#business` },
        description: area.climateNote,
        offers: services.map((service) => ({
          "@type": "Offer",
          name: `${service.name} pest control in ${area.name}`,
          priceCurrency: "USD",
          price: (service.depositCents / 100).toFixed(2),
          description: service.summary,
        })),
      },
    ],
  };

  return (
    <PageShell className="py-12">
      <JsonLd data={schema} />
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
        {area.county}
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl sm:text-5xl">
        Pest control in {area.name}, {area.stateCode}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{area.climateNote}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={`/estimate?postalCode=${area.sampleZip}`} variant="safety">
          Get a {area.name} inspection quote
        </Button>
        <Button href="/book" variant="outline">
          Book a visit
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Pests we treat in {area.name}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {area.commonPests.map((pest) => (
            <li key={pest} className="rounded-full bg-muted px-3 py-1 text-sm font-semibold">
              {pest}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Neighborhoods on this route</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Crews regularly cover {area.neighborhoods.join(", ")}. Same-day emergency windows are held for{" "}
          {area.name} addresses inside {area.county}.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Programs available in {area.name}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold">{service.name} pest control</h3>
              <p className="mt-1 text-sm text-muted-foreground">{service.summary}</p>
              <Link href={`/book?service=${service.slug}`} className="mt-3 inline-block text-sm font-semibold text-brand">
                Schedule in {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
