import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../util/result';
import { DBUserRepository } from './db-user.repository';
import { CacheUserRepository } from './cache-user.repository';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { BcryptService } from '../services/bcrypt.service';
export declare class UserRepository implements IUserRepository {
    private dbUserRepository;
    private cacheUserRepository;
    private bcryptService;
    constructor(dbUserRepository: DBUserRepository, cacheUserRepository: CacheUserRepository, bcryptService: BcryptService);
    findByEmail(email: string): Promise<Result<UserEntity>>;
    findById(id: string): Promise<Result<UserEntity>>;
    save(user: UserEntity): Promise<Result<void>>;
    saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
    getRefreshToken(userId: string): Promise<string | null>;
    blacklistToken(token: string, expiresIn: number): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
}
