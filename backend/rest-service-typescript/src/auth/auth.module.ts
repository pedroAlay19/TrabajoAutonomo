import { Global, Module } from '@nestjs/common';
import { LocalTokenValidationService } from './services/local-token-validation.service';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { CacheService } from './services/cache.service';
import { LocalCacheService } from './services/local-cache.service';

@Global()
@Module({
  imports: [],
  providers: [
    LocalTokenValidationService,
    AuthGuard,
    RolesGuard, 
    CacheService,
    LocalCacheService
  ],
  exports: [
    LocalTokenValidationService,
    AuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}