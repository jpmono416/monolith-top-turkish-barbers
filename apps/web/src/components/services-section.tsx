import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { SERVICES } from '@/lib/business-content';

export function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Our services"
          align="center"
        />

        <div className="mx-auto mt-7 flex max-w-5xl flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4">
          {SERVICES.map((service) => (
            <article
              key={service.name}
              className="service-card group flex min-h-[10.25rem] w-[calc(50%_-_0.375rem)] flex-col items-center justify-between rounded-xl border px-4 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/55 hover:bg-card/70 sm:min-h-[11rem] sm:w-40 sm:px-5 sm:py-6 md:w-44"
            >
              <Image
                src={service.icon}
                alt=""
                width={56}
                height={56}
                className="size-12 object-contain opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100 sm:size-14"
              />
              <h3 className="font-display text-foreground mt-3 text-base leading-tight sm:text-lg">
                {service.name}
              </h3>
              <p
                className="text-primary font-display mt-3 text-2xl leading-none tabular-nums tracking-tight sm:text-[1.75rem]"
                aria-label={`Price: ${service.price}`}
              >
                {service.price}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
