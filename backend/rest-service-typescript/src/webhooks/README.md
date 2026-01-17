# Webhooks Service

Módulo de procesamiento de webhooks con validación HMAC para integraciones seguras.

## 📦 Uso Recomendado

Este módulo está diseñado para ser **importado en el REST service principal**, no para ejecutarse de forma independiente.

### Importar en tu REST Service

```typescript
// En rest-service-typescript/src/app.module.ts
import { WebhooksModule } from './webhooks/src/webhooks.module';

@Module({
  imports: [
    // ... otros módulos
    WebhooksModule,
  ],
})
export class AppModule {}
```

### Usar en un Controlador

```typescript
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WebhooksService } from './webhooks/src/webhooks.service';
import { HmacWebhookGuard } from './webhooks/src/guards/hmac-webhook.guard';
import { WebhookPayload } from './webhooks/src/entities/webhook-event.entity';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  @UseGuards(HmacWebhookGuard)
  async handleWebhook(@Body() payload: WebhookPayload) {
    return await this.webhooksService.processWebhookEvent(payload);
  }
}
```

## 🔐 Seguridad HMAC

Los webhooks deben incluir estos headers:

- `x-webhook-signature`: Firma HMAC-SHA256 del payload
- `x-webhook-timestamp`: Timestamp Unix de la solicitud

### Cómo generar la firma (cliente que envía el webhook)

```typescript
import { createHmac } from 'crypto';

const secret = 'tu_secreto_compartido';
const timestamp = Math.floor(Date.now() / 1000).toString();
const payload = JSON.stringify(data);

const base = `${timestamp}.${payload}`;
const signature = `sha256=${createHmac('sha256', secret).update(base).digest('hex')}`;

// Enviar en los headers:
// x-webhook-signature: {signature}
// x-webhook-timestamp: {timestamp}
```

## 📋 Tipos de Eventos

- `repair_order.created` - Nueva orden de reparación creada
- `repair_order.updated` - Orden de reparación actualizada
- `repair_order.completed` - Orden de reparación completada
- `repair_order.cancelled` - Orden de reparación cancelada
- `equipment.updated` - Equipo actualizado
- `review.created` - Nueva reseña creada

## ⚙️ Configuración

Crea un archivo `.env` con:

```env
WEBHOOK_SECRET=tu_secreto_super_seguro_aqui
```

## 🧪 Ejemplo de Payload

```json
{
  "event": "repair_order.created",
  "timestamp": "2026-01-16T10:30:00Z",
  "data": {
    "orderId": "12345",
    "status": "pending",
    "equipmentId": "eq_001"
  },
  "metadata": {
    "source": "partner_api",
    "version": "1.0"
  }
}
```

## ✅ Middleware para Raw Body

Para que la validación HMAC funcione, debes configurar el middleware en tu REST service:

```typescript
// En main.ts del REST service
import { json } from 'express';

app.use(json({
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  },
}));
```

## 📊 Estados de Eventos

- `pending` - Evento recibido, pendiente de procesar
- `processing` - Procesando el evento
- `success` - Procesado exitosamente
- `failed` - Error al procesar
- `retry` - Reintentando tras un fallo

---

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
