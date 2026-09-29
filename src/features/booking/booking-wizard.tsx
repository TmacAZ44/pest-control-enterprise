"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatSlotLabel, isSlotOpen, openSlots, toDateInputValue } from "@/features/booking/availability";
import { services, usStates, type ServiceSlug } from "@/lib/catalog";
import { formatUsd } from "@/lib/utils";
import { bookingSchema, type BookingInput } from "@/lib/validators/booking";
import { startBooking } from "@/server/actions/booking";

function isService(value: string | null): value is ServiceSlug {
  return services.some((service) => service.slug === value);
}

export function BookingWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const preset = params.get("service");
  const canceled = params.get("canceled") === "1";
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [dateBounds, setDateBounds] = useState<{ min: string; max: string }>({ min: "", max: "" });

  useEffect(() => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 21);
    setDateBounds({ min: toDateInputValue(start), max: toDateInputValue(end) });
  }, []);

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: isService(preset) ? preset : "residential",
      date: "",
      time: "",
      line1: "",
      city: "",
      state: "AZ",
      postalCode: "",
      notes: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const date = form.watch("date");
  const time = form.watch("time");
  const serviceSlug = form.watch("service");
  const service = services.find((item) => item.slug === serviceSlug) ?? services[0];
  const slots = useMemo(() => (date ? openSlots(date) : []), [date]);

  async function onSubmit(values: BookingInput) {
    setPending(true);
    setFormError(null);
    try {
      const result = await startBooking(values);
      sessionStorage.setItem(
        "abc-booking",
        JSON.stringify({
          reference: result.reference,
          depositCents: result.depositCents,
          paid: Boolean(result.checkoutUrl),
          service: service.name,
          date: values.date,
          time: values.time,
          address: `${values.line1}, ${values.city}, ${values.state} ${values.postalCode}`,
        }),
      );
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      router.push(`/book/confirmation?reference=${encodeURIComponent(result.reference)}`);
    } catch {
      setFormError("We could not start checkout. Check the form and try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <Card className="space-y-6 p-6 shadow-none sm:p-8">
        {canceled ? (
          <p className="rounded-md bg-muted px-3 py-2 text-sm">
            Checkout was canceled. Your deposit was not collected.
          </p>
        ) : null}

        <fieldset>
          <legend className="font-display text-2xl">Service</legend>
          <div className="mt-4">
            <Label htmlFor="service">Program</Label>
            <Select id="service" className="mt-1.5" {...form.register("service")}>
              {services.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl">Date and arrival window</legend>
          <p className="mt-1 text-sm text-muted-foreground">
            Sundays are closed. One window each day is held for emergency dispatch.
          </p>
          <div className="mt-4">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              min={dateBounds.min}
              max={dateBounds.max}
              className="mt-1.5"
              aria-invalid={Boolean(form.formState.errors.date)}
              {...form.register("date", {
                onChange: (event) => {
                  const nextDate = event.target.value;
                  if (time && !isSlotOpen(nextDate, time)) form.setValue("time", "");
                },
              })}
            />
            <FieldError message={form.formState.errors.date?.message} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {date && slots.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground">No open windows on that day.</p>
            ) : null}
            {slots.map((slot) => (
              <label
                key={slot}
                className={`cursor-pointer rounded-md border px-3 py-2 text-center text-sm font-semibold ${
                  time === slot ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card"
                }`}
              >
                <input type="radio" className="sr-only" value={slot} {...form.register("time")} />
                {formatSlotLabel(slot)}
              </label>
            ))}
          </div>
          <FieldError message={form.formState.errors.time?.message} />
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="font-display text-2xl sm:col-span-2">Property</legend>
          <div className="sm:col-span-2">
            <Label htmlFor="line1">Street address</Label>
            <Input id="line1" autoComplete="address-line1" className="mt-1.5" {...form.register("line1")} />
            <FieldError message={form.formState.errors.line1?.message} />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" autoComplete="address-level2" className="mt-1.5" {...form.register("city")} />
            <FieldError message={form.formState.errors.city?.message} />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Select id="state" className="mt-1.5" {...form.register("state")}>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
            <FieldError message={form.formState.errors.state?.message} />
          </div>
          <div>
            <Label htmlFor="postalCode">ZIP code</Label>
            <Input id="postalCode" inputMode="numeric" autoComplete="postal-code" className="mt-1.5" {...form.register("postalCode")} />
            <FieldError message={form.formState.errors.postalCode?.message} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="notes">Access notes</Label>
            <Textarea id="notes" placeholder="Gate code, pets, or areas to focus on" className="mt-1.5" {...form.register("notes")} />
            <FieldError message={form.formState.errors.notes?.message} />
          </div>
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="font-display text-2xl sm:col-span-2">Contact</legend>
          <div className="sm:col-span-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" autoComplete="name" className="mt-1.5" {...form.register("name")} />
            <FieldError message={form.formState.errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" className="mt-1.5" {...form.register("email")} />
            <FieldError message={form.formState.errors.email?.message} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" autoComplete="tel" className="mt-1.5" {...form.register("phone")} />
            <FieldError message={form.formState.errors.phone?.message} />
          </div>
        </fieldset>

        {formError ? <p className="text-sm text-foreground">{formError}</p> : null}
        <Button type="submit" variant="safety" size="lg" disabled={pending}>
          {pending ? "Starting checkout..." : `Pay ${formatUsd(service.depositCents)} deposit`}
        </Button>
      </Card>

      <aside className="h-fit rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Due today</p>
        <p className="mt-2 font-display text-4xl">{formatUsd(service.depositCents)}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {service.name} deposit, applied to the service invoice. Stripe Checkout opens when{" "}
          <code className="text-xs">STRIPE_SECRET_KEY</code> is set. Otherwise this demo confirms the booking locally.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>{service.summary}</li>
          <li>{date && time ? `${date} at ${formatSlotLabel(time)}` : "Choose a date and window"}</li>
        </ul>
      </aside>
    </form>
  );
}
