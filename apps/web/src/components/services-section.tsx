import { SectionHeading } from '@/components/section-heading';
import { SERVICES } from '@/lib/business-content';

export function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Crafted for every visit"
          lead="Walk-ins welcome. Appointment requests help us prepare your chair and hot towel."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <article
              key={service.name}
              className="service-card border-border/50 group flex min-h-[7.5rem] flex-col justify-between rounded-xl border p-4 transition-colors duration-300 hover:border-primary/35 sm:min-h-[8rem] sm:p-5"
            >
              <h3 className="font-display text-foreground pr-2 text-base leading-snug sm:text-lg">
                {service.name}
              </h3>
              <p
                className="text-primary font-display mt-3 text-2xl tabular-nums tracking-tight sm:mt-4 sm:text-[1.75rem]"
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
