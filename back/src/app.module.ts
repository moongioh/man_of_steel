import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JWTService } from './application/services/jwt.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DBUserRepository } from './infrastructure/repositories/db-user.repository';
import { CacheUserRepository } from './infrastructure/repositories/cache-user.repository';
import { BcryptService } from './infrastructure/services/bcrypt.service';
import { MySQLService } from './infrastructure/services/mysql.service';
import { RedisService } from './infrastructure/services/redis.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTService,
    BcryptService,
    MySQLService,
    RedisService,
    DBUserRepository,
    CacheUserRepository,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: AuthService,
      useFactory: (
        userRepository: UserRepository,
        bcryptService: BcryptService,
        jwtService: JWTService,
      ) => {
        return new AuthService(userRepository, bcryptService, jwtService);
      },
      inject: ['IUserRepository', BcryptService, JWTService],
    },
  ],
})
export class AppModule {}
