export type AppConfig = {
  nodeEnv: string;
  host: string;
  port: number;
  corsOrigin: string;
  databaseUrl: string;
  redisUrl: string;
  bullmqPrefix: string;
  logLevel: string;
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
});
