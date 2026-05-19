import { describe, expect, it } from 'vitest';
import { HealthService } from './health.service';

describe('HealthService', () => {
  it('returns ok status', () => {
    const service = new HealthService();
    const result = service.getHealth();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('api');
    expect(result.timestamp).toBeDefined();
  });
});
