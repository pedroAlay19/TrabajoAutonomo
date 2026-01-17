import { NestFactory } from '@nestjs/core';
import { WebhooksModule } from './webhooks.module';
import { Logger } from '@nestjs/common';
import { json } from 'express';

/**
 * Este servicio de webhooks está diseñado para ser importado
 * como módulo en el REST service principal.
 * 
 * Si deseas ejecutarlo de forma independiente para pruebas:
 * npm run start:dev
 */
async function bootstrap() {
  const logger = new Logger('WebhooksBootstrap');
  
  const app = await NestFactory.create(WebhooksModule);
  
  // Middleware para capturar raw body (necesario para verificar HMAC)
  app.use(json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    },
  }));

  const port = process.env.WEBHOOK_PORT || 3001;
  await app.listen(port);
  
  logger.log(`Webhooks service running on port ${port}`);
  logger.warn('⚠️  Este servicio está diseñado para ser importado en el REST service');
}

// Solo ejecutar si se inicia directamente
if (require.main === module) {
  bootstrap();
}

