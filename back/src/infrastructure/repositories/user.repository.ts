import { Injectable } from '@nestjs/common';
import { DBUserRepository } from './db-user.repository';
import { CacheUserRepository } from './cache-user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../result';

@Injectable()
export class UserRepository {
  constructor(
    private readonly dbUserRepository: DBUserRepository,
    private readonly cacheUserRepository: CacheUserRepository,
  ) {}

  public async findByEmail(email: string): Promise<Result<UserEntity>> {
    return this.dbUserRepository.findByEmail(email);
  }

  public async save(user: UserEntity): Promise<Result<void>> {
    return this.dbUserRepository.save(user);
  }

  public async saveRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<void> {
    await this.cacheUserRepository.saveRefreshToken(email, refreshToken);
  }

  public async getRefreshToken(email: string): Promise<string | null> {
    return this.cacheUserRepository.getRefreshToken(email);
  }
}
