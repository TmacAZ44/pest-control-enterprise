"use server";

import type { PestType, Prisma, ServiceFrequency } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { estimateQuote } from "@/lib/pricing";
import { createReference } from "@/lib/utils";
import { quoteSchema, type QuoteInput } from "@/lib/validators/quote";

const frequencyMap: Record<QuoteInput["frequency"], ServiceFrequency> = {
  "one-time": "ONE_TIME",
  monthly: "MONTHLY",
  quarterly: "QUARTERLY",
};

export async function submitQuote(input: QuoteInput) {
  const data = quoteSchema.parse(input);
  const estimate = estimateQuote(data);
  const reference = createReference("QT");
  const prisma = getPrisma();

  if (prisma) {
    await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        postalCode: data.postalCode,
        propertyType: data.propertyType === "residential" ? "RESIDENTIAL" : "COMMERCIAL",
        squareFootage: data.squareFootage,
        pests: data.pests.map((pest) => pest.toUpperCase()) as PestType[],
        frequency: frequencyMap[data.frequency],
        status: "NEW",
        estimatedLowCents: estimate.perVisitLowCents,
        estimatedHighCents: estimate.perVisitHighCents,
        notes: `Web reference ${reference}`,
      } satisfies Prisma.QuoteRequestCreateInput,
    });
  }

  return { reference, estimate };
}
