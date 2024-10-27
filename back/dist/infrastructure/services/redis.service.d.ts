export declare class RedisService {
    private readonly client;
    private readonly logger;
    constructor();
    private connectClient;
    set(key: string, value: string, options?: {
        EX?: number;
    }): Promise<void>;
    get(key: string): Promise<string | null>;
}
