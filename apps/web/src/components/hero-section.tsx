import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS, PLACEHOLDER_IMAGES } from '@/lib/business-content';

export function HeroSection() {
  return (
    <section className="relative min-h-[76svh] overflow-hidden sm:min-h-[82svh] lg:min-h-[86svh]">
      <Image
        src={PLACEHOLDER_IMAGES.hero}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_hsl(38_45%_22%_/_0.4),_transparent_50%),radial-gradient(ellipse_at_80%_20%,_hsl(38_30%_12%_/_0.25),_transparent_45%),linear-gradient(180deg,hsl(0_0%_6%_/_0.75)_0%,hsl(0_0%_3%_/_0.92)_100%)]"
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

      <div className="relative mx-auto flex max-w-6xl min-h-[76svh] flex-col justify-center px-4 py-20 sm:min-h-[82svh] sm:px-6 sm:py-24 lg:min-h-[86svh] lg:py-28">
        <p className="text-primary mb-2 text-xs font-medium uppercase tracking-[0.28em] sm:mb-3 sm:text-sm sm:tracking-[0.35em]">
          Shrewsbury · Turkish barbering
        </p>
        <h1 className="font-display text-foreground max-w-3xl text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-6xl">
          {BUSINESS.name}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed sm:mt-5 sm:text-lg">
          <span className="text-foreground font-medium">{BUSINESS.tagline}.</span>{' '}
          {BUSINESS.description}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="#booking"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 sm:min-h-0"
          >
            Request appointment
          </Link>
          <Link
            href="#services"
            className="border-border text-foreground hover:border-primary/60 inline-flex min-h-12 items-center justify-center rounded-full border px-8 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 sm:min-h-0"
          >
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
