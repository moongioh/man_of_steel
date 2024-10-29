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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_usecase_1 = require("../../domain/usecases/auth.usecase");
const jwt_service_1 = require("./jwt.service");
const user_entity_1 = require("../../domain/entities/user.entity");
let AuthService = class AuthService {
    constructor(authUseCase, jwtService) {
        this.authUseCase = authUseCase;
        this.jwtService = jwtService;
    }
    async login(credentials) {
        const userEntity = new user_entity_1.UserEntity('', credentials.email, credentials.password);
        return this.authUseCase.executeLogin(userEntity);
    }
    async register(user) {
        const userEntity = new user_entity_1.UserEntity('', user.email, user.password);
        return this.authUseCase.executeRegister(userEntity);
    }
    async refreshTokens(email, refreshToken) {
        return this.authUseCase.refreshTokens(email, refreshToken);
    }
    async logout(email, accessToken) {
        return this.authUseCase.logout(email, accessToken);
    }
    async verifyToken(token) {
        try {
            await this.jwtService.verifyAccessToken(token);
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_usecase_1.AuthUseCase,
        jwt_service_1.JWTService])
], AuthService);
//# sourceMappingURL=auth.service.js.map