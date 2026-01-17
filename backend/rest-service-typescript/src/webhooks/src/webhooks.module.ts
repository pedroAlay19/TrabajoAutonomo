import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhooksService } from './webhooks.service';
import { HmacService } from './security/hmac.service';
import { HmacWebhookGuard } from './guards/hmac-webhook.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    WebhooksService,
    HmacService,
    HmacWebhookGuard,
  ],
  exports: [
    WebhooksService,
    HmacService,
    HmacWebhookGuard,
  ],
})
export class WebhooksModule {}

