import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { UserDTO } from '../dto/user.dto';
import { Result } from '../../result';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() credentials: UserDTO,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    return this.authService.login(credentials);
  }

  @Post('register')
  public async register(@Body() user: UserDTO): Promise<Result<void>> {
    return this.authService.register(user);
  }

  @Post('refresh')
  public async refresh(
    @Body() body: { userId: string; refreshToken: string },
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }

  @Post('logout')
  public async logout(
    @Body() body: { userId: string; accessToken: string },
  ): Promise<Result<void>> {
    return this.authService.logout(body.userId, body.accessToken);
  }
}
