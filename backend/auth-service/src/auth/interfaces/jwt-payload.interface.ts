import { UserRole } from '../entities/user.entity';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: UserRole;
  jti: string; // JWT ID único para blacklist
  type: 'access' | 'refresh';
  iat?: number; // Issued at
  exp?: number; // Expiration
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
