import { IAuthUseCase } from '../interfaces/auth.usecase.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { JWTService } from '../../application/services/jwt.service';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { Result } from '../../util/Result';
import { UserEntity } from '../entities/user.entity';
export declare class AuthUseCase implements IAuthUseCase {
    private readonly userRepository;
    private readonly jwtService;
    private readonly bcryptService;
    constructor(userRepository: IUserRepository, jwtService: JWTService, bcryptService: BcryptService);
    executeLogin(credentials: UserEntity): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    executeRegister(user: UserEntity): Promise<Result<void>>;
    refreshTokens(userId: string, refreshToken: string): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(userId: string, accessToken: string): Promise<Result<void>>;
}
