import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { JWTService } from '../../application/services/jwt.service';
import { UserEntity } from '../entities/user.entity';
import { Result } from '../../result';

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject('IUserRepository') // Inject with the correct token
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JWTService,
  ) {}

  public async executeLogin(
    credentials: UserEntity,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    const userResult = await this.userRepository.findByEmail(credentials.email);
    if (userResult.isFailure()) {
      return Result.failure(new Error('User not found'));
    }

    const user = userResult.getValue();
    const isPasswordValid = user.password === credentials.password;
    if (!isPasswordValid) {
      return Result.failure(new Error('Invalid credentials'));
    }

    const accessToken = this.jwtService.signAccessToken({ userId: user.id });
    const refreshToken = this.jwtService.signRefreshToken({ userId: user.id });

    await this.userRepository.saveRefreshToken(user.email, refreshToken);
    return Result.success({ accessToken, refreshToken });
  }

  public async executeRegister(user: UserEntity): Promise<Result<UserEntity>> {
    const existingUserResult = await this.userRepository.findByEmail(
      user.email,
    );
    if (existingUserResult.isSuccess()) {
      return Result.failure(new Error('User already exists'));
    }
    // TODO: 패스워드 해싱하기
    const hashedPassword = user.password;
    const newUser = new UserEntity(user.email, hashedPassword, hashedPassword);
    await this.userRepository.save(newUser);
    return Result.success(newUser);
  }

  public async refreshTokens(
    email: string,
    refreshToken: string,
  ): Promise<
    Result<{
      accessToken: string;
      refreshToken: string;
    }>
  > {
    const storedRefreshToken = await this.userRepository.getRefreshToken(email);
    if (storedRefreshToken !== refreshToken) {
      return Result.failure(new Error('Invalid refresh token'));
    }

    const newAccessToken = this.jwtService.signAccessToken({ email });
    const newRefreshToken = this.jwtService.signRefreshToken({ email });

    await this.userRepository.saveRefreshToken(email, newRefreshToken);
    return Result.success({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }

  public async logout(
    email: string,
    accessToken: string,
  ): Promise<Result<void>> {
    const decoded = this.jwtService.verifyAccessToken(accessToken);
    if (decoded.email !== email) {
      return Result.failure(new Error('Invalid token'));
    }

    const expiresIn = decoded.exp - decoded.iat;
    await this.userRepository.blacklistToken(accessToken, expiresIn);
    return Result.success(undefined);
  }
}
