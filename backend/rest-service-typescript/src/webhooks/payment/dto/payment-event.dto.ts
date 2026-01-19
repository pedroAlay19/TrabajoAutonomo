export class PaymentEventDto {
  eventType: 'payment.method.confirmed';
  provider: string;
  status: 'confirmed';
  confirmationId: string;
  method: string;
  metadata: {
    orderId: string;
    userId: string;
  };
}
