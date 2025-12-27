import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class LocalTokenValidationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateTokenLocally(token: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });

    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }

    // PASO 3: Verificar blacklist en Redis (cache compartido)
    const isRevoked = await this.isTokenRevokedInCache(payload.jti);
    if (isRevoked) {
      throw new Error('Token has been revoked');
    }

    return payload;
  }

  private async isTokenRevokedInCache(jti: string): Promise<boolean> {
    const cached = await this.cacheManager.get<boolean>(`revoked:${jti}`);
    return !!cached;
  }
}