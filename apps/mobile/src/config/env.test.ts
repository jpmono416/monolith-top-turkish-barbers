import { describe, expect, it } from 'vitest';
import { API_URL } from './env';

describe('env', () => {
  it('exposes a default API URL', () => {
    expect(API_URL).toBeTruthy();
  });
});
