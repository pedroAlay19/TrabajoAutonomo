export interface ConfirmPaymentMethodInput {
  method: string;
  orderId: string;
  userId: string;
}

export interface ConfirmPaymentMethodResult {
  confirmationId: string;
  method: string;
  status: 'confirmed' | 'rejected';
}

export interface PaymentProvider {
  confirmPaymentMethod(
    data: ConfirmPaymentMethodInput,
  ): Promise<ConfirmPaymentMethodResult>;

  getProviderName(): string;
}



