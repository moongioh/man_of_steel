// src/application/services/JWTService.ts

import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTService {
  private readonly accessTokenSecret = process.env.JWT_SECRET || 'default_secret';
  private readonly refreshTokenSecret = process.env.JWT_SECRET || 'default_secret';

  public signAccessToken(payload: any): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: '15m' });
  }

  public signRefreshToken(payload: any): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' });
  }

  public verifyAccessToken(token: string): any {
    return jwt.verify(token, this.accessTokenSecret);
  }

  public verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.refreshTokenSecret);
  }
}
