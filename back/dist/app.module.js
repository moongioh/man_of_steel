"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("./presentation/controllers/auth.controller");
const auth_service_1 = require("./application/services/auth.service");
const jwt_service_1 = require("./application/services/jwt.service");
const user_repository_1 = require("./infrastructure/repositories/user.repository");
const db_user_repository_1 = require("./infrastructure/repositories/db-user.repository");
const cache_user_repository_1 = require("./infrastructure/repositories/cache-user.repository");
const bcrypt_service_1 = require("./infrastructure/services/bcrypt.service");
const mysql_service_1 = require("./infrastructure/services/mysql.service");
const redis_service_1 = require("./infrastructure/services/redis.service");
const user_dao_1 = require("./infrastructure/dao/user.dao");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'suojae',
                password: 'qwer1234',
                database: 'semi_project',
                entities: [user_dao_1.UserDAO],
                synchronize: true,
                logging: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_dao_1.UserDAO]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_service_1.JWTService,
            bcrypt_service_1.BcryptService,
            mysql_service_1.MySQLService,
            redis_service_1.RedisService,
            {
                provide: 'IUserRepository',
                useClass: user_repository_1.UserRepository,
            },
            {
                provide: user_repository_1.UserRepository,
                useFactory: (dbRepo, cacheRepo, bcryptService) => {
                    return new user_repository_1.UserRepository(dbRepo, cacheRepo, bcryptService);
                },
                inject: [db_user_repository_1.DBUserRepository, cache_user_repository_1.CacheUserRepository, bcrypt_service_1.BcryptService],
            },
            db_user_repository_1.DBUserRepository,
            cache_user_repository_1.CacheUserRepository,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map