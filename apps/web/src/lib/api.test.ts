import { describe, expect, it, vi } from 'vitest';
import { getApiHealth } from './api';

describe('getApiHealth', () => {
  it('returns null when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));

    const result = await getApiHealth();
    expect(result).toBeNull();

    vi.unstubAllGlobals();
  });
});
