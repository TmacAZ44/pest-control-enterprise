import type { Frequency, PestValue, PropertyType } from "@/lib/catalog";

const pestWeight: Record<PestValue, number> = {
  ants: 0.1,
  rodents: 0.25,
  termites: 0.45,
  bed_bugs: 0.6,
  mosquitoes: 0.15,
};

const frequencyFactor: Record<Frequency, number> = {
  "one-time": 1,
  monthly: 0.72,
  quarterly: 0.86,
};

const visitsPerYear: Record<Frequency, number> = {
  "one-time": 1,
  monthly: 12,
  quarterly: 4,
};

export type QuoteEstimate = {
  perVisitLowCents: number;
  perVisitHighCents: number;
  annualLowCents: number;
  annualHighCents: number;
  visitsPerYear: number;
};

function roundToNearest(cents: number, step: number) {
  return Math.round(cents / step) * step;
}

export function estimateQuote(input: {
  propertyType: PropertyType;
  squareFootage: number;
  pests: PestValue[];
  frequency: Frequency;
}): QuoteEstimate {
  const rateCents = input.propertyType === "residential" ? 12 : 8;
  const minimum = input.propertyType === "residential" ? 14900 : 34900;
  const base = Math.max(minimum, input.squareFootage * rateCents);
  const weight = input.pests.reduce((sum, pest) => sum + pestWeight[pest], 0);
  const corrective = base * (1 + weight);
  const perVisit = corrective * frequencyFactor[input.frequency];
  const low = roundToNearest(perVisit * 0.9, 500);
  const high = roundToNearest(perVisit * 1.12, 500);
  const visits = visitsPerYear[input.frequency];

  return {
    perVisitLowCents: low,
    perVisitHighCents: Math.max(high, low + 500),
    annualLowCents: low * visits,
    annualHighCents: Math.max(high, low + 500) * visits,
    visitsPerYear: visits,
  };
}
