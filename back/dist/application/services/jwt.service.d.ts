export declare class JWTService {
    private accessTokenSecret;
    private refreshTokenSecret;
    signAccessToken(payload: any): string;
    signRefreshToken(payload: any): string;
    verifyAccessToken(token: string): any;
    verifyRefreshToken(token: string): any;
}
