// src/infrastructure/services/RedisService.ts

import { Injectable, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private readonly client: RedisClientType;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${
        process.env.REDIS_PORT || 6379
      }`,
      password: process.env.REDIS_PASSWORD || '',
    });

    this.connectClient();
  }

  private async connectClient(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.log('Redis에 성공적으로 연결되었습니다.');
    } catch (error) {
      this.logger.error('Redis 연결 중 오류 발생:', error);
    }

    // 연결이 끊어졌을 때 재시도 로직 추가
    this.client.on('error', (err) => {
      this.logger.error('Redis 클라이언트 오류:', err);
    });
  }

  public async set(
    key: string,
    value: string,
    options?: { EX?: number },
  ): Promise<void> {
    try {
      await this.client.set(key, value, options);
      this.logger.log(`Redis에 데이터 설정 완료: ${key}`);
    } catch (error) {
      this.logger.error(`Redis에 데이터 설정 중 오류 발생: ${key}`, error);
    }
  }

  public async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      this.logger.log(`Redis에서 데이터 가져오기 완료: ${key}`);
      return value;
    } catch (error) {
      this.logger.error(`Redis에서 데이터 가져오는 중 오류 발생: ${key}`, error);
      return null;
    }
  }
}
