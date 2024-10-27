"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const result_1 = require("../../util/result");
class AuthUseCase {
    constructor(userRepository, bcryptService, jwtService) {
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
    }
    async executeLogin(credentials) {
        const userResult = await this.userRepository.findByEmail(credentials.email);
        if (userResult.isFailure()) {
            return result_1.Result.failure(new Error('User not found'));
        }
        const user = userResult.getValue();
        const isPasswordValid = await user.checkPassword(credentials.getHashedPassword(), this.bcryptService);
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
        await user.setPassword(user.getHashedPassword(), this.bcryptService);
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
}
exports.AuthUseCase = AuthUseCase;
//# sourceMappingURL=auth.usecase.js.map