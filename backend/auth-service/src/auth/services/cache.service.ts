import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Cachea el estado de revocación de un token
   * TTL = tiempo hasta expiración del token
   */
  async cacheTokenRevocation(jti: string, ttl: number): Promise<void> {
    await this.cacheManager.set(`revoked:${jti}`, true, ttl);
  }

  /**
   * Verifica si un token está en cache como revocado
   */
  async isTokenRevokedInCache(jti: string): Promise<boolean> {
    const cached = await this.cacheManager.get<boolean>(`revoked:${jti}`);
    return !!cached;
  }
}