import { Injectable } from '@nestjs/common';
import { AuthUseCase } from '../../domain/usecases/auth.usecase';
import { JWTService } from './jwt.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserDTO } from '../../presentation/dto/user.dto';
import { Result } from '../../result';

@Injectable()
export class AuthService {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly jwtService: JWTService,
  ) {}

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
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    return this.authUseCase.refreshTokens(userId, refreshToken);
  }

  public async logout(
    userId: string,
    accessToken: string,
  ): Promise<Result<void>> {
    return this.authUseCase.logout(userId, accessToken);
  }

  public async verifyToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAccessToken(token);
      return true;
    } catch {
      return false;
    }
  }
}
