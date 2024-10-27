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
const user_dao_1 = require("./infrastructure/dao/user.dao");
const auth_controller_1 = require("./presentation/controllers/auth.controller");
const auth_service_1 = require("./application/services/auth.service");
const auth_usecase_1 = require("./domain/usecases/auth.usecase");
const jwt_service_1 = require("./application/services/jwt.service");
const bcrypt_service_1 = require("./infrastructure/services/bcrypt.service");
const redis_service_1 = require("./infrastructure/services/redis.service");
const user_repository_1 = require("./infrastructure/repositories/user.repository");
const db_user_repository_1 = require("./infrastructure/repositories/db-user.repository");
const cache_user_repository_1 = require("./infrastructure/repositories/cache-user.repository");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST || 'localhost',
                port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
                username: process.env.MYSQL_USER || 'root',
                password: process.env.MYSQL_PASSWORD || '',
                database: process.env.MYSQL_DATABASE || 'test',
                entities: [user_dao_1.UserDAO],
                synchronize: true,
                logging: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_dao_1.UserDAO]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            auth_usecase_1.AuthUseCase,
            jwt_service_1.JWTService,
            bcrypt_service_1.BcryptService,
            redis_service_1.RedisService,
            {
                provide: 'IUserRepository',
                useClass: user_repository_1.UserRepository,
            },
            db_user_repository_1.DBUserRepository,
            cache_user_repository_1.CacheUserRepository,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map