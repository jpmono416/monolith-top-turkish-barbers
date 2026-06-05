'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BUSINESS, NAV_LINKS } from '@/lib/business-content';

const SECTION_IDS = ['home', 'services', 'gallery', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

function getHeaderOffset(): number {
  return document.querySelector('header')?.offsetHeight ?? 88;
}

function resolveActiveSection(): SectionId {
  const anchor = window.scrollY + getHeaderOffset() + 2;
  let active: SectionId = 'home';

  for (const id of SECTION_IDS) {
    const section = document.getElementById(id);
    if (!section) {
      continue;
    }

    const top = section.getBoundingClientRect().top + window.scrollY;
    if (top <= anchor) {
      active = id;
    }
  }

  return active;
}

export function SiteHeader() {
  const pendingSectionRef = useRef<SectionId | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const syncActiveSection = () => {
      const resolved = resolveActiveSection();
      const pending = pendingSectionRef.current;

      if (pending) {
        if (resolved === pending) {
          pendingSectionRef.current = null;
        } else {
          setActiveSection(pending);
          return;
        }
      }

      setActiveSection(resolved);
    };

    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) {
        return;
      }

      scrollTicking = true;
      window.requestAnimationFrame(() => {
        syncActiveSection();
        scrollTicking = false;
      });
    };

    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (isSectionId(hash)) {
        pendingSectionRef.current = hash;
        setActiveSection(hash);
        return;
      }

      pendingSectionRef.current = null;
      syncActiveSection();
    };

    const hash = window.location.hash.replace('#', '');
    if (isSectionId(hash)) {
      pendingSectionRef.current = hash;
      setActiveSection(hash);
    } else {
      syncActiveSection();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const handleSectionSelect = (sectionId: SectionId) => {
    pendingSectionRef.current = sectionId;
    setActiveSection(sectionId);
  };

  return (
    <header className="border-primary/20 bg-background/90 sticky top-0 z-50 w-full border-b shadow-[0_1rem_2rem_hsl(0_0%_0%_/_0.18)] backdrop-blur-md">
      <div className="site-header-inner mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 sm:py-5 lg:py-6">
        <Link
          href="#home"
          className="flex shrink-0 items-center gap-3 no-underline sm:gap-4"
          aria-label={BUSINESS.name}
          onClick={() => handleSectionSelect('home')}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={56}
            height={56}
            className="site-logo"
            sizes="(min-width: 1024px) 76px, (min-width: 640px) 64px, 56px"
            priority
          />
          <span className="font-display text-primary text-xl uppercase leading-[1.02] tracking-wide sm:text-[1.65rem] lg:text-[1.9rem]">
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
            const sectionId = link.href.replace('#', '') as SectionId;
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? 'site-nav-link site-nav-link-active' : 'site-nav-link'}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleSectionSelect(sectionId)}
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
                const sectionId = link.href.replace('#', '') as SectionId;
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
                      onClick={() => handleSectionSelect(sectionId)}
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
