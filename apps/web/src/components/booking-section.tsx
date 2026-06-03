import { BookingForm } from '@/components/booking-form';
import { SectionHeading } from '@/components/section-heading';

export function BookingSection() {
  return (
    <section id="booking" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Booking"
          title="Request an appointment"
          lead="Select your preferred date first — your contact details will appear when you are ready."
          align="center"
        />

        <BookingForm />
      </div>
    </section>
  );
}
