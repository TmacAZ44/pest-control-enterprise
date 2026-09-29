export const pestOptions = [
  { value: "ants", label: "Ants", detail: "Odorous house ants, carpenter ants, and pavement ants." },
  { value: "rodents", label: "Rodents", detail: "Mice, roof rats, and exclusion plus baiting." },
  { value: "termites", label: "Termites", detail: "Subterranean inspection, monitoring, and treatment." },
  { value: "bed_bugs", label: "Bed Bugs", detail: "Inspection, heat or targeted treatment, and follow-up." },
  { value: "mosquitoes", label: "Mosquitoes", detail: "Yard reduction and scheduled barrier treatments." },
] as const;

export type PestValue = (typeof pestOptions)[number]["value"];

export const heroPestOptions = [
  ...pestOptions.map(({ value, label }) => ({ value, label })),
  { value: "wildlife", label: "Wildlife" },
  { value: "unsure", label: "Not sure" },
] as const;

export const propertyTypes = [
  { value: "residential", label: "Residential", hint: "Home, townhouse, or multi-family unit" },
  { value: "commercial", label: "Commercial", hint: "Office, restaurant, warehouse, or facility" },
] as const;

export type PropertyType = (typeof propertyTypes)[number]["value"];

export const frequencies = [
  { value: "one-time", label: "One-time", hint: "A single corrective visit" },
  { value: "monthly", label: "Monthly", hint: "Best for restaurants and active infestations" },
  { value: "quarterly", label: "Quarterly", hint: "Standard prevention for most properties" },
] as const;

export type Frequency = (typeof frequencies)[number]["value"];

export const services = [
  {
    slug: "residential",
    name: "Residential",
    category: "RESIDENTIAL",
    summary: "Interior and exterior protection for homes, with same-day emergency response.",
    depositCents: 4900,
  },
  {
    slug: "commercial",
    name: "Commercial",
    category: "COMMERCIAL",
    summary: "Documented programs for offices, restaurants, warehouses, and multi-site portfolios.",
    depositCents: 9900,
  },
  {
    slug: "termite",
    name: "Termite",
    category: "TERMITE",
    summary: "Inspections, monitoring stations, and treatment plans that protect the structure.",
    depositCents: 7900,
  },
  {
    slug: "rodent",
    name: "Rodent",
    category: "RODENT",
    summary: "Exclusion, sanitation guidance, and monitored baiting for mice and rats.",
    depositCents: 5900,
  },
  {
    slug: "wildlife",
    name: "Wildlife",
    category: "WILDLIFE",
    summary: "Humane removal and sealing for attic, crawlspace, and entry-point problems.",
    depositCents: 8900,
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export const usStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
  "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
  "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV",
  "WI","WY","DC",
] as const;
