import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    const isValid = await this.authService.verifyToken(token);
    return isValid;
  }
}
