import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './config/env.validation';
import { BookingRequestModule } from './features/booking-request/booking-request.module';
import { HealthModule } from './features/health/health.module';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { RedisModule } from './infrastructure/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    PrismaModule,
    RedisModule,
    QueueModule,
    HealthModule,
    BookingRequestModule,
  ],
})
export class AppModule {}
