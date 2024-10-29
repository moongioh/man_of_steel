import { AuthUseCase } from '../../domain/usecases/auth.usecase';
import { JWTService } from './jwt.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../result';
import { UserDTO } from '../../presentation/dto/user.dto';
export declare class AuthService {
    private readonly authUseCase;
    private readonly jwtService;
    constructor(authUseCase: AuthUseCase, jwtService: JWTService);
    login(credentials: UserDTO): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    register(user: UserDTO): Promise<Result<UserEntity>>;
    refreshTokens(email: string, refreshToken: string): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(email: string, accessToken: string): Promise<Result<void>>;
    verifyToken(token: string): Promise<boolean>;
}
