import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Ip,
} from '@nestjs/common';
import type{ Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from './guards/auth.guard';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Throttle } from '@nestjs/throttler';
import { LoginThrottleGuard } from './guards/login-throttle.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      message: 'Usuario registrado exitosamente',
      user,
    };
  }

  @Post('login')
  @Throttle({default: { limit: 5, ttl: 60000 }})
  @UseGuards(LoginThrottleGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Ip() ip: string,
  ) {
    const userAgent = req.headers['user-agent'];
    const tokens = await this.authService.login(loginDto, userAgent, ip);

    return {
      message: 'Login exitoso',
      ...tokens,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() req: Request,
    @Ip() ip: string,
  ) {
    const userAgent = req.headers['user-agent'];
    const result = await this.authService.refresh(
      refreshTokenDto.refreshToken,
      userAgent,
      ip,
    );

    return {
      message: 'Token renovado exitosamente',
      ...result,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const user = req['user'] as JwtPayload;

    // Calcular expiresAt del token
    const expiresAt = new Date(user.exp! * 1000);

    await this.authService.logout(user.sub, user.jti, expiresAt);

    return {
      message: 'Logout exitoso',
    };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: Request) {
    const user = req['user'] as JwtPayload;
    const profile = await this.authService.getProfile(user.sub);

    return {
      user: profile,
    };
  }

  @Get('validate')
  async validateToken(@Req() req: Request) {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      return { valid: false };
    }

    try {
      const payload = await this.authService.validateToken(token);
      return {
        valid: true,
        payload,
      };
    } catch {
      return { valid: false };
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
