"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const user_dto_1 = require("../../presentation/dto/user.dto");
const user_dao_1 = require("../../infrastructure/dao/user.dao");
class UserEntity {
    constructor(id, email, hashedPassword) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
    async checkPassword(rawPassword, bcryptService) {
        return bcryptService.compare(rawPassword, this.hashedPassword);
    }
    async setPassword(password, bcryptService) {
        this.hashedPassword = await bcryptService.hash(password);
    }
    getHashedPassword() {
        return this.hashedPassword;
    }
    toDTO() {
        return new user_dto_1.UserDTO(this.id, this.email);
    }
    toDAO() {
        return new user_dao_1.UserDAO(this.id, this.email, this.hashedPassword);
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map