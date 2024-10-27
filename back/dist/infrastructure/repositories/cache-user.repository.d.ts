import { RedisService } from '../services/redis.service';
export declare class CacheUserRepository {
    private redisService;
    constructor(redisService: RedisService);
    saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
    getRefreshToken(userId: string): Promise<string | null>;
    blacklistToken(token: string, expiresIn: number): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
}
