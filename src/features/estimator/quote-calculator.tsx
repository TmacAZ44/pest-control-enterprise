"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { frequencies, pestOptions, propertyTypes, type PestValue } from "@/lib/catalog";
import { estimateQuote } from "@/lib/pricing";
import { formatUsd } from "@/lib/utils";
import { quoteSchema, type QuoteInput } from "@/lib/validators/quote";
import { submitQuote } from "@/server/actions/quote";

const steps = ["Property", "Pests", "Frequency", "Estimate"] as const;

const stepFields: (keyof QuoteInput)[][] = [
  ["propertyType", "squareFootage"],
  ["pests"],
  ["frequency"],
  ["name", "email", "phone", "postalCode"],
];

function isPest(value: string | null): value is PestValue {
  return pestOptions.some((option) => option.value === value);
}

export function QuoteCalculator() {
  const params = useSearchParams();
  const presetPest = params.get("pest");
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      propertyType: "residential",
      squareFootage: undefined as unknown as number,
      pests: isPest(presetPest) ? [presetPest] : [],
      frequency: "quarterly",
      name: "",
      email: "",
      phone: params.get("phone") ?? "",
      postalCode: params.get("postalCode") ?? "",
    },
    mode: "onTouched",
  });

  const pests = form.watch("pests");
  const propertyType = form.watch("propertyType");
  const squareFootage = form.watch("squareFootage");
  const frequency = form.watch("frequency");

  const estimate = useMemo(() => {
    if (!propertyType || !frequency || pests.length === 0 || !Number.isFinite(squareFootage)) return null;
    return estimateQuote({ propertyType, frequency, pests, squareFootage });
  }, [propertyType, frequency, pests, squareFootage]);

  async function next() {
    const valid = await form.trigger(stepFields[step]);
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function onSubmit(values: QuoteInput) {
    setPending(true);
    setSaveError(null);
    try {
      const result = await submitQuote(values);
      setReference(result.reference);
    } catch {
      setSaveError("We could not save that estimate. Check the fields and try again.");
    } finally {
      setPending(false);
    }
  }

  function togglePest(pest: PestValue) {
    const nextPests = pests.includes(pest) ? pests.filter((item) => item !== pest) : [...pests, pest];
    form.setValue("pests", nextPests, { shouldValidate: true });
  }

  if (reference && estimate) {
    return (
      <Card className="p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Quote received</p>
        <h2 className="mt-2 font-display text-3xl">We saved estimate {reference}</h2>
        <p className="mt-3 text-muted-foreground">
          A coordinator will confirm the inspection window. Your planning range is{" "}
          {formatUsd(estimate.perVisitLowCents)}–{formatUsd(estimate.perVisitHighCents)} per visit.
        </p>
        <Button href="/book" className="mt-6" variant="safety">
          Book the inspection
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <ol className="grid grid-cols-4 gap-2">
        {steps.map((label, index) => (
          <li key={label} className="text-center">
            <span
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                index <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </span>
            <span className="mt-1 hidden text-xs font-semibold sm:block">{label}</span>
          </li>
        ))}
      </ol>

      <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {step === 0 ? (
          <fieldset>
            <legend className="font-display text-2xl">What kind of property is it?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {propertyTypes.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    propertyType === option.value ? "border-accent bg-accent/10" : "border-border"
                  }`}
                >
                  <input type="radio" className="sr-only" value={option.value} {...form.register("propertyType")} />
                  <span className="block font-semibold">{option.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{option.hint}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <Label htmlFor="squareFootage">
                {propertyType === "commercial" ? "Facility square footage" : "Home square footage"}
              </Label>
              <Input
                id="squareFootage"
                type="number"
                min={200}
                inputMode="numeric"
                placeholder={propertyType === "commercial" ? "12000" : "2100"}
                className="mt-1.5"
                aria-invalid={Boolean(form.formState.errors.squareFootage)}
                {...form.register("squareFootage", { valueAsNumber: true })}
              />
              <FieldError message={form.formState.errors.squareFootage?.message} />
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="font-display text-2xl">Which pests should we plan for?</legend>
            <div className="mt-4 grid gap-3">
              {pestOptions.map((option) => {
                const checked = pests.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer gap-3 rounded-lg border p-4 ${
                      checked ? "border-accent bg-accent/10" : "border-border"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={checked}
                      onChange={() => togglePest(option.value)}
                    />
                    <span>
                      <span className="block font-semibold">{option.label}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{option.detail}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <FieldError message={form.formState.errors.pests?.message} />
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="font-display text-2xl">How often should the crew return?</legend>
            <div className="mt-4 grid gap-3">
              {frequencies.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    frequency === option.value ? "border-accent bg-accent/10" : "border-border"
                  }`}
                >
                  <input type="radio" className="sr-only" value={option.value} {...form.register("frequency")} />
                  <span className="block font-semibold">{option.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{option.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 3 && estimate ? (
          <div className="space-y-5">
            <div className="rounded-lg bg-muted p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">Planning range</p>
              <p className="mt-2 font-display text-3xl">
                {formatUsd(estimate.perVisitLowCents)}–{formatUsd(estimate.perVisitHighCents)}
                <span className="ml-2 font-sans text-base text-muted-foreground">per visit</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {estimate.visitsPerYear === 1
                  ? "One corrective visit. The inspection confirms the final scope."
                  : `${estimate.visitsPerYear} visits a year, about ${formatUsd(estimate.annualLowCents)}–${formatUsd(estimate.annualHighCents)} annually.`}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
                <Label htmlFor="lead-phone">Phone</Label>
                <Input id="lead-phone" type="tel" autoComplete="tel" className="mt-1.5" {...form.register("phone")} />
                <FieldError message={form.formState.errors.phone?.message} />
              </div>
              <div>
                <Label htmlFor="lead-zip">ZIP code</Label>
                <Input id="lead-zip" inputMode="numeric" className="mt-1.5" {...form.register("postalCode")} />
                <FieldError message={form.formState.errors.postalCode?.message} />
              </div>
            </div>
          </div>
        ) : null}

        {saveError ? <p className="mt-4 text-sm text-foreground">{saveError}</p> : null}
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button type="button" variant="outline" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
            Back
          </Button>
          {step < 3 ? (
            <Button type="button" variant="accent" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="safety" disabled={pending || !estimate}>
              {pending ? "Saving..." : "Send my estimate"}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
