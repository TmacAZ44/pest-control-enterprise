import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { SignatureBand } from "@/components/marketing/signature-band";
import { SocialLinks } from "@/components/marketing/social-links";
import { company } from "@/lib/company";
import { ContactForm } from "@/features/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk with RevUp Consulting Arizona about marketing for your surgical practice. Scottsdale, and nationwide.",
};

const details = [
  {
    icon: MapPin,
    label: "Address",
    content: (
      <>
        <span className="block font-medium text-ink">{company.name}</span>
        <span className="block">{company.city}, {company.region}</span>
        <span className="block">{company.serviceArea}</span>
      </>
    ),
  },
  {
    icon: Phone,
    label: "Phone",
    content: (
      <a className="font-medium text-ink hover:text-brand" href={`tel:${company.phoneTel}`}>
        {company.phoneDisplay}
      </a>
    ),
  },
  {
    icon: Mail,
    label: "Email",
    content: (
      <a className="font-medium text-ink hover:text-brand" href={`mailto:${company.email}`}>
        {company.email}
      </a>
    ),
  },
  {
    icon: Globe,
    label: "Website",
    content: (
      <a className="font-medium text-ink hover:text-brand" href={company.websiteUrl}>
        {company.websiteDisplay}
      </a>
    ),
  },
  {
    icon: Clock,
    label: "Business hours",
    content: <span className="font-medium text-ink">{company.hours}</span>,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div>
            <p className="font-script text-4xl leading-none text-script sm:text-5xl">Contact</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">Let&apos;s talk about your practice.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              We&apos;d love to learn more about your goals and how we can help.
            </p>
          </div>
          <Image
            src="/office-sharp.jpg"
            alt="A bright medical office reception with teal artwork"
            width={1280}
            height={720}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>
      <section id="inquire" className="scroll-mt-28 border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-0 lg:px-8 lg:py-20">
          <div className="lg:pr-12">
            <h2 className="font-display text-3xl text-brand">Contact Information</h2>
            <ul className="mt-8 space-y-6">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-soft text-brand">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{item.label}</p>
                      <div className="mt-1 text-sm leading-6 text-muted-foreground">{item.content}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10">
              <SocialLinks />
            </div>
          </div>
          <div className="lg:border-l lg:border-border lg:pl-12">
            <ContactForm />
          </div>
        </div>
      </section>
      <SignatureBand cta={false} />
    </>
  );
}
