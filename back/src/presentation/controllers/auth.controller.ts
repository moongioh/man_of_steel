import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { UserDTO } from '../dto/user.dto';
import { Result } from '../../result';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name); // Logger 인스턴스 추가

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() credentials: UserDTO,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    this.logger.log(`Login attempt for email: ${credentials.email}`); // 로그인 시도 로그
    const result = await this.authService.login(credentials);
    if (result.isFailure()) {
      this.logger.error('Login failed');
    } else {
      this.logger.log('Login successful');
    }
    return result;
  }

  @Post('register')
  public async register(@Body() user: UserDTO): Promise<Result<{ email: string }>> {
    this.logger.log(`Register attempt for email: ${user.email}`); // 회원가입 시도 로그
    const result = await this.authService.register(user);
    if (result.isFailure()) {
      this.logger.error('Registration failed');
      return Result.failure(result.getError());
    }
    this.logger.log('Registration successful');
    return Result.success({ email: result.getValue().email });
  }

  @Post('refresh')
  public async refresh(
    @Body() body: { userId: string; refreshToken: string },
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    this.logger.log(`Refresh tokens for userId: ${body.userId}`); // 토큰 갱신 시도 로그
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }

  @Post('logout')
  public async logout(
    @Body() body: { userId: string; accessToken: string },
  ): Promise<Result<void>> {
    this.logger.log(`Logout attempt for userId: ${body.userId}`); // 로그아웃 시도 로그
    return this.authService.logout(body.userId, body.accessToken);
  }
}
