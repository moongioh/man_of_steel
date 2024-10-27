import { createClient } from 'redis';
import { ENV } from '../../env.config';

export class RedisService {
  private client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient({
      url: `redis://${ENV.REDIS_HOST}:${ENV.REDIS_PORT}`,
      password: ENV.REDIS_PASSWORD,
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
