import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { Result } from '../../util/result';
import { UserDAO } from '../dao/user.dao';
export declare class DBUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<UserDAO>);
    findByEmail(email: string): Promise<Result<UserEntity>>;
    findById(id: string): Promise<Result<UserEntity>>;
    save(user: UserEntity): Promise<Result<void>>;
}
