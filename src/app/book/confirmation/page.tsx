import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { BookingConfirmation } from "@/features/booking/booking-confirmation";

export const metadata: Metadata = {
  title: "Booking confirmed",
};

export default function ConfirmationPage() {
  return (
    <PageShell className="py-12">
      <Suspense fallback={<p>Loading confirmation...</p>}>
        <BookingConfirmation />
      </Suspense>
    </PageShell>
  );
}
