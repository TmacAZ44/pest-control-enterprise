import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { InquireCta } from "@/components/marketing/signature-band";
import { offerings } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand, websites, patient acquisition, referrals, education, and market expansion for surgical practices.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.7fr] lg:px-8 lg:py-20">
          <div>
            <p className="font-script text-4xl leading-none text-script sm:text-5xl">What we do</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">Programs for surgical growth.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Six focused offers. Each one is built for a practice that would rather be precise than loud.
            </p>
          </div>
          <Image
            src="/services-clinic.jpg"
            alt="A surgeon in a bright clinic hallway"
            width={864}
            height={1152}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
      <section className="bg-white" aria-labelledby="offerings-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 id="offerings-heading" className="sr-only">
            Service offerings
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {offerings.map((offering) => {
              const Icon = offering.icon;
              return (
                <article key={offering.title} className="border border-border bg-card p-6 sm:p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-soft text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-ink">{offering.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{offering.description}</p>
                  <ul className="mt-4 space-y-2">
                    {offering.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-6 text-ink">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <InquireCta />
    </>
  );
}
