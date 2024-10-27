import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../util/result';
import { MySQLService } from '../services/mysql.service';
export declare class DBUserRepository {
    private mysqlService;
    constructor(mysqlService: MySQLService);
    findByEmail(email: string): Promise<Result<UserEntity>>;
    findById(id: string): Promise<Result<UserEntity>>;
    save(user: UserEntity): Promise<Result<void>>;
}
