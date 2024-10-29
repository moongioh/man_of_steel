import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDAO } from './infrastructure/dao/user.dao';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { AuthUseCase } from './domain/usecases/auth.usecase';
import { JWTService } from './application/services/jwt.service';
import { BcryptService } from './infrastructure/services/bcrypt.service';
import { RedisService } from './infrastructure/services/redis.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DBUserRepository } from './infrastructure/repositories/db-user.repository';
import { CacheUserRepository } from './infrastructure/repositories/cache-user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || '10.0.0.201',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'It12345!',
      database: process.env.MYSQL_DATABASE || 'test',
      entities: [UserDAO],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([UserDAO]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUseCase,
    JWTService,
    BcryptService,
    RedisService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserRepository,
    DBUserRepository,
    CacheUserRepository,
  ],
  exports: [AuthService, JWTService],
})
export class AppModule {}
