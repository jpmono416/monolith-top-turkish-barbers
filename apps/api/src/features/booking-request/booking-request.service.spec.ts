import { ConfigService } from '@nestjs/config';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { AppConfig } from '../../config/configuration';
import { BookingRequestService } from './booking-request.service';
import type { CreateBookingRequestDto } from './dto/create-booking-request.dto';

const baseDto: CreateBookingRequestDto = {
  preferredDate: '2026-06-15',
  customerName: 'Alex Smith',
  customerEmail: 'alex@example.com',
  customerPhone: '+447700900000',
};

function createConfig(overrides: Partial<AppConfig> = {}): ConfigService<AppConfig, true> {
  const config: AppConfig = {
    nodeEnv: 'test',
    host: '0.0.0.0',
    port: 3001,
    corsOrigin: 'http://localhost:3000',
    databaseUrl: 'postgresql://test',
    redisUrl: 'redis://localhost:6379',
    bullmqPrefix: 'monolith',
    logLevel: 'error',
    resendApiKey: '',
    bookingNotificationEmail: '',
    bookingFromEmail: 'onboarding@resend.dev',
    whatsappAccessToken: '',
    whatsappPhoneNumberId: '',
    whatsappVerifyToken: '',
    ...overrides,
  };

  return {
    get: <K extends keyof AppConfig>(key: K) => config[key],
  } as ConfigService<AppConfig, true>;
}

describe('BookingRequestService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns success when providers are not configured', async () => {
    const service = new BookingRequestService(createConfig());

    const result = await service.submit(baseDto);

    expect(result.success).toBe(true);
    expect(result.message).toContain('appointment request');
  });

  it('attempts WhatsApp when credentials and phone are present', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    const service = new BookingRequestService(
      createConfig({
        whatsappAccessToken: 'test-token',
        whatsappPhoneNumberId: '123456',
      }),
    );

    await service.submit(baseDto);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/123456/messages');
    expect(init.headers).toMatchObject({
      Authorization: 'Bearer test-token',
    });
  });

  it('skips WhatsApp when customer phone is missing', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const service = new BookingRequestService(
      createConfig({
        whatsappAccessToken: 'test-token',
        whatsappPhoneNumberId: '123456',
      }),
    );

    const dto: CreateBookingRequestDto = {
      preferredDate: '2026-06-15',
      customerName: 'Alex Smith',
      customerEmail: 'alex@example.com',
    };

    await service.submit(dto);

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
