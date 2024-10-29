import { DBUserRepository } from './db-user.repository';
import { CacheUserRepository } from './cache-user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../result';
export declare class UserRepository {
    private readonly dbUserRepository;
    private readonly cacheUserRepository;
    constructor(dbUserRepository: DBUserRepository, cacheUserRepository: CacheUserRepository);
    findByEmail(email: string): Promise<Result<UserEntity>>;
    save(user: UserEntity): Promise<Result<void>>;
    saveRefreshToken(email: string, refreshToken: string): Promise<void>;
    getRefreshToken(email: string): Promise<string | null>;
}
