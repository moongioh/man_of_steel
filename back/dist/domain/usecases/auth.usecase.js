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
const bcrypt_service_1 = require("../../infrastructure/services/bcrypt.service");
const result_1 = require("../../result");
let AuthUseCase = class AuthUseCase {
    constructor(userRepository, jwtService, bcryptService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.bcryptService = bcryptService;
    }
    async executeLogin(credentials) {
        const userResult = await this.userRepository.findByEmail(credentials.email);
        if (userResult.isFailure()) {
            return result_1.Result.failure(new Error('User not found'));
        }
        const user = userResult.getValue();
        const isPasswordValid = await this.bcryptService.compare(credentials.password, user.hashedPassword);
        if (!isPasswordValid) {
            return result_1.Result.failure(new Error('Invalid credentials'));
        }
        const accessToken = this.jwtService.signAccessToken({ userId: user.id });
        const refreshToken = this.jwtService.signRefreshToken({ userId: user.id });
        await this.userRepository.saveRefreshToken(user.id, refreshToken);
        return result_1.Result.success({ accessToken, refreshToken });
    }
    async executeRegister(user) {
        const existingUserResult = await this.userRepository.findByEmail(user.email);
        if (existingUserResult.isSuccess()) {
            return result_1.Result.failure(new Error('User already exists'));
        }
        const hashedPassword = await this.bcryptService.hash(user.password);
        user.hashedPassword = hashedPassword;
        await this.userRepository.save(user);
        return result_1.Result.success(undefined);
    }
    async refreshTokens(userId, refreshToken) {
        const storedRefreshToken = await this.userRepository.getRefreshToken(userId);
        if (storedRefreshToken !== refreshToken) {
            return result_1.Result.failure(new Error('Invalid refresh token'));
        }
        const newAccessToken = this.jwtService.signAccessToken({ userId });
        const newRefreshToken = this.jwtService.signRefreshToken({ userId });
        await this.userRepository.saveRefreshToken(userId, newRefreshToken);
        return result_1.Result.success({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    }
    async logout(userId, accessToken) {
        const decoded = this.jwtService.verifyAccessToken(accessToken);
        if (decoded.userId !== userId) {
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
    __metadata("design:paramtypes", [Object, jwt_service_1.JWTService,
        bcrypt_service_1.BcryptService])
], AuthUseCase);
//# sourceMappingURL=auth.usecase.js.map