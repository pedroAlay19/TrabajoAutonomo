export enum WebhookEventType {
  REPAIR_ORDER_CREATED = 'repair_order.created',
  REPAIR_ORDER_UPDATED = 'repair_order.updated',
  REPAIR_ORDER_COMPLETED = 'repair_order.completed',
  REPAIR_ORDER_CANCELLED = 'repair_order.cancelled',
  EQUIPMENT_UPDATED = 'equipment.updated',
  REVIEW_CREATED = 'review.created',
}

export enum WebhookEventStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  RETRY = 'retry',
}

export interface WebhookPayload {
  event: WebhookEventType;
  timestamp: string;
  data: any;
  metadata?: Record<string, any>;
}

export class WebhookEvent {
  id: string;
  event: WebhookEventType;
  payload: WebhookPayload;
  status: WebhookEventStatus;
  attempts: number;
  lastAttemptAt?: Date;
  createdAt: Date;
  processedAt?: Date;
  error?: string;
}
