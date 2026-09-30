import {
  BookOpen,
  Handshake,
  HeartPulse,
  LineChart,
  MapPin,
  Megaphone,
  Monitor,
  PenLine,
  ShieldCheck,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  quote: string;
  role: string;
  rating: number;
};

export type Offering = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

export type Value = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    title: "Surgical fluency",
    description:
      "Campaigns start with the procedure, the patient, and the referral path — then the headline.",
    icon: HeartPulse,
  },
  {
    title: "Boutique partnership",
    description:
      "A small team stays with the practice. You will know who is writing, designing, and reporting.",
    icon: Users,
  },
  {
    title: "Nationwide reach",
    description:
      "Based in Scottsdale, and built for groups whose patients come from well beyond one zip code.",
    icon: MapPin,
  },
  {
    title: "Work you can measure",
    description:
      "Inquiries, consults, and referring-physician activity. Vanity traffic stays off the report.",
    icon: LineChart,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "They learned the procedure before they wrote a single line. The consult requests finally sound like the patients we want to see.",
    role: "Practice administrator, orthopedic surgery, Scottsdale",
    rating: 5,
  },
  {
    quote:
      "We stopped sounding like every other clinic on the page. The site, the ads, and the referral materials finally match the operating room.",
    role: "Director of growth, ambulatory surgery center",
    rating: 5,
  },
  {
    quote:
      "RevUp treats the practice like a specialty, not a content calendar. The work is quieter, sharper, and easier to explain to partners.",
    role: "Physician-owner, ophthalmology practice",
    rating: 5,
  },
];

export const offerings: Offering[] = [
  {
    title: "Brand and positioning",
    description: "A clear story for patients and the physicians who refer to you.",
    icon: PenLine,
    points: [
      "Specialty narrative and competitive frame",
      "Voice, naming, and visual direction",
      "Messaging for patients and referring physicians",
    ],
  },
  {
    title: "Practice websites",
    description: "Pages that explain the surgery and make the next step obvious.",
    icon: Monitor,
    points: [
      "Procedure and provider page systems",
      "Consultation paths a front desk can run",
      "Layouts that stay clear on a phone",
    ],
  },
  {
    title: "Patient acquisition",
    description: "Search and paid programs aimed at the right cases, not the cheapest click.",
    icon: Megaphone,
    points: [
      "Campaigns tied to a single procedure",
      "Landing pages with one next step",
      "Inquiry tracking your team can trust",
    ],
  },
  {
    title: "Reputation and referrals",
    description: "Reviews and physician outreach that respect a clinical relationship.",
    icon: Star,
    points: [
      "Review requests with a careful tone",
      "Materials for referring physicians",
      "Reporting on reputation, not just rankings",
    ],
  },
  {
    title: "Content and education",
    description: "Explainers patients can finish, in a voice the surgeon recognizes.",
    icon: BookOpen,
    points: [
      "Procedure explainers in plain language",
      "Surgeon-led articles and short video",
      "A calendar a small team can sustain",
    ],
  },
  {
    title: "Market expansion",
    description: "New locations and new markets, introduced with the same standard of care.",
    icon: MapPin,
    points: [
      "Multi-location rollouts",
      "New-market launch plans",
      "Quarterly planning against consult goals",
    ],
  },
];

export const values: Value[] = [
  {
    title: "Clinical respect",
    description:
      "Surgery is not a sale. The work should be something a surgeon is willing to stand next to.",
    icon: ShieldCheck,
  },
  {
    title: "Boutique attention",
    description:
      "You are not a logo in a deck. Strategy, pages, and reporting stay with the same small team.",
    icon: Handshake,
  },
  {
    title: "Measured growth",
    description:
      "A result is a qualified consult or a stronger referral relationship, not a spike in traffic.",
    icon: LineChart,
  },
];
