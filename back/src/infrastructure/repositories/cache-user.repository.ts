import { Injectable } from '@nestjs/common';
import { RedisService } from '../services/redis.service';

@Injectable()
export class CacheUserRepository {
  constructor(private readonly redisService: RedisService) {}

  public async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.redisService.set(`refreshToken:${userId}`, refreshToken, {
      EX: 7 * 24 * 60 * 60,
    });
  }

  public async getRefreshToken(userId: string): Promise<string | null> {
    return this.redisService.get(`refreshToken:${userId}`);
  }

  public async blacklistToken(token: string, expiresIn: number): Promise<void> {
    await this.redisService.set(`blacklist:${token}`, 'blacklisted', {
      EX: expiresIn,
    });
  }

  public async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.redisService.get(`blacklist:${token}`);
    return result !== null;
  }
}
