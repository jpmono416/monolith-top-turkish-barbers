import { SectionHeading } from '@/components/section-heading';
import { BUSINESS } from '@/lib/business-content';

const contactLinkClass =
  'text-primary transition-colors duration-300 hover:text-primary/80 hover:underline';

export function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Visit us" title="Find the shop" />

        <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-2 md:items-start md:gap-10">
          <div className="space-y-5">
            <div className="border-border/60 overflow-hidden rounded-xl border transition-colors duration-300 hover:border-primary/25">
              <iframe
                title="Top Turkish Barbers location map"
                src={BUSINESS.mapEmbedUrl}
                className="aspect-[4/3] max-h-[16rem] w-full grayscale-[20%] contrast-[1.05] sm:max-h-[18rem] lg:max-h-[15rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <address className="text-muted-foreground space-y-1 text-base not-italic leading-relaxed sm:text-lg">
              <p className="text-foreground font-medium">{BUSINESS.name}</p>
              <p>{BUSINESS.address.line1}</p>
              <p>
                {BUSINESS.address.city}, {BUSINESS.address.postcode}
              </p>
              <p>{BUSINESS.address.country}</p>
            </address>
          </div>

          <div className="space-y-5">
            <div className="contact-panel">
              <h3 className="text-foreground text-sm font-medium uppercase tracking-[0.2em]">
                Opening hours
              </h3>
              <ul className="text-muted-foreground mt-4 space-y-2.5">
                {BUSINESS.hours.map((row) => (
                  <li key={row.day} className="flex justify-between gap-4 text-sm sm:text-base">
                    <span>{row.day}</span>
                    <span className="text-foreground tabular-nums">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-panel">
              <h3 className="text-foreground text-sm font-medium uppercase tracking-[0.2em]">
                Contact
              </h3>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a href={`tel:${BUSINESS.phone}`} className={`text-base sm:text-lg ${contactLinkClass}`}>
                      {BUSINESS.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${BUSINESS.email}`} className={`text-base sm:text-lg ${contactLinkClass}`}>
                      {BUSINESS.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={BUSINESS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-base sm:text-lg ${contactLinkClass}`}
                    >
                      Message us on WhatsApp
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
