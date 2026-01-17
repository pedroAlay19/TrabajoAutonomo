import { Injectable, UnauthorizedException } from "@nestjs/common";
import { createHmac, timingSafeEqual } from "crypto";



@Injectable()

export class HmacService {
    sing(secret :string, timestamp: string, rawBody: Buffer): string {
        const base = `${timestamp}.${rawBody.toString('utf8')}`;
        const hex = createHmac('sha256', secret).update(base).digest('hex');
        return `sha256=${hex}`;
    }

    verifyOrThrow(secret: string, timestamp: string, rawBody: Buffer, gotSignature: string) {
    const expected = this.sing(secret, timestamp, rawBody);

    // timing-safe compare (mismo largo)
    const a = Buffer.from(expected);
    const b = Buffer.from(gotSignature ?? '');
    
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new UnauthorizedException('Firma HMAC inválida');
    }
  }


}