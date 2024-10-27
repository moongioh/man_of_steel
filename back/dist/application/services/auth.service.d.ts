import { Result } from '../../util/result';
import { JWTService } from './jwt.service';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { UserDTO } from '../../presentation/dto/user.dto';
export declare class AuthService {
    private authUseCase;
    constructor(userRepository: IUserRepository, bcryptService: BcryptService, jwtService: JWTService);
    login(credentials: UserDTO): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    register(user: UserDTO): Promise<Result<void>>;
    refreshTokens(userId: string, refreshToken: string): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(userId: string, accessToken: string): Promise<Result<void>>;
}
