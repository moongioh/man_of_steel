import { AuthUseCase } from '../../domain/usecases/auth.usecase';
import { Result } from '../../util/result';
import { JWTService } from './jwt.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { UserDTO } from '../../presentation/dto/user.dto';

export class AuthService {
  private authUseCase: AuthUseCase;

  constructor(
    userRepository: IUserRepository,
    bcryptService: BcryptService,
    jwtService: JWTService,
  ) {
    this.authUseCase = new AuthUseCase(
      userRepository,
      bcryptService,
      jwtService,
    );
  }

  public async login(
    credentials: UserDTO,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    const userEntity = new UserEntity(
      '',
      credentials.email,
      credentials.password,
    );
    return this.authUseCase.executeLogin(userEntity);
  }

  public async register(user: UserDTO): Promise<Result<void>> {
    const userEntity = new UserEntity('', user.email, user.password);
    return this.authUseCase.executeRegister(userEntity);
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
    return this.authUseCase.refreshTokens(userId, refreshToken);
  }

  public async logout(
    userId: string,
    accessToken: string,
  ): Promise<Result<void>> {
    return this.authUseCase.logout(userId, accessToken);
  }
}
