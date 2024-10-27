import { Result } from '../../util/Result';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { DBUserRepository } from './db-user.repository';
import { CacheUserRepository } from './cache-user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
export declare class UserRepository implements IUserRepository {
    private readonly dbUserRepository;
    private readonly cacheUserRepository;
    constructor(dbUserRepository: DBUserRepository, cacheUserRepository: CacheUserRepository);
    findByEmail(email: string): Promise<Result<UserEntity>>;
    findById(id: string): Promise<Result<UserEntity>>;
    save(user: UserEntity): Promise<Result<void>>;
    saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
    getRefreshToken(userId: string): Promise<string | null>;
    blacklistToken(token: string, expiresIn: number): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
}
