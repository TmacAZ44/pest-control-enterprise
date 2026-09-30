import type { Metadata } from "next";
import Image from "next/image";
import { InquireCta } from "@/components/marketing/signature-band";
import { PageIntro } from "@/components/marketing/page-intro";
import { values } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "RevUp Consulting Arizona is a Scottsdale marketing studio for surgical practices. Boutique attention, clinical respect, and growth you can measure.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker="Our story" title="Boutique marketing for surgical excellence.">
        RevUp Consulting Arizona partners with surgical practices that want to grow without sounding like a commodity clinic.
        We are based in Scottsdale and work with practices nationwide.
      </PageIntro>
      <section className="border-b border-border" aria-labelledby="mission-heading">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <h2 id="mission-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Your focus is saving lives.
              <span className="mt-2 block font-script text-4xl leading-none font-normal text-script sm:text-5xl">
                Ours is growing the practice around that work.
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
              <p>
                Most healthcare marketing is written for volume. Surgical practices live with a different standard: the
                right patient, the right case, and a referral relationship that lasts longer than a campaign.
              </p>
              <p>
                RevUp is a small studio. We learn the procedure, the way the practice already speaks, and the path from
                first inquiry to the consult. Then we build the brand, the site, and the programs that carry that story.
              </p>
            </div>
          </div>
          <Image
            src="/about-consult.jpg"
            alt="A surgeon and a colleague meeting in a bright office"
            width={864}
            height={1152}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
      <section className="bg-white" aria-labelledby="values-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 id="values-heading" className="font-display text-3xl text-ink sm:text-4xl">
            How we work
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="border border-border bg-card p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-soft text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{value.description}</p>
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
