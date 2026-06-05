'use client';

import { Button } from '@monolith/ui';
import { useMemo, useState } from 'react';
import { DateWheelPicker } from '@/components/date-wheel-picker';
import { submitBookingRequest } from '@/lib/api';
import {
  formatPreferredDate,
  getCurrentYear,
  getDaysInMonth,
  getMonthOptions,
  isValidBookingDate,
} from '@/lib/booking-date';
import { BUSINESS } from '@/lib/business-content';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

function getInitialDayAndMonth(): { day: number; monthIndex: number } {
  const today = new Date();
  return { day: today.getDate(), monthIndex: today.getMonth() };
}

function getDayOptions(monthIndex: number): number[] {
  const today = new Date();
  const maxDay = getDaysInMonth(monthIndex);
  const isCurrentMonth =
    monthIndex === today.getMonth() && getCurrentYear() === today.getFullYear();
  const minDay = isCurrentMonth ? today.getDate() : 1;

  return Array.from({ length: maxDay - minDay + 1 }, (_, index) => minDay + index);
}

export function BookingForm() {
  const initialDate = useMemo(() => getInitialDayAndMonth(), []);
  const [day, setDay] = useState(initialDate.day);
  const [monthIndex, setMonthIndex] = useState(initialDate.monthIndex);
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dayOptions = useMemo(() => getDayOptions(monthIndex), [monthIndex]);
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const preferredDate =
    hasSelectedDate && isValidBookingDate(day, monthIndex)
      ? formatPreferredDate(day, monthIndex)
      : '';

  const showContactFields = preferredDate.length > 0;
  const canSubmit =
    showContactFields &&
    customerName.trim().length > 0 &&
    (customerPhone.trim().length > 0 || customerEmail.trim().length > 0);

  function handleDayChange(nextDay: number) {
    setDay(nextDay);
  }

  function handleMonthChange(nextMonthIndex: number) {
    setMonthIndex(nextMonthIndex);
    const options = getDayOptions(nextMonthIndex);
    const lastDay = options[options.length - 1];
    if (!options.includes(day) && lastDay !== undefined) {
      setDay(lastDay);
    }
  }

  function handleDateInteract() {
    setHasSelectedDate(true);
  }

  function resetForm() {
    const nextInitial = getInitialDayAndMonth();
    setDay(nextInitial.day);
    setMonthIndex(nextInitial.monthIndex);
    setHasSelectedDate(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setSuccessMessage('');
    setFormState('idle');
  }

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
      <div className="booking-form animate-in" role="status" aria-live="polite">
        <div className="booking-form__success border-primary/30 bg-card/50 rounded-2xl border p-8 text-center sm:p-10">
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
          <h3 className="font-display text-foreground mt-6 text-2xl uppercase">Request received</h3>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{successMessage}</p>
          <Button
            type="button"
            variant="outline"
            className="mt-8 rounded-full"
            onClick={resetForm}
          >
            Book another visit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-form">
      <form className="booking-form__inner" aria-label="Appointment request" onSubmit={handleSubmit}>
        <DateWheelPicker
          day={day}
          monthIndex={monthIndex}
          dayOptions={dayOptions}
          monthOptions={monthOptions}
          onDayChange={handleDayChange}
          onMonthChange={handleMonthChange}
          onInteract={handleDateInteract}
        />

        {showContactFields && (
          <div className="booking-form__fields animate-in">
            <input
              id="customerName"
              name="customerName"
              type="text"
              autoComplete="name"
              aria-label="Your name"
              placeholder="Full name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="booking-field"
            />

            <div className="booking-form__contact-row">
              <input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                autoComplete="tel"
                aria-label="Phone"
                placeholder="Phone"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                className="booking-field"
              />
              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                autoComplete="email"
                aria-label="Email"
                placeholder="Email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                className="booking-field"
              />
            </div>

            <p className="booking-form__hint">
              Provide at least one contact method — phone or email.
            </p>
          </div>
        )}

        {formState === 'error' && (
          <div className="booking-form__error" role="alert">
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

        <div className="booking-form__submit">
          <button
            type="submit"
            disabled={!canSubmit || formState === 'submitting'}
            className="book-appointment-btn"
          >
            {formState === 'submitting' ? 'Sending request…' : 'Submit request'}
          </button>
        </div>
      </form>
    </div>
  );
}
