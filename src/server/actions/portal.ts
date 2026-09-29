"use server";

import { invoices } from "@/lib/portal-data";
import { createReference } from "@/lib/utils";
import { emergencySchema, type EmergencyInput } from "@/lib/validators/booking";
import { createCheckoutSession } from "@/server/payments";

export async function payInvoice(invoiceId: string) {
  const invoice = invoices.find((item) => item.id === invoiceId && item.status === "Open");
  if (!invoice) {
    throw new Error("Invoice is not open");
  }

  const reference = createReference("PAY");
  const checkoutUrl = await createCheckoutSession({
    amountCents: invoice.amountCents,
    productName: `${invoice.number} — ${invoice.description}`,
    reference,
    customerEmail: "jordan.hale@example.com",
    successPath: `/portal?paid=${encodeURIComponent(invoice.number)}`,
    cancelPath: "/portal?canceled=1",
  });

  return {
    reference,
    checkoutUrl,
    stripeReference: checkoutUrl ? reference : `pi_mock_${reference.toLowerCase()}`,
  };
}

export async function requestEmergency(input: EmergencyInput) {
  const data = emergencySchema.parse(input);
  return {
    reference: createReference("ER"),
    phone: data.phone,
  };
}
