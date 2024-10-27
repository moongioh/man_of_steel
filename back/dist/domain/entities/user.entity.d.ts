import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { UserDTO } from '../../presentation/dto/user.dto';
import { UserDAO } from '../../infrastructure/dao/user.dao';
export declare class UserEntity {
    id: string;
    email: string;
    private hashedPassword;
    constructor(id: string, email: string, hashedPassword: string);
    checkPassword(rawPassword: string, bcryptService: BcryptService): Promise<boolean>;
    setPassword(password: string, bcryptService: BcryptService): Promise<void>;
    getHashedPassword(): string;
    toDTO(): UserDTO;
    toDAO(): UserDAO;
}
