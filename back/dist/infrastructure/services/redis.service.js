"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        this.logger = new common_1.Logger(RedisService_1.name);
        this.client = (0, redis_1.createClient)({
            url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
            password: process.env.REDIS_PASSWORD || '',
        });
        this.connectClient();
    }
    async connectClient() {
        try {
            await this.client.connect();
            this.logger.log('Redis에 성공적으로 연결되었습니다.');
        }
        catch (error) {
            this.logger.error('Redis 연결 중 오류 발생:', error);
        }
        this.client.on('error', (err) => {
            this.logger.error('Redis 클라이언트 오류:', err);
        });
    }
    async set(key, value, options) {
        try {
            await this.client.set(key, value, options);
            this.logger.log(`Redis에 데이터 설정 완료: ${key}`);
        }
        catch (error) {
            this.logger.error(`Redis에 데이터 설정 중 오류 발생: ${key}`, error);
        }
    }
    async get(key) {
        try {
            const value = await this.client.get(key);
            this.logger.log(`Redis에서 데이터 가져오기 완료: ${key}`);
            return value;
        }
        catch (error) {
            this.logger.error(`Redis에서 데이터 가져오는 중 오류 발생: ${key}`, error);
            return null;
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map