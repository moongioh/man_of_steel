import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JWTService } from './application/services/jwt.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { DBUserRepository } from './infrastructure/repositories/db-user.repository';
import { CacheUserRepository } from './infrastructure/repositories/cache-user.repository';
import { BcryptService } from './infrastructure/services/bcrypt.service';
import { MySQLService } from './infrastructure/services/mysql.service';
import { RedisService } from './infrastructure/services/redis.service';
import { UserDAO } from './infrastructure/dao/user.dao';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'suojae',
      password: 'qwer1234',
      database: 'semi_project',
      entities: [UserDAO],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([UserDAO]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JWTService,
    BcryptService,
    MySQLService,
    RedisService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: UserRepository,
      useFactory: (
        dbRepo: DBUserRepository,
        cacheRepo: CacheUserRepository,
        bcryptService: BcryptService,
      ) => {
        return new UserRepository(dbRepo, cacheRepo, bcryptService);
      },
      inject: [DBUserRepository, CacheUserRepository, BcryptService],
    },
    DBUserRepository,
    CacheUserRepository,
  ],
})
export class AppModule {}
