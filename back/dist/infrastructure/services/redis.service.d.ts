export declare class RedisService {
    private readonly client;
    constructor();
    set(key: string, value: string, options?: {
        EX?: number;
    }): Promise<void>;
    get(key: string): Promise<string | null>;
}
