"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const redis_1 = require("redis");
const env_config_1 = require("../../env.config");
class RedisService {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: `redis://${env_config_1.ENV.REDIS_HOST}:${env_config_1.ENV.REDIS_PORT}`,
            password: env_config_1.ENV.REDIS_PASSWORD,
        });
        this.client.connect();
    }
    async set(key, value, options) {
        await this.client.set(key, value, options);
    }
    async get(key) {
        return this.client.get(key);
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map