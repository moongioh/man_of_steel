"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLService = void 0;
const promise_1 = require("mysql2/promise");
const env_config_1 = require("../../env.config");
class MySQLService {
    constructor() {
        this.pool = (0, promise_1.createPool)({
            host: env_config_1.ENV.MYSQL_HOST,
            port: env_config_1.ENV.MYSQL_PORT,
            user: env_config_1.ENV.MYSQL_USER,
            password: env_config_1.ENV.MYSQL_PASSWORD,
            database: env_config_1.ENV.MYSQL_DATABASE,
        });
    }
    async query(sql, params) {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }
}
exports.MySQLService = MySQLService;
//# sourceMappingURL=mysql.service.js.map