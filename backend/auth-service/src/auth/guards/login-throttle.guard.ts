import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

interface LoginRequest {
  ip: string;
  body?: {
    email?: string;
  };
}

@Injectable()
export class LoginThrottleGuard extends ThrottlerGuard {
  protected async getTracker(req: LoginRequest): Promise<string> {
    return Promise.resolve(`${req.ip}-${req.body?.email || 'unknown'}`);
  }
}
