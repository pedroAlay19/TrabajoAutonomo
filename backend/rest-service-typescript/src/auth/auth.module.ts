import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalTokenValidationService } from './services/local-token-validation.service';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_SECRET'),
      }),
    }),
  ],
  providers: [
    LocalTokenValidationService,AuthGuard,
  ],
  exports: [LocalTokenValidationService],
})
export class AuthModule {}