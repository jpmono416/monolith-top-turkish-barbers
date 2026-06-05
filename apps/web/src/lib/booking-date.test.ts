import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  formatPreferredDate,
  getCurrentYear,
  getDaysInMonth,
  getMonthOptions,
  isValidBookingDate,
} from './booking-date';

describe('booking-date', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats preferred date as ISO date string with current year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-05T12:00:00'));

    expect(formatPreferredDate(15, 5)).toBe('2026-06-15');
    expect(getCurrentYear()).toBe(2026);
  });

  it('returns correct days in month', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-01T12:00:00'));

    expect(getDaysInMonth(1)).toBe(28);
    expect(getDaysInMonth(0)).toBe(31);
  });

  it('excludes past months from month options', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-05T12:00:00'));

    expect(getMonthOptions()).toEqual([5, 6, 7, 8, 9, 10, 11]);
  });

  it('rejects past dates and invalid day/month combinations', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-05T12:00:00'));

    expect(isValidBookingDate(5, 5)).toBe(true);
    expect(isValidBookingDate(4, 5)).toBe(false);
    expect(isValidBookingDate(31, 3)).toBe(false);
  });
});
