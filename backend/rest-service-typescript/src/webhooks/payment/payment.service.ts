import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MockAdapter } from './providers/mock.adapter';
import { ConfirmPaymentMethodInput } from './providers/payment-provider.interface';
import { WebhooksService } from '../webhooks.service';
import { PaymentEventDto } from './dto/payment-event.dto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly mockAdapter: MockAdapter;

  constructor(
    private readonly httpService: HttpService,
    private readonly webhooksService: WebhooksService,
  ) {
    this.mockAdapter = new MockAdapter();
  }

  /**
   * Procesa el webhook de pago recibido del cine
   * Confirma el método de pago y envía confirmación de vuelta
   */
  async processPaymentWebhook(webhookData: any): Promise<any> {
    this.logger.log('Procesando webhook de pago del cine');
    
    const { event, data } = webhookData;

    // Validar que es un evento de pago
    if (!event || !event.includes('payment')) {
      this.logger.warn(`Evento no es de pago: ${event}`);
      return { status: 'ignored', message: 'Not a payment event' };
    }

    // Extraer información del pago
    const paymentData = data;
    this.logger.log(`Datos del pago: ${JSON.stringify(paymentData)}`);

    // Punto 1: Confirmar método de pago usando MockAdapter
    const confirmationInput: ConfirmPaymentMethodInput = {
      method: paymentData.provider || 'mock',
      orderId: paymentData.id_reserva || paymentData.metadata?.orderId || 'unknown',
      userId: paymentData.metadata?.userId || 'unknown',
    };

    const confirmationResult = await this.mockAdapter.confirmPaymentMethod(
      confirmationInput,
    );

    this.logger.log(
      `Método de pago confirmado: ${JSON.stringify(confirmationResult)}`,
    );

    // Preparar evento de confirmación para enviar de vuelta al cine
    const paymentEvent: PaymentEventDto = {
      eventType: 'payment.method.confirmed',
      provider: this.mockAdapter.getProviderName(),
      status: 'confirmed',
      confirmationId: confirmationResult.confirmationId,
      method: confirmationResult.method,
      metadata: {
        orderId: confirmationInput.orderId,
        userId: confirmationInput.userId,
      },
    };

    // Enviar confirmación de vuelta al cine
    await this.sendConfirmationToCinema(paymentEvent);

    return {
      status: 'processed',
      confirmation: confirmationResult,
      eventSent: paymentEvent,
    };
  }

  /**
   * Envía la confirmación del método de pago de vuelta al sistema del cine
   */
  private async sendConfirmationToCinema(
    paymentEvent: PaymentEventDto,
  ): Promise<void> {
    try {
      // Usar el servicio de webhooks para notificar a los partners (cine)
      await this.webhooksService.notifyPartnersOfEvent(
        paymentEvent.eventType,
        paymentEvent,
      );

      this.logger.log('Confirmación enviada exitosamente al cine');
    } catch (error) {
      this.logger.error(
        `Error al enviar confirmación al cine: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
