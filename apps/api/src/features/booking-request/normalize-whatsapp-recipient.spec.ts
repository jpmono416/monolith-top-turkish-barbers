import { describe, expect, it } from 'vitest';
import { normalizeWhatsAppRecipient } from './normalize-whatsapp-recipient';

describe('normalizeWhatsAppRecipient', () => {
  it('converts UK national format with leading 0', () => {
    expect(normalizeWhatsAppRecipient('07761387450')).toBe('447761387450');
  });

  it('converts spaced UK national format', () => {
    expect(normalizeWhatsAppRecipient('07784 300 001')).toBe('447784300001');
  });

  it('converts international format with plus and spaces', () => {
    expect(normalizeWhatsAppRecipient('+44 7761 387450')).toBe('447761387450');
  });

  it('converts international format without plus', () => {
    expect(normalizeWhatsAppRecipient('44 7761 387450')).toBe('447761387450');
  });

  it('converts subscriber number without country code or trunk', () => {
    expect(normalizeWhatsAppRecipient('7761387450')).toBe('447761387450');
  });

  it('converts 00 international dialling prefix', () => {
    expect(normalizeWhatsAppRecipient('0044 7761 387450')).toBe('447761387450');
  });

  it('converts formatted national number with punctuation', () => {
    expect(normalizeWhatsAppRecipient('(07761) 387-450')).toBe('447761387450');
  });

  it('fixes redundant trunk 0 after country code', () => {
    expect(normalizeWhatsAppRecipient('4407761387450')).toBe('447761387450');
  });

  it('preserves already-normalized E.164 digits', () => {
    expect(normalizeWhatsAppRecipient('447761387450')).toBe('447761387450');
  });

  it('preserves non-UK international numbers', () => {
    expect(normalizeWhatsAppRecipient('+1 555 123 4567')).toBe('15551234567');
  });

  it('returns empty string for blank input', () => {
    expect(normalizeWhatsAppRecipient('   ')).toBe('');
  });
});
