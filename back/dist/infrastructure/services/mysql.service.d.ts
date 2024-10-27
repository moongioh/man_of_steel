export declare class MySQLService {
    private readonly pool;
    constructor();
    query(sql: string, params: any[]): Promise<any[]>;
}
