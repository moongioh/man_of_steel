export declare class UserEntity {
    id: string;
    email: string;
    password?: string;
    hashedPassword?: string;
    constructor(email: string, password?: string, hashedPassword?: string);
}
