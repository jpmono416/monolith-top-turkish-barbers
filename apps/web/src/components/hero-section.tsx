import Link from 'next/link';
import { BUSINESS } from '@/lib/business-content';

export function HeroSection() {
  return (
    <section className="relative min-h-[88svh] overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(38_45%_18%_/_0.35),_transparent_55%),linear-gradient(180deg,hsl(0_0%_6%)_0%,hsl(0_0%_3%)_100%)]"
        aria-hidden
      />
      <div
        className="barber-pole-accent absolute inset-y-0 left-0 w-1 opacity-60"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36">
        <p className="text-primary mb-4 text-sm font-medium uppercase tracking-[0.35em]">
          Shrewsbury · Turkish barbering
        </p>
        <h1 className="font-display text-foreground max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          {BUSINESS.name}
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
          {BUSINESS.tagline}. {BUSINESS.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="#booking"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold tracking-wide transition-colors"
          >
            Request appointment
          </Link>
          <Link
            href="#services"
            className="border-border text-foreground hover:border-primary/60 inline-flex items-center justify-center rounded-full border px-8 py-3 text-sm font-medium tracking-wide transition-colors"
          >
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
