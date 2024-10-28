import { AuthUseCase } from '../../domain/usecases/auth.usecase';
import { JWTService } from './jwt.service';
import { UserDTO } from '../../presentation/dto/user.dto';
import { Result } from '../../result';
export declare class AuthService {
    private readonly authUseCase;
    private readonly jwtService;
    constructor(authUseCase: AuthUseCase, jwtService: JWTService);
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
    verifyToken(token: string): Promise<boolean>;
}
