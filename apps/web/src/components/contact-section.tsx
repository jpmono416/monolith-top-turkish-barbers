import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { VisitUsMap } from '@/components/visit-us-map';
import { BUSINESS } from '@/lib/business-content';

const contactLinkClass =
  'text-foreground transition-colors duration-300 hover:text-primary hover:underline';

const iconClass = 'text-primary size-5 shrink-0';

type ContactItem = {
  value: string;
  href: string;
  icon: typeof Phone;
  external?: boolean;
};

export function ContactSection() {
  const contactItems: ContactItem[] = [
    {
      value: BUSINESS.phoneDisplay,
      href: `tel:${BUSINESS.phone}`,
      icon: Phone,
    },
    {
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
      icon: Mail,
    },
    {
      value: 'WhatsApp',
      href: BUSINESS.whatsappUrl,
      icon: MessageCircle,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="Visit Us" />

        <div className="section-content">
          <div className="visit-us-card">
            <div className="visit-us-card__grid">
            <div className="visit-us-card__column visit-us-card__column--location">
              <VisitUsMap lat={BUSINESS.mapCoordinates.lat} lng={BUSINESS.mapCoordinates.lng} />
              <div className="visit-us-card__rule" aria-hidden="true" />
              <div className="visit-us-card__address">
                <div className="flex gap-3.5">
                  <MapPin className={iconClass} strokeWidth={1.75} aria-hidden />
                  <div className="min-w-0">
                    <address className="text-foreground not-italic text-sm leading-relaxed sm:text-base">
                      {BUSINESS.address.line1}
                      <br />
                      {BUSINESS.address.city} {BUSINESS.address.postcode}
                    </address>
                    <p className="text-accent-foreground font-display mt-2.5 text-sm italic sm:text-base">
                      {BUSINESS.locationDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="visit-us-card__column visit-us-card__column--details">
              <div>
                <h3 className="visit-us-card__heading">Opening Hours</h3>
                <dl className="visit-us-card__hours">
                  {BUSINESS.hours.map((row) => (
                    <div key={row.day} className="visit-us-card__hours-row">
                      <dt className="text-foreground text-sm sm:text-base">{row.day}</dt>
                      <dd className="text-muted-foreground text-sm tabular-nums sm:text-base">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="visit-us-card__heading">Contact</h3>
                <ul className="visit-us-card__contacts">
                  {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <li key={item.value} className="visit-us-card__contact-row">
                        <Icon className={iconClass} strokeWidth={1.75} aria-hidden />
                        <a
                          href={item.href}
                          className={`min-w-0 truncate text-sm sm:text-base ${contactLinkClass}`}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
