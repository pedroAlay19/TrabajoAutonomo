import { Injectable, Logger } from '@nestjs/common';
import NodeCache from 'node-cache';

@Injectable()
export class LocalCacheService {
  private readonly logger = new Logger(LocalCacheService.name);
  private cache: NodeCache;

  constructor() {
    // Initialize cache with 60 second TTL by default
    this.cache = new NodeCache({
      stdTTL: 60,           // Default TTL: 60 seconds
      checkperiod: 120,     // Cleanup check every 2 minutes
      useClones: false,     // Better performance
      deleteOnExpire: true, // Auto-delete expired entries
    });

    this.logger.log('✅ Local in-memory cache initialized');

    // Log stats periodically
    this.cache.on('expired', (key) => {
      this.logger.debug(`🕐 Cache entry expired: ${key}`);
    });
  }

  /**
   * Check if token is revoked (with caching)
   * Returns: true = revoked, false = valid
   */
  isTokenRevoked(jti: string): boolean | null {
    const key = `token:${jti}`;
    
    // Try to get from cache
    const cached = this.cache.get<boolean>(key);
    
    if (cached !== undefined) {
      this.logger.debug(`✅ CACHE HIT: ${jti} = ${cached ? 'REVOKED' : 'VALID'}`);
      return cached;
    }
    
    this.logger.debug(`❌ CACHE MISS: ${jti}`);
    return null; // Not in cache
  }

  /**
   * Store validation result in cache
   */
  cacheTokenValidation(jti: string, isRevoked: boolean, ttl: number = 60): void {
    const key = `token:${jti}`;
    const success = this.cache.set(key, isRevoked, ttl);
    
    if (success) {
      this.logger.debug(
        `💾 Cached token ${jti}: ${isRevoked ? 'REVOKED' : 'VALID'} (TTL: ${ttl}s)`
      );
    }
  }

  /**
   * Manually invalidate a token in local cache
   * (Useful when receiving revocation events)
   */
  invalidateToken(jti: string): void {
    const key = `token:${jti}`;
    this.cache.del(key);
    this.logger.log(`🗑️  Invalidated cache for token: ${jti}`);
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const stats = this.cache.getStats();
    return {
      keys: stats.keys,
      hits: stats.hits,
      misses: stats.misses,
      hitRate: stats.hits / (stats.hits + stats.misses) || 0,
    };
  }
}