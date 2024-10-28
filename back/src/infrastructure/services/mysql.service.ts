// // src/infrastructure/services/MySQLService.ts
//
// import { Injectable } from '@nestjs/common';
// import { createPool, Pool } from 'mysql2/promise';
//
// @Injectable()
// export class MySQLService {
//   private readonly pool: Pool;
//
//   constructor() {
//     this.pool = createPool({
//       host: process.env.MYSQL_HOST || 'localhost',
//       port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
//       user: process.env.MYSQL_USER || 'root',
//       password: process.env.MYSQL_PASSWORD || '',
//       database: process.env.MYSQL_DATABASE || 'test',
//     });
//   }
//
//   public async query(sql: string, params: any[]): Promise<any[]> {
//     const [rows] = await this.pool.execute(sql, params);
//     return rows as any[];
//   }
// }
