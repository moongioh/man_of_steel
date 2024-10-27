import { UserEntity } from '../entities/user.entity';
import { Result } from '../../util/result';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { JWTService } from '../../application/services/jwt.service';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { IAuthUseCase } from '../interfaces/auth.usecase.interface';
export declare class AuthUseCase implements IAuthUseCase {
    private userRepository;
    private bcryptService;
    private jwtService;
    constructor(userRepository: IUserRepository, bcryptService: BcryptService, jwtService: JWTService);
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
