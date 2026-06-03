export type AppConfig = {
  nodeEnv: string;
  host: string;
  port: number;
  corsOrigin: string;
  databaseUrl: string;
  redisUrl: string;
  bullmqPrefix: string;
  logLevel: string;
  resendApiKey: string;
  bookingNotificationEmail: string;
  bookingFromEmail: string;
  whatsappAccessToken: string;
  whatsappPhoneNumberId: string;
  whatsappVerifyToken: string;
};

export default (): AppConfig => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  host: process.env.API_HOST ?? '0.0.0.0',
  port: parseInt(process.env.API_PORT ?? '3001', 10),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL ?? '',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  bullmqPrefix: process.env.BULLMQ_PREFIX ?? 'monolith',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  bookingNotificationEmail: process.env.BOOKING_NOTIFICATION_EMAIL ?? '',
  bookingFromEmail: process.env.BOOKING_FROM_EMAIL ?? 'onboarding@resend.dev',
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? '',
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? '',
  whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN ?? '',
});
