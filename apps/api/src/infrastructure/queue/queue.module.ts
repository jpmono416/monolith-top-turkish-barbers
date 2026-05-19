import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../../config/configuration';
import { QUEUE_NAMES } from './queue.constants';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        connection: {
          url: config.get('redisUrl', { infer: true }),
        },
        prefix: config.get('bullmqPrefix', { infer: true }),
      }),
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.default,
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
