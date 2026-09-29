import { z } from "zod";

export const quoteSchema = z.object({
  propertyType: z.enum(["residential", "commercial"], {
    errorMap: () => ({ message: "Choose a property type" }),
  }),
  squareFootage: z
    .number({ invalid_type_error: "Enter the square footage" })
    .int("Use a whole number")
    .min(200, "Enter at least 200 square feet")
    .max(500000, "Enter a smaller square footage"),
  pests: z
    .array(z.enum(["ants", "rodents", "termites", "bed_bugs", "mosquitoes"]))
    .min(1, "Select at least one pest"),
  frequency: z.enum(["one-time", "monthly", "quarterly"], {
    errorMap: () => ({ message: "Choose a service frequency" }),
  }),
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Enter a 10-digit phone number"),
  postalCode: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
