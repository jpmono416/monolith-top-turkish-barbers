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
        className="absolute inset-0 bg-[linear-gradient(180deg,hsl(0_0%_0%_/_0.78)_0%,hsl(0_0%_0%_/_0.42)_28%,hsl(0_0%_0%_/_0.22)_50%,hsl(0_0%_0%_/_0.42)_72%,hsl(0_0%_0%_/_0.82)_100%)]"
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
        <p className="text-primary/90 mb-4 text-sm font-semibold uppercase tracking-[0.34em] sm:mb-5 sm:text-base sm:tracking-[0.42em]">
          TRADITION • PRECISION • PERFECTION
        </p>
        <h1 className="font-display text-foreground max-w-3xl text-[3rem] leading-[0.98] sm:text-[3.75rem] lg:text-[4.5rem]">
          Premium Grooming
          <span className="block">for the Modern Man</span>
        </h1>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-white sm:mt-3 sm:text-xl">
          Traditional Turkish barbering, modern precision, <span className="block">and a welcoming experience in the heart of Shrewsbury.</span>
        </p>
        <div className="mt-7 flex flex-col items-center gap-4 sm:mt-9 sm:gap-5">
          <Link href="#booking" className="book-appointment-btn">
            Book Appointment
          </Link>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.32em] sm:text-sm sm:tracking-[0.38em]">
            OPEN EVERY DAY
          </p>
        </div>
      </div>
    </section>
  );
}
