import Image from "next/image";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SignatureBand } from "@/components/marketing/signature-band";
import { StarRating } from "@/components/marketing/star-rating";
import { features, testimonials } from "@/lib/marketing";

export function HomeSections() {
  return (
    <>
      <section className="bg-white" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading id="features-heading" kicker="Why RevUp" title="A marketing team that already speaks surgery.">
            Boutique support for practices that want growth without sounding like a discount clinic.
          </SectionHeading>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="border border-border bg-card p-6 transition-colors duration-200 hover:border-brand">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-soft text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </article>
              );
            })}
          </div>
          <figure className="mt-14">
            <Image
              src="/instruments-sharp.jpg"
              alt="Surgical instruments arranged on a blue sterile drape"
              width={1280}
              height={720}
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>
      <section className="border-t border-border bg-soft" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading id="proof-heading" kicker="In their words" title="Practices that wanted a partner, not a content mill." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.role} className="flex flex-col border border-border bg-white p-6">
                <StarRating rating={item.rating} />
                <blockquote className="mt-4 font-display text-xl leading-snug text-ink">&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm leading-6 text-muted-foreground">{item.role}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <SignatureBand />
    </>
  );
}
