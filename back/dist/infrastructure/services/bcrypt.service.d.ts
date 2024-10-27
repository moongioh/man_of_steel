export declare class BcryptService {
    private readonly saltRounds;
    hash(password: string): Promise<string>;
    compare(rawPassword: string, hashedPassword: string): Promise<boolean>;
}
