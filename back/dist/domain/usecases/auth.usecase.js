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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../../application/services/jwt.service");
const user_entity_1 = require("../entities/user.entity");
const result_1 = require("../../result");
let AuthUseCase = class AuthUseCase {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async executeLogin(credentials) {
        const userResult = await this.userRepository.findByEmail(credentials.email);
        if (userResult.isFailure()) {
            return result_1.Result.failure(new Error('User not found'));
        }
        const user = userResult.getValue();
        const isPasswordValid = user.password === credentials.password;
        if (!isPasswordValid) {
            return result_1.Result.failure(new Error('Invalid credentials'));
        }
        const accessToken = this.jwtService.signAccessToken({ userId: user.id });
        const refreshToken = this.jwtService.signRefreshToken({ userId: user.id });
        await this.userRepository.saveRefreshToken(user.email, refreshToken);
        return result_1.Result.success({ accessToken, refreshToken });
    }
    async executeRegister(user) {
        const existingUserResult = await this.userRepository.findByEmail(user.email);
        if (existingUserResult.isSuccess()) {
            return result_1.Result.failure(new Error('User already exists'));
        }
        const hashedPassword = user.password;
        const newUser = new user_entity_1.UserEntity(user.email, hashedPassword, hashedPassword);
        await this.userRepository.save(newUser);
        return result_1.Result.success(newUser);
    }
    async refreshTokens(email, refreshToken) {
        const storedRefreshToken = await this.userRepository.getRefreshToken(email);
        if (storedRefreshToken !== refreshToken) {
            return result_1.Result.failure(new Error('Invalid refresh token'));
        }
        const newAccessToken = this.jwtService.signAccessToken({ email });
        const newRefreshToken = this.jwtService.signRefreshToken({ email });
        await this.userRepository.saveRefreshToken(email, newRefreshToken);
        return result_1.Result.success({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    }
    async logout(email, accessToken) {
        const decoded = this.jwtService.verifyAccessToken(accessToken);
        if (decoded.email !== email) {
            return result_1.Result.failure(new Error('Invalid token'));
        }
        const expiresIn = decoded.exp - decoded.iat;
        await this.userRepository.blacklistToken(accessToken, expiresIn);
        return result_1.Result.success(undefined);
    }
};
exports.AuthUseCase = AuthUseCase;
exports.AuthUseCase = AuthUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object, jwt_service_1.JWTService])
], AuthUseCase);
//# sourceMappingURL=auth.usecase.js.map