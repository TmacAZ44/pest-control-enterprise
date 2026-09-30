import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <h1 className="font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
            Let&apos;s Elevate
            <span className="mt-1 block font-script text-6xl leading-none font-normal text-script sm:text-7xl">Your Practice</span>
            Together.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            We&apos;d love to learn more about your goals and how we can help.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact#inquire" size="lg" className="rounded-sm text-xs tracking-[0.16em] uppercase hover:bg-brand-strong">
              Get Started
            </Button>
            <Button
              href="/services"
              variant="outline"
              size="lg"
              className="rounded-sm border-brand text-xs tracking-[0.16em] text-brand uppercase hover:bg-soft hover:text-brand"
            >
              Learn More
            </Button>
          </div>
        </div>
        <Image
          src="/surgeon-at-work.jpg"
          alt="A surgeon at work in a bright operating room"
          width={1152}
          height={864}
          priority
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
