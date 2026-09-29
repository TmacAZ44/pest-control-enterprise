"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { invoices as seedInvoices, portalCustomer, serviceReports, upcomingVisits, type PortalInvoice } from "@/lib/portal-data";
import { formatUsd } from "@/lib/utils";
import { emergencySchema } from "@/lib/validators/booking";
import { payInvoice, requestEmergency } from "@/server/actions/portal";

export function CustomerDashboard() {
  const [invoiceRows, setInvoiceRows] = useState<PortalInvoice[]>(seedInvoices);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [paymentNote, setPaymentNote] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [phone, setPhone] = useState(portalCustomer.phone);
  const [errors, setErrors] = useState<{ reason?: string; phone?: string }>({});
  const [emergencyReference, setEmergencyReference] = useState<string | null>(null);
  const [emergencyPending, setEmergencyPending] = useState(false);

  async function onPay(invoice: PortalInvoice) {
    setPayingId(invoice.id);
    setPaymentNote(null);
    setActionError(null);
    try {
      const result = await payInvoice(invoice.id);
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      setInvoiceRows((rows) =>
        rows.map((row) => (row.id === invoice.id ? { ...row, status: "Paid" } : row)),
      );
      setPaymentNote(`${invoice.number} paid. Reference ${result.stripeReference}.`);
    } catch {
      setActionError("Payment could not be started. Try again in a moment.");
    } finally {
      setPayingId(null);
    }
  }

  async function onEmergency(event: React.FormEvent) {
    event.preventDefault();
    const parsed = emergencySchema.safeParse({ reason, phone });
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({ reason: fieldErrors.reason?.[0], phone: fieldErrors.phone?.[0] });
      return;
    }
    setErrors({});
    setActionError(null);
    setEmergencyPending(true);
    try {
      const result = await requestEmergency(parsed.data);
      setEmergencyReference(result.reference);
      setEmergencyOpen(false);
    } catch {
      setActionError("Dispatch could not be reached. Call 480-555-5555.");
    } finally {
      setEmergencyPending(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Customer portal</p>
          <h1 className="mt-2 font-display text-4xl">{portalCustomer.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {portalCustomer.company} · {portalCustomer.address}
          </p>
        </div>
        <Button type="button" variant="safety" onClick={() => setEmergencyOpen(true)}>
          Request Emergency Reservice
        </Button>
      </div>

      {actionError ? (
        <p className="rounded-md border border-border bg-muted px-4 py-3 text-sm" role="alert">
          {actionError}
        </p>
      ) : null}
      {emergencyReference ? (
        <p className="rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm" role="status">
          Emergency visit {emergencyReference} is in the dispatch queue. A technician will call {phone}.
        </p>
      ) : null}

      {emergencyOpen ? (
        <Card className="p-5 shadow-none">
          <h2 className="font-display text-2xl">Emergency reservice</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use this when activity returns between scheduled visits. Dispatch aims for a two-hour callback.
          </p>
          <form className="mt-4 grid gap-4" onSubmit={onEmergency} noValidate>
            <div>
              <Label htmlFor="reason">What is happening?</Label>
              <Textarea id="reason" className="mt-1.5" value={reason} onChange={(event) => setReason(event.target.value)} />
              <FieldError message={errors.reason} />
            </div>
            <div>
              <Label htmlFor="callback">Callback number</Label>
              <Input id="callback" className="mt-1.5" value={phone} onChange={(event) => setPhone(event.target.value)} />
              <FieldError message={errors.phone} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="safety" disabled={emergencyPending}>
                {emergencyPending ? "Sending..." : "Dispatch now"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setEmergencyOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      <section>
        <h2 className="font-display text-3xl">Upcoming visits</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {upcomingVisits.map((visit) => (
            <Card key={visit.id} className="p-5 shadow-none">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{visit.service}</h3>
                <span className="rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                  {visit.status}
                </span>
              </div>
              <p className="mt-3 text-sm">
                {visit.when}
                <br />
                {visit.window}
              </p>
              <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
                <div>
                  <dt className="inline font-semibold text-foreground">Technician: </dt>
                  <dd className="inline">{visit.technician}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">License: </dt>
                  <dd className="inline">{visit.license}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Direct: </dt>
                  <dd className="inline">
                    <a href={`tel:${visit.phone}`}>{visit.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Property: </dt>
                  <dd className="inline">{visit.address}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl">Service reports</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Technician</th>
                <th className="px-4 py-3 font-semibold">Report</th>
              </tr>
            </thead>
            <tbody>
              {serviceReports.map((report) => (
                <tr key={report.id} className="border-t border-border">
                  <td className="px-4 py-3">{report.completedOn}</td>
                  <td className="px-4 py-3">{report.service}</td>
                  <td className="px-4 py-3">{report.technician}</td>
                  <td className="px-4 py-3">
                    <a className="font-semibold text-brand" href={`/api/reports/${report.id}`}>
                      Download PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl">Billing</h2>
        {paymentNote ? (
          <p className="mt-3 text-sm text-brand" role="status">
            {paymentNote}
          </p>
        ) : null}
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Invoice</th>
                <th className="px-4 py-3 font-semibold">Issued</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoiceRows.map((invoice) => (
                <tr key={invoice.id} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{invoice.number}</td>
                  <td className="px-4 py-3">{invoice.issued}</td>
                  <td className="px-4 py-3">{invoice.description}</td>
                  <td className="px-4 py-3">{formatUsd(invoice.amountCents)}</td>
                  <td className="px-4 py-3">
                    {invoice.status === "Open" ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="accent"
                        disabled={payingId === invoice.id}
                        onClick={() => onPay(invoice)}
                      >
                        {payingId === invoice.id ? "Paying..." : "Pay invoice"}
                      </Button>
                    ) : (
                      "Paid"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
