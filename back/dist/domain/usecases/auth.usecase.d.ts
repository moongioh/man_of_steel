import { IUserRepository } from '../interfaces/user.repository.interface';
import { JWTService } from '../../application/services/jwt.service';
import { UserEntity } from '../entities/user.entity';
import { Result } from '../../result';
export declare class AuthUseCase {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: IUserRepository, jwtService: JWTService);
    executeLogin(credentials: UserEntity): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    executeRegister(user: UserEntity): Promise<Result<UserEntity>>;
    refreshTokens(email: string, refreshToken: string): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(email: string, accessToken: string): Promise<Result<void>>;
}
