import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenCleanupTask {
  private readonly logger = new Logger(TokenCleanupTask.name);

  constructor(private tokenService: TokenService) {}

  /**
   * Limpia tokens expirados cada día a las 3 AM
   */
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCleanup() {
    this.logger.log('Iniciando limpieza de tokens expirados...');
    
    try {
      await this.tokenService.cleanExpiredTokens();
      this.logger.log('Limpieza completada exitosamente');
    } catch (error) {
      this.logger.error('Error en limpieza de tokens', error);
    }
  }
}