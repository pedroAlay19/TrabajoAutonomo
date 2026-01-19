import {
  Controller,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('webhooks/payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Endpoint para recibir webhooks de pago del sistema de cine
   * Este endpoint procesa el pago y envía confirmación de vuelta
   */
  @Post('receive')
  @HttpCode(HttpStatus.OK)
  async receivePaymentWebhook(@Body() payload: any) {
    this.logger.log('Webhook de pago recibido del sistema de cine');
    this.logger.debug(`Payload: ${JSON.stringify(payload)}`);

    const result = await this.paymentService.processPaymentWebhook(payload);

    return {
      status: 'success',
      message: 'Payment webhook processed and confirmation sent',
      ...result,
    };
  }
}
