export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getDaysInMonth(monthIndex: number, year = getCurrentYear()): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function getMonthOptions(): number[] {
  const currentMonth = new Date().getMonth();
  return Array.from({ length: 12 - currentMonth }, (_, index) => currentMonth + index);
}

export function formatPreferredDate(day: number, monthIndex: number): string {
  const year = getCurrentYear();
  const month = String(monthIndex + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return `${year}-${month}-${dayStr}`;
}

export function isValidBookingDate(day: number, monthIndex: number): boolean {
  if (monthIndex < 0 || monthIndex > 11) {
    return false;
  }

  const maxDay = getDaysInMonth(monthIndex);
  if (day < 1 || day > maxDay) {
    return false;
  }

  const selected = new Date(getCurrentYear(), monthIndex, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
}
