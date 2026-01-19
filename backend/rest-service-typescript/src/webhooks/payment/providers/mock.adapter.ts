import {
  PaymentProvider,
  ConfirmPaymentMethodInput,
  ConfirmPaymentMethodResult,
} from './payment-provider.interface';

export class MockAdapter implements PaymentProvider {
  async confirmPaymentMethod(
    data: ConfirmPaymentMethodInput,
  ): Promise<ConfirmPaymentMethodResult> {
    return {
      confirmationId: `mock_${Date.now()}`,
      method: data.method,
      status: 'confirmed',
    };
  }

  getProviderName(): string {
    return 'mock';
  }
}
