import { SERVICES } from '@/lib/business-content';

export function ServicesSection() {
  return (
    <section id="services" className="border-border/40 border-t py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-primary text-sm font-medium uppercase tracking-[0.3em]">Services</p>
          <h2 className="font-display text-foreground mt-3 text-4xl sm:text-5xl">
            Crafted for every visit
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Walk-ins welcome. Appointment requests help us prepare your chair and hot towel.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li
              key={service.name}
              className="border-border/60 bg-card/40 group rounded-2xl border p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-foreground text-xl">{service.name}</h3>
                <span className="text-primary shrink-0 text-sm font-medium">{service.price}</span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
