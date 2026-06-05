import type { ReactNode } from 'react';
import { SectionHeading } from '@/components/section-heading';
import { BUSINESS } from '@/lib/business-content';

const contactLinkClass =
  'text-foreground transition-colors duration-300 hover:text-primary hover:underline';

type ContactIconProps = {
  children: ReactNode;
};

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

function ContactIcon({ children }: ContactIconProps) {
  return (
    <span
      className="border-primary/25 bg-primary/10 text-primary inline-flex size-8 shrink-0 items-center justify-center rounded-full border"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        {children}
      </svg>
    </span>
  );
}

export function ContactSection() {
  const contactItems: ContactItem[] = [
    {
      label: 'Phone',
      value: BUSINESS.phoneDisplay,
      href: `tel:${BUSINESS.phone}`,
      icon: (
        <path
          d="M6.6 4.7 8.7 4l2.1 4.6-1.3 1.1c.9 1.8 2.3 3.2 4.1 4.1l1.1-1.3 4.6 2.1-.7 2.1c-.3.9-1.2 1.5-2.1 1.4C10.6 17.7 6.3 13.4 5.2 7.5c-.1-.9.5-1.8 1.4-2.1Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
    {
      label: 'Email',
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
      icon: (
        <>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m5 8 7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ),
    },
    {
      label: 'WhatsApp',
      value: 'Message us on WhatsApp',
      href: BUSINESS.whatsappUrl,
      external: true,
      icon: (
        <>
          <path
            d="M6.8 17.2A7.2 7.2 0 1 1 9 18.6l-3 .8.8-2.2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9.7 9.2c.3 2 1.4 3.1 3.4 3.9" strokeLinecap="round" />
        </>
      ),
    },
  ];

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Visit us" title="Find the shop" align="center" />

        <div className="mt-7 grid gap-5 sm:mt-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:gap-6">
          <article className="location-card overflow-hidden">
            <div className="border-primary/10 border-b">
              <iframe
                title="Top Turkish Barbers location map"
                src={BUSINESS.mapEmbedUrl}
                className="h-64 w-full grayscale-[30%] contrast-[1.08] saturate-[0.8] sm:h-72 lg:h-[19rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex gap-4 p-5 sm:p-6">
              <ContactIcon>
                <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z" />
                <circle cx="12" cy="11" r="2" />
              </ContactIcon>
              <address className="not-italic">
                <p className="font-display text-foreground text-xl leading-tight">{BUSINESS.name}</p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {BUSINESS.address.line1}
                  <br />
                  {BUSINESS.address.city} {BUSINESS.address.postcode}
                  <br />
                  {BUSINESS.address.country}
                </p>
                <p className="text-primary mt-3 font-display text-base italic">{BUSINESS.locationDescription}</p>
              </address>
            </div>
          </article>

          <aside className="contact-panel flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-primary text-xs font-semibold uppercase tracking-[0.24em]">
                Opening hours
              </h3>
              <ul className="mt-5 divide-y divide-border/45">
                {BUSINESS.hours.map((row) => (
                  <li key={row.day} className="flex items-center justify-between gap-5 py-3 first:pt-0 last:pb-0">
                    <span className="text-muted-foreground text-sm">{row.day}</span>
                    <span className="text-foreground text-sm tabular-nums">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-primary text-xs font-semibold uppercase tracking-[0.24em]">
                Contact
              </h3>
              <dl className="mt-5 grid gap-4">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <ContactIcon>{item.icon}</ContactIcon>
                    <div className="min-w-0">
                      <dt className="text-muted-foreground text-[0.7rem] font-medium uppercase tracking-[0.18em]">
                        {item.label}
                      </dt>
                      <dd className="mt-1 truncate text-sm sm:text-base">
                        <a
                          href={item.href}
                          className={contactLinkClass}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
