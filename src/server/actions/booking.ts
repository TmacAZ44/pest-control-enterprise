"use server";

import { services } from "@/lib/catalog";
import { createReference } from "@/lib/utils";
import { bookingSchema, type BookingInput } from "@/lib/validators/booking";
import { createCheckoutSession } from "@/server/payments";

export async function startBooking(input: BookingInput) {
  const data = bookingSchema.parse(input);
  const service = services.find((item) => item.slug === data.service);
  if (!service) {
    throw new Error("Unknown service");
  }

  const reference = createReference("BK");
  const checkoutUrl = await createCheckoutSession({
    amountCents: service.depositCents,
    productName: `${service.name} service deposit`,
    reference,
    customerEmail: data.email,
    successPath: `/book/confirmation?reference=${encodeURIComponent(reference)}`,
    cancelPath: "/book?canceled=1",
  });

  return {
    reference,
    checkoutUrl,
    depositCents: service.depositCents,
  };
}
