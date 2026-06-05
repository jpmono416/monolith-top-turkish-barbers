import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { SERVICES } from '@/lib/business-content';

const PRIMARY_ROW = SERVICES.slice(0, 4);
const SECONDARY_ROW = SERVICES.slice(4);

type Service = (typeof SERVICES)[number];

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card group w-full rounded-xl border text-center transition duration-300 hover:-translate-y-1 hover:border-primary/55 hover:bg-card/70">
      <div className="service-card__body">
        <Image
          src={service.icon}
          alt=""
          width={62}
          height={62}
          className="service-card__icon object-contain opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
        />
        <h3 className="service-card__title">{service.name}</h3>
        <p className="service-card__price" aria-label={`Price: ${service.price}`}>
          {service.price}
        </p>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Services" title="Our services" align="center" />

        <ul className="services-mobile-grid mt-7 sm:mt-8">
          {SERVICES.map((service) => (
            <li key={service.name}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <div className="services-desktop-layout mt-7 sm:mt-8">
          <ul className="services-desktop-row services-desktop-row--four">
            {PRIMARY_ROW.map((service) => (
              <li key={service.name}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
          <ul className="services-desktop-row services-desktop-row--three">
            {SECONDARY_ROW.map((service) => (
              <li key={service.name}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
