"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Clock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { PageShell } from "@/components/layout/page-shell";
import { heroPestOptions } from "@/lib/catalog";
import { heroQuoteSchema, type HeroQuoteInput } from "@/lib/validators/hero";

const badges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Clock, label: "24/7 Response" },
  { icon: BadgeCheck, label: "100% Guarantee" },
];

export function Hero() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const form = useForm<HeroQuoteInput>({
    resolver: zodResolver(heroQuoteSchema),
    defaultValues: { postalCode: "", pest: undefined, phone: "" },
  });

  function onSubmit(values: HeroQuoteInput) {
    const params = new URLSearchParams({
      postalCode: values.postalCode,
      pest: values.pest,
      phone: values.phone,
    });
    router.push(`/estimate?${params.toString()}`);
  }

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
      };

  return (
    <section className="relative overflow-hidden bg-brand text-brand-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(57,255,20,0.28), transparent 34%), radial-gradient(circle at 85% 0%, rgba(255,255,255,0.16), transparent 28%)",
        }}
      />
      <PageShell className="relative grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <motion.div {...motionProps}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Emergency and enterprise programs
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl leading-tight text-white sm:text-5xl">
            Emergency and enterprise pest control, on site the same day.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Licensed technicians for homes, restaurants, and multi-site facilities. Start with a free
            inspection quote — most calls are scheduled before the end of the day.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {badges.map((badge) => (
              <li
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white"
              >
                <badge.icon className="h-4 w-4 text-accent" aria-hidden />
                {badge.label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          id="inspection-quote"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="rounded-lg bg-card p-6 text-card-foreground shadow-[var(--shadow)] sm:p-7"
          {...(reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.08 } })}
        >
          <h2 className="font-display text-2xl">Get a free inspection quote</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tell us the ZIP, the pest, and how to reach you.</p>
          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="postalCode">ZIP code</Label>
              <Input
                id="postalCode"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="85016"
                className="mt-1.5"
                aria-invalid={Boolean(form.formState.errors.postalCode)}
                {...form.register("postalCode")}
              />
              <FieldError message={form.formState.errors.postalCode?.message} />
            </div>
            <div>
              <Label htmlFor="pest">Pest issue</Label>
              <Select
                id="pest"
                className="mt-1.5"
                defaultValue=""
                aria-invalid={Boolean(form.formState.errors.pest)}
                {...form.register("pest")}
              >
                <option value="" disabled>
                  Select an issue
                </option>
                {heroPestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FieldError message={form.formState.errors.pest?.message} />
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="480-555-5555"
                className="mt-1.5"
                aria-invalid={Boolean(form.formState.errors.phone)}
                {...form.register("phone")}
              />
              <FieldError message={form.formState.errors.phone?.message} />
            </div>
            <button
              type="submit"
              className="h-12 w-full rounded-md bg-safety text-base font-semibold text-safety-foreground hover:bg-safety/90"
            >
              Get a Free Inspection Quote
            </button>
          </div>
        </motion.form>
      </PageShell>
    </section>
  );
}
