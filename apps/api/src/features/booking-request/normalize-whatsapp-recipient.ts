/** UK default — local booking audience for Top Turkish Barbers. */
const DEFAULT_COUNTRY_CODE = '44';

/**
 * Normalizes a phone number to WhatsApp Cloud API E.164 digits (no leading +).
 * Handles UK national (07…), international (+44), spaced formats, and 00 prefix.
 */
export function normalizeWhatsAppRecipient(phone: string): string {
  let digits = phone.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  const redundantUkTrunk = digits.match(/^44(0)(\d{9,10})$/);
  if (redundantUkTrunk) {
    digits = `${DEFAULT_COUNTRY_CODE}${redundantUkTrunk[2]}`;
  }

  if (digits.startsWith('0')) {
    return `${DEFAULT_COUNTRY_CODE}${digits.slice(1)}`;
  }

  if (digits.startsWith(DEFAULT_COUNTRY_CODE)) {
    return digits;
  }

  if (digits.length <= 10) {
    return `${DEFAULT_COUNTRY_CODE}${digits}`;
  }

  return digits;
}
