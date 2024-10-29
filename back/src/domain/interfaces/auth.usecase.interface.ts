import { UserEntity } from '../entities/user.entity';
import { Result } from '../../result';

export interface IAuthUseCase {
  executeLogin(
    credentials: UserEntity,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>>;

  executeRegister(user: UserEntity): Promise<Result<UserEntity>>;

  refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>>;

  logout(userId: string, accessToken: string): Promise<Result<void>>;
}
