import { Button } from "@/components/ui/button";

export function SignatureBand({ cta = true }: { cta?: boolean }) {
  return (
    <section className="border-t border-border bg-white" aria-labelledby="signature-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 id="signature-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          Your focus is saving lives.
        </h2>
        <p className="mt-2 font-script text-4xl leading-none text-script sm:text-5xl">Our focus is growing your practice.</p>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Partner with a marketing team that understands surgery and delivers results that matter.
        </p>
        {cta ? (
          <div className="mt-8">
            <Button href="/contact#inquire" size="lg" className="rounded-sm text-xs tracking-[0.16em] uppercase hover:bg-brand-strong">
              Get Started
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function InquireCta() {
  return (
    <section className="bg-soft" aria-labelledby="inquire-cta-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 id="inquire-cta-heading" className="font-display text-3xl text-ink sm:text-4xl">
            Your focus is saving lives.
          </h2>
          <p className="font-script text-4xl leading-none text-script">Our focus is growing your practice.</p>
        </div>
        <Button href="/contact#inquire" size="lg" className="rounded-sm text-xs tracking-[0.16em] uppercase hover:bg-brand-strong">
          Get Started
        </Button>
      </div>
    </section>
  );
}
