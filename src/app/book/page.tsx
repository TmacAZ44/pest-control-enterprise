import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { BookingWizard } from "@/features/booking/booking-wizard";

export const metadata: Metadata = {
  title: "Book service",
  description: "Choose a pest control service, an open arrival window, and pay the visit deposit.",
};

export default function BookPage() {
  return (
    <PageShell className="py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Online booking</p>
      <h1 className="mt-2 font-display text-4xl">Reserve a technician.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Open windows come from the dispatch calendar. The deposit is collected in Stripe Checkout when live keys are configured.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading the calendar...</p>}>
          <BookingWizard />
        </Suspense>
      </div>
    </PageShell>
  );
}
