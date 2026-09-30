"use client";

import { useId, useState, type FormEvent } from "react";
import { company } from "@/lib/company";
import { cn } from "@/lib/utils";

type FieldName = "name" | "practice" | "email" | "phone" | "subject" | "message";

type FormValues = Record<FieldName, string>;

const emptyValues: FormValues = {
  name: "",
  practice: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const fieldClass =
  "w-full rounded-sm border border-border bg-white px-3 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-brand aria-[invalid=true]:border-[#9f1239]";

function validate(values: FormValues) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (values.practice.trim().length < 2) errors.practice = "Enter the practice or organization.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Enter a phone number with at least 10 digits.";
  if (values.subject.trim().length < 2) errors.subject = "Add a short subject.";
  if (values.message.trim().length < 12) errors.message = "Tell us a little more — at least a sentence.";
  return errors;
}

export function ContactForm() {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [ready, setReady] = useState(false);

  function fieldId(name: FieldName) {
    return `${baseId}-${name}`;
  }

  function update(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setReady(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setReady(false);
      const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find((name) => nextErrors[name]);
      if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    const subject = encodeURIComponent(values.subject.trim());
    const body = encodeURIComponent(
      [
        `Name: ${values.name.trim()}`,
        `Practice: ${values.practice.trim()}`,
        `Email: ${values.email.trim()}`,
        `Phone: ${values.phone.trim()}`,
        "",
        values.message.trim(),
      ].join("\n"),
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setReady(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      action="#inquire"
      className="space-y-4"
      aria-describedby={ready ? `${baseId}-status` : undefined}
    >
      <div className="text-center">
        <h2 className="font-script text-5xl leading-none text-script">Please Inquire</h2>
      </div>
      <Field id={fieldId("name")} label="Full Name" error={errors.name}>
        <input
          id={fieldId("name")}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
          className={cn(fieldClass, "h-11")}
        />
      </Field>
      <Field id={fieldId("practice")} label="Practice / Organization" error={errors.practice}>
        <input
          id={fieldId("practice")}
          name="organization"
          autoComplete="organization"
          value={values.practice}
          onChange={(event) => update("practice", event.target.value)}
          aria-invalid={Boolean(errors.practice)}
          aria-describedby={errors.practice ? `${fieldId("practice")}-error` : undefined}
          className={cn(fieldClass, "h-11")}
        />
      </Field>
      <Field id={fieldId("email")} label="Email Address" error={errors.email}>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
          className={cn(fieldClass, "h-11")}
        />
      </Field>
      <Field id={fieldId("phone")} label="Phone Number" error={errors.phone}>
        <input
          id={fieldId("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${fieldId("phone")}-error` : undefined}
          className={cn(fieldClass, "h-11")}
        />
      </Field>
      <Field id={fieldId("subject")} label="Subject" error={errors.subject}>
        <input
          id={fieldId("subject")}
          name="subject"
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? `${fieldId("subject")}-error` : undefined}
          className={cn(fieldClass, "h-11")}
        />
      </Field>
      <Field id={fieldId("message")} label="Message" error={errors.message}>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${fieldId("message")}-error` : undefined}
          className={cn(fieldClass, "min-h-32 py-2")}
        />
      </Field>
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-brand px-6 text-xs font-semibold tracking-[0.18em] text-white uppercase transition-colors duration-200 hover:bg-brand-strong sm:w-auto sm:min-w-64"
      >
        Submit Information
      </button>
      {ready ? (
        <p id={`${baseId}-status`} role="status" className="text-sm leading-6 text-ink">
          Your note is ready. An email to {company.email} should open on this device. If it does not, send the message
          there or call {company.phoneDisplay}.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-muted-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-[#9f1239]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
