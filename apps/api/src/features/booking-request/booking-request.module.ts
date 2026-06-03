import { Module } from '@nestjs/common';
import { BookingRequestController } from './booking-request.controller';
import { BookingRequestService } from './booking-request.service';

@Module({
  controllers: [BookingRequestController],
  providers: [BookingRequestService],
})
export class BookingRequestModule {}
