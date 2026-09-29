"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatSlotLabel } from "@/features/booking/availability";
import { formatUsd } from "@/lib/utils";

type StoredBooking = {
  reference: string;
  depositCents: number;
  service: string;
  date: string;
  time: string;
  address: string;
};

export function BookingConfirmation() {
  const params = useSearchParams();
  const reference = params.get("reference");
  const sessionId = params.get("session_id");
  const [booking, setBooking] = useState<StoredBooking | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("abc-booking");
    if (!raw) return;
    try {
      setBooking(JSON.parse(raw) as StoredBooking);
    } catch {
      setBooking(null);
    }
  }, []);

  const shownReference = reference ?? booking?.reference;

  return (
    <Card className="max-w-2xl p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Booking received</p>
      <h1 className="mt-2 font-display text-4xl">You are on the schedule.</h1>
      <p className="mt-3 text-muted-foreground">
        Reference <span className="font-semibold text-foreground">{shownReference ?? "pending"}</span>.
        {sessionId
          ? " Stripe confirmed the deposit checkout session."
          : " The deposit is recorded in this demo because Stripe keys are not configured."}
      </p>
      {booking ? (
        <dl className="mt-6 space-y-2 text-sm">
          <div>
            <dt className="inline font-semibold">Service: </dt>
            <dd className="inline">{booking.service}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Arrival: </dt>
            <dd className="inline">
              {booking.date} at {formatSlotLabel(booking.time)}
            </dd>
          </div>
          <div>
            <dt className="inline font-semibold">Property: </dt>
            <dd className="inline">{booking.address}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Deposit: </dt>
            <dd className="inline">{formatUsd(booking.depositCents)}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          Open this page from the booking form on this browser to see the property summary.
        </p>
      )}
      <Button href="/portal" className="mt-6" variant="outline">
        Go to the customer portal
      </Button>
    </Card>
  );
}
