import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { CustomerDashboard } from "@/features/portal/customer-dashboard";

export const metadata: Metadata = {
  title: "Customer portal",
  description: "Upcoming visits, service reports, and invoices for your ABC Shield account.",
};

export default function PortalPage() {
  return (
    <PageShell className="py-12">
      <CustomerDashboard />
    </PageShell>
  );
}
