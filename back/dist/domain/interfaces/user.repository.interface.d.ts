import { Result } from '../../util/Result';
import { UserEntity } from '../entities/user.entity';
export interface IUserRepository {
    findByEmail(email: string): Promise<Result<UserEntity>>;
    findById(id: string): Promise<Result<UserEntity>>;
    save(user: UserEntity): Promise<Result<void>>;
    saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
    getRefreshToken(userId: string): Promise<string | null>;
    blacklistToken(token: string, expiresIn: number): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
}
