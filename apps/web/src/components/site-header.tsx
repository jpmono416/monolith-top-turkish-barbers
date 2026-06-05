import Link from 'next/link';
import { BUSINESS, NAV_LINKS } from '@/lib/business-content';

export function SiteHeader() {
  return (
    <header className="border-primary/20 bg-background/90 sticky top-0 z-50 border-b shadow-[0_1rem_2rem_hsl(0_0%_0%_/_0.18)] backdrop-blur-md">
      <div className="site-header-inner mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 sm:py-5 lg:py-6">
        <Link
          href="#home"
          className="font-display text-primary max-w-[12rem] text-lg leading-tight tracking-wide sm:max-w-none sm:text-2xl lg:text-[1.7rem]"
        >
          {BUSINESS.name}
        </Link>

        <nav
          className="site-desktop-nav items-center gap-8 text-sm font-medium uppercase tracking-[0.14em]"
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
          <Link
            href="#booking"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 text-xs font-bold tracking-[0.16em] shadow-[0_0.75rem_1.5rem_hsl(38_52%_20%_/_0.28)] transition-colors"
          >
            Book Appointment
          </Link>
        </nav>

        <details className="site-mobile-menu group relative">
          <summary
            className="text-foreground hover:text-primary list-none cursor-pointer rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            Menu
          </summary>
          <nav
            className="border-border/60 bg-background/95 absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[12rem] rounded-2xl border p-3 shadow-xl backdrop-blur-md"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary hover:bg-accent/50 block rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-border/60 mt-1 border-t pt-1">
                <Link
                  href="#booking"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
