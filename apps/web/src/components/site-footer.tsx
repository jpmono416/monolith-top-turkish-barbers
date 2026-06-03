import Link from 'next/link';
import { BUSINESS, NAV_LINKS } from '@/lib/business-content';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/40 border-t py-12 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:gap-8 md:flex-row md:items-end md:justify-between sm:px-6">
        <div>
          <p className="font-display text-primary text-xl">{BUSINESS.name}</p>
          <p className="text-muted-foreground mt-2 text-sm">
            {BUSINESS.address.line1}, {BUSINESS.address.city}
          </p>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-muted-foreground text-xs sm:text-right">
          © {year} {BUSINESS.name}. Demo site by Monolith.
        </p>
      </div>
    </footer>
  );
}
