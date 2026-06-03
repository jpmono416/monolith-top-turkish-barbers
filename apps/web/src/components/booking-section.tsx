import { BookingForm } from '@/components/booking-form';

export function BookingSection() {
  return (
    <section id="booking" className="border-border/40 border-t py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-primary text-sm font-medium uppercase tracking-[0.3em]">Booking</p>
          <h2 className="font-display text-foreground mt-3 text-4xl sm:text-5xl">
            Request an appointment
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Select your preferred date first — your contact details will appear when you are ready.
          </p>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
