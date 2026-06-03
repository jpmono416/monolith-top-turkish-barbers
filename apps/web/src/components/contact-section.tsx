import { BUSINESS } from '@/lib/business-content';

export function ContactSection() {
  return (
    <section id="contact" className="border-border/40 border-t py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-primary text-sm font-medium uppercase tracking-[0.3em]">Visit us</p>
            <h2 className="font-display text-foreground mt-3 text-4xl sm:text-5xl">
              Find the shop
            </h2>
            <address className="text-muted-foreground mt-6 space-y-1 text-lg not-italic leading-relaxed">
              <p>{BUSINESS.address.line1}</p>
              <p>
                {BUSINESS.address.city}, {BUSINESS.address.postcode}
              </p>
              <p>{BUSINESS.address.country}</p>
            </address>

            <dl className="mt-8 space-y-4">
              <div>
                <dt className="text-foreground text-sm font-medium">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="text-primary text-lg hover:underline"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-foreground text-sm font-medium">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="text-primary text-lg hover:underline"
                  >
                    {BUSINESS.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-foreground text-sm font-medium">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    href={BUSINESS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-lg hover:underline"
                  >
                    Message us on WhatsApp
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <h3 className="text-foreground text-sm font-medium uppercase tracking-widest">
                Opening hours
              </h3>
              <ul className="text-muted-foreground mt-4 space-y-2">
                {BUSINESS.hours.map((row) => (
                  <li key={row.day} className="flex justify-between gap-4 text-sm sm:text-base">
                    <span>{row.day}</span>
                    <span className="text-foreground">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-border/60 overflow-hidden rounded-2xl border">
            <iframe
              title="Top Turkish Barbers location map"
              src={BUSINESS.mapEmbedUrl}
              className="aspect-[4/3] min-h-[280px] w-full grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
