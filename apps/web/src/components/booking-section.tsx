import { BookingForm } from '@/components/booking-form';
import { SectionHeading } from '@/components/section-heading';

export function BookingSection() {
  return (
    <section id="booking" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="Booking" />

        <BookingForm />
      </div>
    </section>
  );
}
