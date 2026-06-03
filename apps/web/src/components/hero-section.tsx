import Link from 'next/link';
import { BUSINESS } from '@/lib/business-content';

export function HeroSection() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden sm:min-h-[88svh]">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_hsl(38_45%_22%_/_0.4),_transparent_50%),radial-gradient(ellipse_at_80%_20%,_hsl(38_30%_12%_/_0.25),_transparent_45%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="barber-pole-accent absolute inset-y-0 left-0 w-1 opacity-50 sm:opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl min-h-[92svh] flex-col justify-end px-4 pb-20 pt-24 sm:min-h-[88svh] sm:px-6 sm:pb-24 sm:pt-32">
        <p className="text-primary mb-3 text-xs font-medium uppercase tracking-[0.28em] sm:mb-4 sm:text-sm sm:tracking-[0.35em]">
          Shrewsbury · Turkish barbering
        </p>
        <h1 className="font-display text-foreground max-w-3xl text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl">
          {BUSINESS.name}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed sm:mt-6 sm:text-xl">
          <span className="text-foreground font-medium">{BUSINESS.tagline}.</span>{' '}
          {BUSINESS.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="#booking"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors sm:min-h-0"
          >
            Request appointment
          </Link>
          <Link
            href="#services"
            className="border-border text-foreground hover:border-primary/60 inline-flex min-h-12 items-center justify-center rounded-full border px-8 py-3.5 text-sm font-medium tracking-wide transition-colors sm:min-h-0"
          >
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
