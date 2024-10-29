import { AuthService } from '../../application/services/auth.service';
import { UserDTO } from '../dto/user.dto';
import { Result } from '../../result';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    login(credentials: UserDTO): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    register(user: UserDTO): Promise<Result<{
        email: string;
    }>>;
    refresh(body: {
        userId: string;
        refreshToken: string;
    }): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(body: {
        userId: string;
        accessToken: string;
    }): Promise<Result<void>>;
}
