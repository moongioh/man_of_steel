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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const db_user_repository_1 = require("./db-user.repository");
const cache_user_repository_1 = require("./cache-user.repository");
let UserRepository = class UserRepository {
    constructor(dbUserRepository, cacheUserRepository) {
        this.dbUserRepository = dbUserRepository;
        this.cacheUserRepository = cacheUserRepository;
    }
    async findByEmail(email) {
        return this.dbUserRepository.findByEmail(email);
    }
    async findById(id) {
        return this.dbUserRepository.findById(id);
    }
    async save(user) {
        return this.dbUserRepository.save(user);
    }
    async saveRefreshToken(userId, refreshToken) {
        await this.cacheUserRepository.saveRefreshToken(userId, refreshToken);
    }
    async getRefreshToken(userId) {
        return this.cacheUserRepository.getRefreshToken(userId);
    }
    async blacklistToken(token, expiresIn) {
        await this.cacheUserRepository.blacklistToken(token, expiresIn);
    }
    async isTokenBlacklisted(token) {
        return this.cacheUserRepository.isTokenBlacklisted(token);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_user_repository_1.DBUserRepository,
        cache_user_repository_1.CacheUserRepository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map