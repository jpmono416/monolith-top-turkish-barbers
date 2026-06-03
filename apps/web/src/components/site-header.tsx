import Link from 'next/link';
import { BUSINESS, NAV_LINKS } from '@/lib/business-content';

export function SiteHeader() {
  return (
    <header className="border-border/50 bg-background/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-primary text-xl tracking-wide sm:text-2xl">
          {BUSINESS.name}
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-medium tracking-wide md:flex"
          aria-label="Main"
        >
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

        <Link
          href="#booking"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 py-2 text-sm font-medium transition-colors md:hidden"
        >
          Book now
        </Link>
      </div>
    </header>
  );
}
