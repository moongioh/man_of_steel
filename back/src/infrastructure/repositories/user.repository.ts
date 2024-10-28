import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { DBUserRepository } from './db-user.repository';
import { CacheUserRepository } from './cache-user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../result';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly dbUserRepository: DBUserRepository,
    private readonly cacheUserRepository: CacheUserRepository,
  ) {}

  public async findByEmail(email: string): Promise<Result<UserEntity>> {
    return this.dbUserRepository.findByEmail(email);
  }

  public async findById(id: string): Promise<Result<UserEntity>> {
    return this.dbUserRepository.findById(id);
  }

  public async save(user: UserEntity): Promise<Result<void>> {
    return this.dbUserRepository.save(user);
  }

  public async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.cacheUserRepository.saveRefreshToken(userId, refreshToken);
  }

  public async getRefreshToken(userId: string): Promise<string | null> {
    return this.cacheUserRepository.getRefreshToken(userId);
  }

  public async blacklistToken(token: string, expiresIn: number): Promise<void> {
    await this.cacheUserRepository.blacklistToken(token, expiresIn);
  }

  public async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.cacheUserRepository.isTokenBlacklisted(token);
  }
}
