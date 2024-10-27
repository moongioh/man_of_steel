// src/infrastructure/services/RedisService.ts

import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly client;

  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${
        process.env.REDIS_PORT || 6379
      }`,
      password: process.env.REDIS_PASSWORD || '',
    });
    this.client.connect();
  }

  public async set(
    key: string,
    value: string,
    options?: { EX?: number },
  ): Promise<void> {
    await this.client.set(key, value, options);
  }

  public async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}
