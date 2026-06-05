'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BUSINESS, NAV_LINKS } from '@/lib/business-content';

const SECTION_IDS = ['home', 'services', 'gallery', 'contact'] as const;

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState<(typeof SECTION_IDS)[number]>('home');

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextSection = visible[0]?.target.id;
        if (nextSection && SECTION_IDS.includes(nextSection as (typeof SECTION_IDS)[number])) {
          setActiveSection(nextSection as (typeof SECTION_IDS)[number]);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="border-primary/20 bg-background/90 sticky top-0 z-50 border-b shadow-[0_1rem_2rem_hsl(0_0%_0%_/_0.18)] backdrop-blur-md">
      <div className="site-header-inner mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 sm:py-5 lg:py-6">
        <Link
          href="#home"
          className="flex shrink-0 items-center gap-3 no-underline sm:gap-4"
          aria-label={BUSINESS.name}
        >
          <span className="relative block size-14 shrink-0 overflow-hidden sm:size-16 lg:size-[4.75rem]">
            <Image
              src="/images/logo.png"
              alt=""
              fill
              sizes="76px"
              className="object-cover object-center"
              priority
            />
          </span>
          <span className="font-display text-primary text-xl leading-[1.02] tracking-wide sm:text-[1.65rem] lg:text-[1.9rem]">
            {BUSINESS.name.split(' ').map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </span>
        </Link>

        <nav
          className="site-desktop-nav items-center gap-8 text-sm font-medium uppercase tracking-[0.14em]"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '') as (typeof SECTION_IDS)[number];
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? 'site-nav-link site-nav-link-active' : 'site-nav-link'}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="#booking" className="book-appointment-btn">
            Book Appointment
          </Link>
        </nav>

        <details className="site-mobile-menu group relative">
          <summary
            className="text-foreground hover:text-primary list-none cursor-pointer rounded-full border border-border px-4 py-2.5 text-sm font-medium no-underline transition-colors [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            Menu
          </summary>
          <nav
            className="border-border/60 bg-background/95 absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[12rem] rounded-2xl border p-3 shadow-xl backdrop-blur-md"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '') as (typeof SECTION_IDS)[number];
                const isActive = activeSection === sectionId;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium no-underline transition-colors ${
                        isActive
                          ? 'text-primary bg-accent/30'
                          : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="border-border/60 mt-1 border-t pt-1">
                <Link href="#booking" className="book-appointment-btn book-appointment-btn-block">
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
