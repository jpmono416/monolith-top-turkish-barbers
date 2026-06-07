import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { BookingRequestResponse } from '@monolith/types';
import { Resend } from 'resend';
import type { AppConfig } from '../../config/configuration';
import type { CreateBookingRequestDto } from './dto/create-booking-request.dto';
import { normalizeWhatsAppRecipient } from './normalize-whatsapp-recipient';

@Injectable()
export class BookingRequestService {
  private readonly logger = new Logger(BookingRequestService.name);

  constructor(private readonly config: ConfigService<AppConfig, true>) {}

  async submit(dto: CreateBookingRequestDto): Promise<BookingRequestResponse> {
    const summary = this.buildSummary(dto);

    this.logger.log('Booking request received');

    await this.sendNotificationEmail(summary, dto);
    await this.sendWhatsAppConfirmation(summary, dto);

    return {
      success: true,
      message:
        'Your appointment request has been received. We will confirm your booking shortly.',
    };
  }

  private buildSummary(dto: CreateBookingRequestDto): string {
    const lines = [
      `Preferred date: ${dto.preferredDate}`,
      `Name: ${dto.customerName}`,
    ];

    if (dto.customerPhone?.trim()) {
      lines.push(`Phone: ${dto.customerPhone.trim()}`);
    }

    if (dto.customerEmail?.trim()) {
      lines.push(`Email: ${dto.customerEmail.trim()}`);
    }

    return lines.join('\n');
  }

  private async sendNotificationEmail(
    summary: string,
    dto: CreateBookingRequestDto,
  ): Promise<void> {
    const apiKey = this.config.get('resendApiKey', { infer: true });
    const notificationEmail = this.config.get('bookingNotificationEmail', {
      infer: true,
    });

    if (!apiKey || !notificationEmail) {
      this.logger.warn('Resend email skipped: API key or notification email not configured');
      return;
    }

    const fromEmail = this.config.get('bookingFromEmail', { infer: true });
    const resend = new Resend(apiKey);
    const recipients = new Set<string>([notificationEmail]);

    const customerEmail = dto.customerEmail?.trim();
    if (customerEmail) {
      recipients.add(customerEmail);
    }

    this.logger.log('Sending booking notification email');

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [...recipients],
      subject: 'New appointment request — Top Turkish Barbers',
      text: `A new appointment request was submitted.\n\n${summary}`,
    });

    if (error) {
      this.logger.error(`Resend email delivery failed: ${error.message}`);
      return;
    }

    this.logger.log('Booking notification email sent');
  }

  private async sendWhatsAppConfirmation(
    summary: string,
    dto: CreateBookingRequestDto,
  ): Promise<void> {
    const accessToken = this.config.get('whatsappAccessToken', { infer: true });
    const phoneNumberId = this.config.get('whatsappPhoneNumberId', { infer: true });
    const customerPhone = dto.customerPhone?.trim();

    if (!accessToken || !phoneNumberId) {
      this.logger.warn('WhatsApp delivery skipped: credentials not configured');
      return;
    }

    if (!customerPhone) {
      this.logger.warn('WhatsApp delivery skipped: no customer phone provided');
      return;
    }

    const to = normalizeWhatsAppRecipient(customerPhone);
    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

    this.logger.log('Sending WhatsApp booking confirmation');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: {
            body: `Thank you for your appointment request with Top Turkish Barbers.\n\n${summary}\n\nWe will be in touch shortly to confirm your booking.`,
          },
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        this.logger.warn(`WhatsApp delivery failed (${response.status}): ${body}`);
        return;
      }

      this.logger.log('WhatsApp booking confirmation sent');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.warn(`WhatsApp delivery failed: ${message}`);
    }
  }

}
