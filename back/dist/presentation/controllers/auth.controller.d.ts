import { AuthService } from '../../application/services/auth.service';
import { Result } from '../../util/result';
import { UserDTO } from '../dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(credentials: UserDTO): Promise<Result<{
        accessToken: string;
        refreshToken: string;
    }>>;
    register(user: UserDTO): Promise<Result<void>>;
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
