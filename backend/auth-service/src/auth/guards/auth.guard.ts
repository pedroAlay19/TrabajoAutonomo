import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // PASO 1: Verificar firma y expiración (LOCAL - sin BD)
      const payload = await this.tokenService.verifyAccessToken(token);

      // PASO 2: Verificar tipo de token
      if (payload.type !== 'access') {
        throw new UnauthorizedException('Tipo de token inválido');
      }

      // PASO 3: Verificar blacklist (consulta BD - pero con cache)
      const isRevoked = await this.tokenService.isTokenRevoked(payload.jti);
      if (isRevoked) {
        throw new UnauthorizedException('Token revocado');
      }

      // Adjuntar payload al request
      request['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}