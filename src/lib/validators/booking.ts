import { z } from "zod";
import { services, usStates } from "@/lib/catalog";
import { isBookableDate, isSlotOpen } from "@/features/booking/availability";

const serviceSlugs = services.map((service) => service.slug) as [
  (typeof services)[number]["slug"],
  ...(typeof services)[number]["slug"][],
];

const states = [...usStates] as [string, ...string[]];

export const bookingSchema = z
  .object({
    service: z.enum(serviceSlugs, { errorMap: () => ({ message: "Select a service" }) }),
    date: z.string().min(1, "Choose a date"),
    time: z.string().min(1, "Choose a time"),
    line1: z.string().trim().min(5, "Enter the street address").max(120),
    city: z.string().trim().min(2, "Enter the city").max(60),
    state: z.enum(states, { errorMap: () => ({ message: "Select a state" }) }),
    postalCode: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
    notes: z.string().trim().max(500).optional().or(z.literal("")),
    name: z.string().trim().min(2, "Enter your name").max(80),
    email: z.string().trim().email("Enter a valid email"),
    phone: z
      .string()
      .trim()
      .regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Enter a 10-digit phone number"),
  })
  .superRefine((value, context) => {
    if (!isBookableDate(value.date)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["date"],
        message: "Choose a weekday within the next 21 days",
      });
    }
    if (value.time && !isSlotOpen(value.date, value.time)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["time"],
        message: "That time is no longer open",
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;

export const emergencySchema = z.object({
  reason: z.string().trim().min(8, "Describe the emergency in a few words").max(400),
  phone: z
    .string()
    .trim()
    .regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Enter a 10-digit phone number"),
});

export type EmergencyInput = z.infer<typeof emergencySchema>;
