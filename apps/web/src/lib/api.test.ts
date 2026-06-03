import { describe, expect, it, vi, afterEach } from 'vitest';
import { getApiHealth, submitBookingRequest } from './api';

describe('getApiHealth', () => {
  it('returns null when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));

    const result = await getApiHealth();
    expect(result).toBeNull();

    vi.unstubAllGlobals();
  });
});

describe('submitBookingRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns booking response on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Your appointment request has been received.',
        }),
      }),
    );

    const result = await submitBookingRequest({
      preferredDate: '2026-06-15',
      customerName: 'Alex Smith',
      customerEmail: 'alex@example.com',
    });

    expect(result?.success).toBe(true);
    expect(result?.message).toContain('appointment request');
  });

  it('returns null when the API responds with an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    const result = await submitBookingRequest({
      preferredDate: '2026-06-15',
      customerName: 'Alex Smith',
      customerPhone: '+447700900000',
    });

    expect(result).toBeNull();
  });
});
