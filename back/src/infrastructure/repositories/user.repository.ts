import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../util/result';
import { DBUserRepository } from './db-user.repository';
import { CacheUserRepository } from './cache-user.repository';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { BcryptService } from '../services/bcrypt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  private dbUserRepository: DBUserRepository;
  private cacheUserRepository: CacheUserRepository;
  private bcryptService: BcryptService;

  constructor(
    dbUserRepository: DBUserRepository,
    cacheUserRepository: CacheUserRepository,
    bcryptService: BcryptService,
  ) {
    this.dbUserRepository = dbUserRepository;
    this.cacheUserRepository = cacheUserRepository;
    this.bcryptService = bcryptService;
  }

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
