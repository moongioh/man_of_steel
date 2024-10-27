import { createPool, Pool } from 'mysql2/promise';
import { ENV } from '../../env.config';

export class MySQLService {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      host: ENV.MYSQL_HOST,
      port: ENV.MYSQL_PORT,
      user: ENV.MYSQL_USER,
      password: ENV.MYSQL_PASSWORD,
      database: ENV.MYSQL_DATABASE,
    });
  }

  async query(sql: string, params: any[]): Promise<any[]> {
    const [rows] = await this.pool.execute(sql, params);
    return rows as any[];
  }
}
