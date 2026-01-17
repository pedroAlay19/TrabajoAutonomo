import { Injectable, Logger } from '@nestjs/common';
import { WebhookEvent, WebhookEventStatus, WebhookEventType, WebhookPayload } from './entities/webhook-event.entity';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);
  private readonly events: Map<string, WebhookEvent> = new Map();

  /**
   * Procesa un evento de webhook recibido
   */
  async processWebhookEvent(payload: WebhookPayload): Promise<WebhookEvent> {
    const event: WebhookEvent = {
      id: this.generateId(),
      event: payload.event,
      payload,
      status: WebhookEventStatus.PENDING,
      attempts: 0,
      createdAt: new Date(),
    };

    this.events.set(event.id, event);
    this.logger.log(`Webhook event received: ${event.event} (ID: ${event.id})`);

    try {
      await this.handleEvent(event);
      event.status = WebhookEventStatus.SUCCESS;
      event.processedAt = new Date();
      this.logger.log(`Webhook event processed successfully: ${event.id}`);
    } catch (error) {
      event.status = WebhookEventStatus.FAILED;
      event.error = error.message;
      event.lastAttemptAt = new Date();
      this.logger.error(`Failed to process webhook event ${event.id}: ${error.message}`);
      throw error;
    }

    return event;
  }

  /**
   * Maneja diferentes tipos de eventos
   */
  private async handleEvent(event: WebhookEvent): Promise<void> {
    event.status = WebhookEventStatus.PROCESSING;
    event.attempts++;
    event.lastAttemptAt = new Date();

    switch (event.event) {
      case WebhookEventType.REPAIR_ORDER_CREATED:
        await this.handleRepairOrderCreated(event.payload);
        break;
      case WebhookEventType.REPAIR_ORDER_UPDATED:
        await this.handleRepairOrderUpdated(event.payload);
        break;
      case WebhookEventType.REPAIR_ORDER_COMPLETED:
        await this.handleRepairOrderCompleted(event.payload);
        break;
      case WebhookEventType.REPAIR_ORDER_CANCELLED:
        await this.handleRepairOrderCancelled(event.payload);
        break;
      case WebhookEventType.EQUIPMENT_UPDATED:
        await this.handleEquipmentUpdated(event.payload);
        break;
      case WebhookEventType.REVIEW_CREATED:
        await this.handleReviewCreated(event.payload);
        break;
      default:
        this.logger.warn(`Unknown webhook event type: ${event.event}`);
    }
  }

  private async handleRepairOrderCreated(payload: WebhookPayload): Promise<void> {
    this.logger.debug('Processing repair order created event', payload.data);
    // Lógica para manejar orden de reparación creada
  }

  private async handleRepairOrderUpdated(payload: WebhookPayload): Promise<void> {
    this.logger.debug('Processing repair order updated event', payload.data);
    // Lógica para manejar orden de reparación actualizada
  }

  private async handleRepairOrderCompleted(payload: WebhookPayload): Promise<void> {
    this.logger.debug('Processing repair order completed event', payload.data);
    // Lógica para manejar orden de reparación completada
  }

  private async handleRepairOrderCancelled(payload: WebhookPayload): Promise<void> {
    this.logger.debug('Processing repair order cancelled event', payload.data);
    // Lógica para manejar orden de reparación cancelada
  }

  private async handleEquipmentUpdated(payload: WebhookPayload): Promise<void> {
    this.logger.debug('Processing equipment updated event', payload.data);
    // Lógica para manejar equipo actualizado
  }

  private async handleReviewCreated(payload: WebhookPayload): Promise<void> {
    this.logger.debug('Processing review created event', payload.data);
    // Lógica para manejar reseña creada
  }

  /**
   * Obtiene un evento por ID
   */
  getEventById(id: string): WebhookEvent | undefined {
    return this.events.get(id);
  }

  /**
   * Obtiene todos los eventos
   */
  getAllEvents(): WebhookEvent[] {
    return Array.from(this.events.values());
  }

  /**
   * Reintenta un evento fallido
   */
  async retryEvent(id: string): Promise<WebhookEvent> {
    const event = this.events.get(id);
    if (!event) {
      throw new Error(`Event ${id} not found`);
    }

    if (event.status === WebhookEventStatus.SUCCESS) {
      throw new Error(`Event ${id} already processed successfully`);
    }

    event.status = WebhookEventStatus.RETRY;
    await this.handleEvent(event);
    event.status = WebhookEventStatus.SUCCESS;
    event.processedAt = new Date();

    return event;
  }

  private generateId(): string {
    return `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

