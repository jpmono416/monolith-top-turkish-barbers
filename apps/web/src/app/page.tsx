import { BookingSection } from '@/components/booking-section';
import { ContactSection } from '@/components/contact-section';
import { GallerySection } from '@/components/gallery-section';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { SiteHeader } from '@/components/site-header';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <BookingSection />
        <ContactSection />
      </main>
    </>
  );
}
