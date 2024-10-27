"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUserRepository = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
const result_1 = require("../../util/result");
const mysql_service_1 = require("../services/mysql.service");
const user_dao_1 = require("../dao/user.dao");
const common_1 = require("@nestjs/common");
let DBUserRepository = class DBUserRepository {
    constructor(mysqlService) {
        this.mysqlService = mysqlService;
    }
    async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const rows = await this.mysqlService.query(sql, [email]);
        if (rows.length === 0) {
            return result_1.Result.failure(new Error('User not found'));
        }
        const userDAO = new user_dao_1.UserDAO(rows[0].id, rows[0].email, rows[0].hashedPassword);
        const userEntity = new user_entity_1.UserEntity(userDAO.id, userDAO.email, userDAO.hashedPassword);
        return result_1.Result.success(userEntity);
    }
    async findById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const rows = await this.mysqlService.query(sql, [id]);
        if (rows.length === 0) {
            return result_1.Result.failure(new Error('User not found'));
        }
        const userDAO = new user_dao_1.UserDAO(rows[0].id, rows[0].email, rows[0].hashedPassword);
        const userEntity = new user_entity_1.UserEntity(userDAO.id, userDAO.email, userDAO.hashedPassword);
        return result_1.Result.success(userEntity);
    }
    async save(user) {
        const sql = 'INSERT INTO users (id, email, hashedPassword) VALUES (?, ?, ?)';
        await this.mysqlService.query(sql, [
            user.id,
            user.email,
            user.getHashedPassword(),
        ]);
        return result_1.Result.success(undefined);
    }
};
exports.DBUserRepository = DBUserRepository;
exports.DBUserRepository = DBUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysql_service_1.MySQLService])
], DBUserRepository);
//# sourceMappingURL=db-user.repository.js.map