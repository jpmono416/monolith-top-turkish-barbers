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
            Choose your preferred date and leave your details — we will confirm by email and
            WhatsApp.
          </p>
        </div>

        <div className="border-border/60 bg-card/30 mx-auto mt-12 max-w-lg rounded-2xl border p-6 sm:p-8">
          <form className="space-y-5" aria-label="Appointment request">
            <div>
              <label htmlFor="preferredDate" className="text-foreground mb-2 block text-sm font-medium">
                Preferred date
              </label>
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                className="border-input bg-background text-foreground focus:ring-primary w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor="customerName" className="text-foreground mb-2 block text-sm font-medium">
                Your name
              </label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="customerPhone" className="text-foreground mb-2 block text-sm font-medium">
                Phone <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                autoComplete="tel"
                placeholder="+44 ..."
                className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="customerEmail" className="text-foreground mb-2 block text-sm font-medium">
                Email <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Provide at least one contact method — phone or email.
            </p>
            <button
              type="button"
              disabled
              className="bg-primary/50 text-primary-foreground w-full cursor-not-allowed rounded-full py-3 text-sm font-semibold tracking-wide"
            >
              Submit request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
