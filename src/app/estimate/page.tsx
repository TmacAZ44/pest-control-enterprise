import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { QuoteCalculator } from "@/features/estimator/quote-calculator";

export const metadata: Metadata = {
  title: "Free inspection estimate",
  description: "Price a residential or commercial pest program by property size, pest type, and visit frequency.",
};

export default function EstimatePage() {
  return (
    <PageShell className="py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Quote calculator</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl">A planning range before the technician arrives.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Four steps. The last one captures the lead so dispatch can confirm the inspection.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading the estimator...</p>}>
          <QuoteCalculator />
        </Suspense>
      </div>
    </PageShell>
  );
}
