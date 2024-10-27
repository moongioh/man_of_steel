import { UserEntity } from '../entities/user.entity';
import { Result } from '../../util/result';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { JWTService } from '../../application/services/jwt.service';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { IAuthUseCase } from '../interfaces/auth.usecase.interface';

export class AuthUseCase implements IAuthUseCase {
  private userRepository: IUserRepository;
  private bcryptService: BcryptService;
  private jwtService: JWTService;

  constructor(
    userRepository: IUserRepository,
    bcryptService: BcryptService,
    jwtService: JWTService,
  ) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
    this.jwtService = jwtService;
  }

  public async executeLogin(
    credentials: UserEntity,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    const userResult = await this.userRepository.findByEmail(credentials.email);
    if (userResult.isFailure()) {
      return Result.failure(new Error('User not found'));
    }

    const user = userResult.getValue();
    const isPasswordValid = await user.checkPassword(
      credentials.getHashedPassword(),
      this.bcryptService,
    );
    if (!isPasswordValid) {
      return Result.failure(new Error('Invalid credentials'));
    }

    const accessToken = this.jwtService.signAccessToken({ userId: user.id });
    const refreshToken = this.jwtService.signRefreshToken({ userId: user.id });

    await this.userRepository.saveRefreshToken(user.id, refreshToken);

    return Result.success({ accessToken, refreshToken });
  }

  public async executeRegister(user: UserEntity): Promise<Result<void>> {
    const existingUserResult = await this.userRepository.findByEmail(
      user.email,
    );
    if (existingUserResult.isSuccess()) {
      return Result.failure(new Error('User already exists'));
    }

    await user.setPassword(user.getHashedPassword(), this.bcryptService);
    await this.userRepository.save(user);
    return Result.success(undefined);
  }

  public async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<
    Result<{
      accessToken: string;
      refreshToken: string;
    }>
  > {
    const storedRefreshToken =
      await this.userRepository.getRefreshToken(userId);
    if (storedRefreshToken !== refreshToken) {
      return Result.failure(new Error('Invalid refresh token'));
    }

    const newAccessToken = this.jwtService.signAccessToken({ userId });
    const newRefreshToken = this.jwtService.signRefreshToken({ userId });

    await this.userRepository.saveRefreshToken(userId, newRefreshToken);

    return Result.success({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }

  public async logout(
    userId: string,
    accessToken: string,
  ): Promise<Result<void>> {
    const decoded = this.jwtService.verifyAccessToken(accessToken);
    if (decoded.userId !== userId) {
      return Result.failure(new Error('Invalid token'));
    }

    const expiresIn = decoded.exp - decoded.iat;
    await this.userRepository.blacklistToken(accessToken, expiresIn);

    return Result.success(undefined);
  }
}
