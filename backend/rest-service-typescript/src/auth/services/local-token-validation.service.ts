import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CacheService } from './cache.service';
import { LocalCacheService } from './local-cache.service';

@Injectable()
export class LocalTokenValidationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private cacheService: CacheService,
    private localCacheService: LocalCacheService, 
  ) {}

  async validateTokenLocally(token: string): Promise<JwtPayload> {
    // STEP 1: Verify JWT signature and expiration
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });

    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid token type');
    }

    // STEP 2: Check local cache first (in-memory)
    const cachedResult = this.localCacheService.isTokenRevoked(payload.jti);
    
    if (cachedResult !== null) {
      // Cache hit! Use cached result
      if (cachedResult === true) {
        throw new UnauthorizedException('Token has been revoked(local cache jsjs)');
      }
      // Token is valid (cached result)
      return payload;
    }


    // STEP 3: Check blacklist in Redis (shared cache)
    const isRevoked = await this.isTokenRevokedInRedis(payload.jti);

    // STEP 4: Store result in local cache for future requests
    this.localCacheService.cacheTokenValidation(
      payload.jti,
      isRevoked,
      60 // Cache for 60 seconds
    );

    if (isRevoked) {
      throw new UnauthorizedException('Token has been revoked(redis check)');
    }

    return payload;
  }

  private async isTokenRevokedInRedis(jti: string): Promise<boolean> {
    const cached = await this.cacheService.isTokenRevokedInCache(jti);
    return !!cached;
  }
}