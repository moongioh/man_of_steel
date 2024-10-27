export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    hashedPassword: string;
    constructor(id: string, email: string, password?: string, hashedPassword?: string);
}
