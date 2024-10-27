export declare class JWTService {
    private readonly accessTokenSecret;
    private readonly refreshTokenSecret;
    signAccessToken(payload: any): string;
    signRefreshToken(payload: any): string;
    verifyAccessToken(token: string): any;
    verifyRefreshToken(token: string): any;
}
