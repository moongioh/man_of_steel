export declare class BcryptService {
    private readonly saltRounds;
    constructor();
    hash(password: string): Promise<string>;
    compare(password: string, hashedPassword: string): Promise<boolean>;
}
