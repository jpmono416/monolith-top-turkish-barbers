import Image from 'next/image';
import Link from 'next/link';
import { PLACEHOLDER_IMAGES } from '@/lib/business-content';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[76svh] overflow-hidden sm:min-h-[82svh] lg:min-h-[86svh]">
      <Image
        src={PLACEHOLDER_IMAGES.hero}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,_hsl(38_50%_18%_/_0.2),_transparent_42%),linear-gradient(180deg,hsl(0_0%_4%_/_0.68)_0%,hsl(0_0%_3%_/_0.82)_48%,hsl(0_0%_2%_/_0.94)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 size-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
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

      <div className="relative mx-auto flex min-h-[76svh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[82svh] sm:px-6 sm:py-24 lg:min-h-[86svh] lg:py-28">
        <p className="text-primary mb-4 text-xs font-bold uppercase tracking-[0.32em] sm:text-sm sm:tracking-[0.38em]">
          OPEN EVERY DAY
        </p>
        <p className="text-primary/90 mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] sm:mb-4 sm:text-xs sm:tracking-[0.42em]">
          TRADITION • PRECISION • PERFECTION
        </p>
        <h1 className="font-display text-foreground max-w-3xl text-[2.7rem] leading-[0.98] sm:text-6xl lg:text-7xl">
          Premium Grooming
          <span className="block">for the Modern Man</span>
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:mt-6 sm:text-lg">
          Traditional Turkish barbering, modern precision, and a welcoming experience in the heart of Shrewsbury.
        </p>
        <div className="mt-7 flex justify-center sm:mt-9">
          <Link
            href="#booking"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-12 items-center justify-center rounded-full px-9 py-3.5 text-sm font-bold uppercase tracking-[0.16em] shadow-[0_1rem_2rem_hsl(38_52%_16%_/_0.35)] transition-colors duration-300 sm:min-h-0"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
