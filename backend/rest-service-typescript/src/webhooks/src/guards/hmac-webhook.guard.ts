import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  UnauthorizedException,
  BadRequestException 
} from "@nestjs/common";
import { HmacService } from "../security/hmac.service";
import { Request } from 'express';

interface RequestWithRawBody extends Request {
  rawBody?: Buffer;
}

@Injectable()
export class HmacWebhookGuard implements CanActivate {
  constructor(
    private readonly hmacService: HmacService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithRawBody>();
    
    // Obtener headers necesarios
    const signature = request.headers['x-webhook-signature'] as string;
    const timestamp = request.headers['x-webhook-timestamp'] as string;
    const secret = process.env.WEBHOOK_SECRET;

    if (!signature) {
      throw new BadRequestException('Missing x-webhook-signature header');
    }

    if (!timestamp) {
      throw new BadRequestException('Missing x-webhook-timestamp header');
    }

    if (!secret) {
      throw new Error('WEBHOOK_SECRET environment variable not configured');
    }

    // Verificar que el timestamp no sea muy antiguo (5 minutos)
    const now = Math.floor(Date.now() / 1000);
    const requestTime = parseInt(timestamp, 10);
    
    if (isNaN(requestTime)) {
      throw new BadRequestException('Invalid timestamp format');
    }

    if (Math.abs(now - requestTime) > 300) {
      throw new UnauthorizedException('Request timestamp too old or too far in the future');
    }

    // Obtener el raw body
    const rawBody = request.rawBody || Buffer.from(JSON.stringify(request.body));

    try {
      // Verificar la firma HMAC
      this.hmacService.verifyOrThrow(secret, timestamp, rawBody, signature);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid webhook signature');
    }
  }
}
