export declare class MySQLService {
    private pool;
    constructor();
    query(sql: string, params: any[]): Promise<any[]>;
}
