import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import type { BookingRequestResponse } from '@monolith/types';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../../config/configuration';
import { BookingRequestService } from './booking-request.service';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';

@Controller('booking-request')
export class BookingRequestController {
  constructor(
    private readonly bookingRequestService: BookingRequestService,
    private readonly config: ConfigService<AppConfig, true>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBookingRequestDto): Promise<BookingRequestResponse> {
    return this.bookingRequestService.submit(dto);
  }

  @Get('whatsapp/webhook')
  verifyWhatsAppWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') verifyToken: string,
    @Query('hub.challenge') challenge: string,
  ): string {
    const expectedToken = this.config.get('whatsappVerifyToken', { infer: true });

    if (mode === 'subscribe' && verifyToken === expectedToken && expectedToken) {
      return challenge;
    }

    return '';
  }
}
