import { z } from "zod";
import { heroPestOptions } from "@/lib/catalog";

const heroPests = heroPestOptions.map((option) => option.value) as [
  (typeof heroPestOptions)[number]["value"],
  ...(typeof heroPestOptions)[number]["value"][],
];

export const heroQuoteSchema = z.object({
  postalCode: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
  pest: z.enum(heroPests, { errorMap: () => ({ message: "Select a pest issue" }) }),
  phone: z
    .string()
    .trim()
    .regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Enter a 10-digit phone number"),
});

export type HeroQuoteInput = z.infer<typeof heroQuoteSchema>;
