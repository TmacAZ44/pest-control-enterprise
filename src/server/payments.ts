import Stripe from "stripe";
import { headers } from "next/headers";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function createCheckoutSession(input: {
  amountCents: number;
  productName: string;
  reference: string;
  customerEmail: string;
  successPath: string;
  cancelPath: string;
}) {
  const stripe = getStripe();
  if (!stripe) return null;

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? `${proto}://${host}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: input.customerEmail,
    client_reference_id: input.reference,
    metadata: { reference: input.reference },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: input.amountCents,
          product_data: { name: input.productName },
        },
      },
    ],
    success_url: `${origin}${input.successPath}${input.successPath.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${input.cancelPath}`,
  });

  return session.url;
}
