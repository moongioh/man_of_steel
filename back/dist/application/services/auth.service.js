"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_usecase_1 = require("../../domain/usecases/auth.usecase");
const user_entity_1 = require("../../domain/entities/user.entity");
class AuthService {
    constructor(userRepository, bcryptService, jwtService) {
        this.authUseCase = new auth_usecase_1.AuthUseCase(userRepository, bcryptService, jwtService);
    }
    async login(credentials) {
        const userEntity = new user_entity_1.UserEntity('', credentials.email, credentials.password);
        return this.authUseCase.executeLogin(userEntity);
    }
    async register(user) {
        const userEntity = new user_entity_1.UserEntity('', user.email, user.password);
        return this.authUseCase.executeRegister(userEntity);
    }
    async refreshTokens(userId, refreshToken) {
        return this.authUseCase.refreshTokens(userId, refreshToken);
    }
    async logout(userId, accessToken) {
        return this.authUseCase.logout(userId, accessToken);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map