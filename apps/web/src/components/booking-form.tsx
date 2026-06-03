'use client';

import { Button } from '@monolith/ui';
import { useMemo, useState } from 'react';
import { submitBookingRequest } from '@/lib/api';
import { BUSINESS } from '@/lib/business-content';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

function getMinDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function BookingForm() {
  const minDate = useMemo(() => getMinDate(), []);
  const [preferredDate, setPreferredDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const showContactFields = preferredDate.length > 0;
  const canSubmit =
    showContactFields &&
    customerName.trim().length > 0 &&
    (customerPhone.trim().length > 0 || customerEmail.trim().length > 0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || formState === 'submitting') {
      return;
    }

    setFormState('submitting');
    setErrorMessage('');

    const result = await submitBookingRequest({
      preferredDate,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || undefined,
      customerEmail: customerEmail.trim() || undefined,
    });

    if (!result?.success) {
      setFormState('error');
      setErrorMessage(
        'We could not send your request right now. Please try again or contact us directly.',
      );
      return;
    }

    setSuccessMessage(result.message);
    setFormState('success');
  }

  if (formState === 'success') {
    return (
      <div
        className="animate-in mx-auto max-w-lg"
        role="status"
        aria-live="polite"
      >
        <div className="border-primary/30 bg-card/50 rounded-2xl border p-8 text-center sm:p-10">
          <div className="bg-primary/15 text-primary mx-auto flex size-14 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-7"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-foreground mt-6 text-2xl">Request received</h3>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{successMessage}</p>
          <Button
            type="button"
            variant="outline"
            className="mt-8 rounded-full"
            onClick={() => {
              setPreferredDate('');
              setCustomerName('');
              setCustomerPhone('');
              setCustomerEmail('');
              setSuccessMessage('');
              setFormState('idle');
            }}
          >
            Book another visit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-border/60 bg-card/30 mx-auto mt-12 max-w-lg rounded-2xl border p-6 sm:p-8">
      <form className="space-y-5" aria-label="Appointment request" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="preferredDate" className="text-foreground mb-2 block text-sm font-medium">
            Preferred date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={minDate}
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
            className="border-input bg-background text-foreground focus:ring-primary w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
          />
        </div>

        {showContactFields && (
          <div className="animate-in space-y-5">
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
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="animate-in" style={{ animationDelay: '75ms' }}>
              <label
                htmlFor="customerPhone"
                className="text-foreground mb-2 block text-sm font-medium"
              >
                Phone <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                autoComplete="tel"
                placeholder="+44 ..."
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="animate-in" style={{ animationDelay: '150ms' }}>
              <label
                htmlFor="customerEmail"
                className="text-foreground mb-2 block text-sm font-medium"
              >
                Email <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed">
              Provide at least one contact method — phone or email.
            </p>
          </div>
        )}

        {formState === 'error' && (
          <div className="space-y-2" role="alert">
            <p className="text-destructive text-sm">{errorMessage}</p>
            <p className="text-muted-foreground text-sm">
              Or{' '}
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                message us on WhatsApp
              </a>{' '}
              to book directly.
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={!canSubmit || formState === 'submitting'}
          className="w-full rounded-full py-6 text-sm font-semibold tracking-wide"
        >
          {formState === 'submitting' ? 'Sending request…' : 'Submit request'}
        </Button>
      </form>
    </div>
  );
}
