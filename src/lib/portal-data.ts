export type PortalVisit = {
  id: string;
  service: string;
  when: string;
  window: string;
  technician: string;
  license: string;
  phone: string;
  address: string;
  status: "Confirmed" | "En route";
};

export type PortalReport = {
  id: string;
  completedOn: string;
  service: string;
  technician: string;
  address: string;
  customer: string;
  summary: string;
  findings: string;
  productsUsed: string;
};

export type PortalInvoice = {
  id: string;
  number: string;
  issued: string;
  description: string;
  amountCents: number;
  status: "Open" | "Paid";
};

export const portalCustomer = {
  name: "Jordan Hale",
  company: "Hale Residence",
  email: "jordan.hale@example.com",
  phone: "(480) 555-0142",
  address: "1842 N 24th Street, Phoenix, AZ 85008",
};

export const upcomingVisits: PortalVisit[] = [
  {
    id: "apt_2201",
    service: "Quarterly residential barrier",
    when: "Thursday, Oct 2, 2026",
    window: "10:00 AM–12:00 PM",
    technician: "Maya Chen",
    license: "AZ-PC-44182",
    phone: "(480) 555-0174",
    address: portalCustomer.address,
    status: "Confirmed",
  },
  {
    id: "apt_2208",
    service: "Termite monitoring check",
    when: "Tuesday, Oct 21, 2026",
    window: "2:00–4:00 PM",
    technician: "Luis Ortega",
    license: "AZ-PC-33810",
    phone: "(480) 555-0166",
    address: portalCustomer.address,
    status: "Confirmed",
  },
];

export const serviceReports: PortalReport[] = [
  {
    id: "rpt_1042",
    completedOn: "June 18, 2026",
    service: "Quarterly residential barrier",
    technician: "Maya Chen",
    address: portalCustomer.address,
    customer: portalCustomer.name,
    summary: "Exterior barrier applied. No interior activity found.",
    findings: "Light ant trailing at the west hose bib. Entry points sealed.",
    productsUsed: "Non-repellent perimeter treatment, station inspection.",
  },
  {
    id: "rpt_0988",
    completedOn: "March 12, 2026",
    service: "Rodent exclusion follow-up",
    technician: "Luis Ortega",
    address: portalCustomer.address,
    customer: portalCustomer.name,
    summary: "Attic exclusion holding. No new droppings.",
    findings: "Previous soffit repair intact. One station refreshed.",
    productsUsed: "Station service, sanitation review.",
  },
];

export const invoices: PortalInvoice[] = [
  {
    id: "inv_open_1",
    number: "INV-10488",
    issued: "Sep 15, 2026",
    description: "Quarterly service — September",
    amountCents: 18900,
    status: "Open",
  },
  {
    id: "inv_paid_1",
    number: "INV-10302",
    issued: "Jun 18, 2026",
    description: "Quarterly service — June",
    amountCents: 18900,
    status: "Paid",
  },
  {
    id: "inv_paid_2",
    number: "INV-10114",
    issued: "Mar 12, 2026",
    description: "Rodent exclusion follow-up",
    amountCents: 24000,
    status: "Paid",
  },
];
