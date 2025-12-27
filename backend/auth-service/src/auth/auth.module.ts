import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './services/token.service';
import { CacheService } from './services/cache.service';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { RevokedToken } from './entities/revoked-token.entity';
import { TokenCleanupTask } from './tasks/token-cleanup.task';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, RefreshToken, RevokedToken]),
    JwtModule.register({}), // Configuración dinámica en TokenService
    ScheduleModule.forRoot(),
    CacheModule.register({
      ttl: 300, // 5 minutos por defecto
      max: 1000, // máximo 1000 items en cache
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    CacheService,
    TokenCleanupTask,
  ],
  exports: [AuthService, TokenService], // Exportar para usar en otros módulos
})
export class AuthModule {}