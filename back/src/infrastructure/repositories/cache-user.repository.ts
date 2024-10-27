import { RedisService } from '../services/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheUserRepository {
  private redisService: RedisService;

  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }

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
